#!/usr/bin/python
#
# Coinorama/coinref: watch and store raw Korbit market info
#
# This file is part of Coinorama <http://coinorama.net>
#
# Copyright (C) 2013-2016 Nicolas BENOIT
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#


import time
import traceback
import httplib
import coinwatcher


# Watcher class
class KorbitKRWWatcher (coinwatcher.CoinWatcher) :
    def __init__ ( self, shortname, with_coinrefd, logger ):
        coinwatcher.CoinWatcher.__init__ ( self, shortname, with_coinrefd, logger )
        self.mostRecentTransactionID = 0
        self.mostRecentPrice = 0
        self.epoch_ms = self.epoch * 1000
        self.KRW_USD_rate = 1/1016.7
        self.KRW_USD_stamp = 0

    def buildData ( self, book, trades, lag ):
        ed = coinwatcher.ExchangeData ( )

        mostRecent = self.mostRecentTransactionID
        mostRecentPrice = self.mostRecentPrice
        try:
            for t in trades:
                tid = int ( t['tid'] )
                tvol = float ( t['amount'] )
                if ( ( tid > self.mostRecentTransactionID ) and ( t['timestamp'] > self.epoch_ms ) ):
                    ed.volume += tvol
                    ed.nb_trades += 1
                if ( tid > mostRecent ):
                    mostRecent = tid
                    mostRecentPrice = float ( t['price'] )
        except Exception:
            self.logger.write ( 'error: buildData() failed with trades\n' + str(traceback.format_exc()) )
            return None

        try:
            maxbprice = max ( [ float(b[0]) for b in book['bids'] ] )
            for b in book['bids']:
                bprice = float ( b[0] )
                bvol = float ( b[1] )
                if ( (maxbprice-bprice) < 4000 ):
                    ed.bids.append ( [ bprice, bvol ] )
                ed.total_bid += bprice * bvol
            ed.bids.sort ( reverse=True )

            minaprice = min ( [ float(a[0]) for a in book['asks'] ] )
            for a in book['asks']:
                aprice = float ( a[0] )
                avol = float ( a[1] )
                if ( (aprice-minaprice) < 4000 ):
                    ed.asks.append ( [ aprice, avol ] )
                ed.total_ask += avol
            ed.asks.sort ( )
        except Exception:
            self.logger.write ( 'error: buildData() failed with book\n' + str(traceback.format_exc()) )
            return None

        try:
            if ( mostRecent != 0 ):
                self.mostRecentPrice = mostRecentPrice
            if ( self.mostRecentPrice == 0 ):
                self.mostRecentPrice = ed.bids[0][0]
            if ( mostRecent != 0 ):
                self.mostRecentTransactionID = mostRecent
            ed.rate = self.mostRecentPrice
            ed.lag = lag
            ed.ask_value = ed.asks[0][0]
            ed.bid_value = ed.bids[0][0]
            ed.USD_conv_rate = self.KRW_USD_rate
        except Exception:
            self.logger.write ( 'error: buildData() failed with ticker\n' + str(traceback.format_exc()) )
            return None

        return ed

    def fetchData ( self ):
        # get USD/KRW rate every hour
        if ( (time.time()-self.KRW_USD_stamp) > 3600.0 ):
            try:
                connection = httplib.HTTPConnection ( 'download.finance.yahoo.com', timeout=4 )
                connection.request ( 'GET', '/d/quotes.csv?s=USDKRW=X&f=sl1&e=.csv' )
                r = connection.getresponse ( )
                if ( r.status == 200 ):
                    rate_txt = r.read ( )
                    rate = float ( rate_txt.split(',')[1] )
                    if ( rate > 0 ):
                        self.KRW_USD_rate = 1/rate
                        self.KRW_USD_stamp = time.time ( )
                        #self.logger.write ( 'rate: %f ' % self.KRW_USD_rate )
                else:
                    self.logger.write ( 'error: KRW_USD status %d' % r.status )
                connection.close ( )
            except Exception:
                self.logger.write ( 'error: unable to get KRW/USD\n' + str(traceback.format_exc()) )
                pass

        if ( self.mostRecentTransactionID != 0 ):
            trades = '/v1/transactions?time=minute'
        else:
            trades = '/v1/transactions'
        ed = coinwatcher.CoinWatcher.fetchData ( self, httplib.HTTPSConnection, 'api.korbit.co.kr', '/v1/orderbook', trades )
        return ed



#
#
# main program
#

if __name__ == "__main__":
    coinwatcher.main ( 'Korbit-KRW', 'korbitKRW', KorbitKRWWatcher )
