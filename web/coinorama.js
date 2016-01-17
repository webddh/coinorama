var exchanges_info=[],exchanges_info_by_name={},exchanges_uid={},exchanges_views=[],currency_symbol={USD:"$",EUR:"\u20ac",CNY:"\u00a5",HKD:"HK$",BRL:"R$",PLN:"z\u0142",CAD:"C$",ILS:"\u20aa",KRW:"\u20a9",GBP:"\u00a3",ARS:"ARS$",RUB:"\u0584",JPY:"\u00a5",TRY:"\u20ba",ZAR:"R",MXN:"M$",AUD:"A$",ETH:"\u039e",LTC:"\u0141"},currency_name={USD:"US Dollar",EUR:"Euro",CNY:"Chinese Yuan",HKD:"HK Dollar",PLN:"Polish Z\u0142oty",BRL:"Brazilian Real",CAD:"Canadian Dollar",ILS:"Israeli new Shekel",KRW:"South Korean Won",
GBP:"Pound Sterling",ARS:"Argentine Peso",MXN:"Mexican Peso",RUB:"Russian Ruble",JPY:"Japanese Yen",TRY:"Turkish Lira",ZAR:"South African Rand",AUD:"Australian Dollar",LTC:"Litecoin",ETH:"Ether",BTC:"Bitcoin"};function formatTickUSD(a,b){return formatTickCurrency(a,"$")}function formatTickEUR(a,b){return formatTickCurrency(a,"\u20ac")}function formatTickCNY(a,b){return formatTickCurrency(a,"\u00a5")}function formatTickHKD(a,b){return formatTickCurrency(a,"HK$")}
function formatTickBRL(a,b){return formatTickCurrency(a,"R$")}function formatTickPLN(a,b){return formatTickCurrency(a,"z\u0142")}function formatTickCAD(a,b){return formatTickCurrency(a,"C$")}function formatTickILS(a,b){return formatTickCurrency(a,"\u20aa")}function formatTickKRW(a,b){return formatTickCurrency(a,"\u20a9")}function formatTickGBP(a,b){return formatTickCurrency(a,"\u00a3")}function formatTickRUB(a,b){return formatTickCurrency(a,"\u0584")}
function formatTickJPY(a,b){return formatTickCurrency(a,"\u00a5")}function formatTickTRY(a,b){return formatTickCurrency(a,"\u20ba")}function formatTickZAR(a,b){return formatTickCurrency(a,"R")}function formatTickARS(a,b){return formatTickCurrency(a,"ARS$")}function formatTickMXN(a,b){return formatTickCurrency(a,"M$")}function formatTickAUD(a,b){return formatTickCurrency(a,"A$")}function formatTickLTC(a,b){return formatTickCurrency(a,"\u0141")}
function formatTickETH(a,b){return formatTickCurrency(a,"\u039e")}function formatTickBTC(a,b){return formatTickUnit(a,null)}var currency_formatter={USD:formatTickUSD,EUR:formatTickEUR,CNY:formatTickCNY,HKD:formatTickHKD,PLN:formatTickPLN,BRL:formatTickBRL,CAD:formatTickCAD,ILS:formatTickILS,KRW:formatTickKRW,GBP:formatTickGBP,ARS:formatTickARS,RUB:formatTickRUB,JPY:formatTickJPY,TRY:formatTickTRY,ZAR:formatTickZAR,MXN:formatTickMXN,AUD:formatTickAUD,LTC:formatTickLTC,ETH:formatTickETH,BTC:formatTickBTC};
function getExchangeCurrency(a){return a.slice(-3,a.length)}var currency_list=[],exchanges_by_currency={};function formatTickByte(a,b){return 1099511627776<=a?""+(a/1099511627776).toFixed(1)+" T":1073741824<=a?""+(a/1073741824).toFixed(1)+" G":1048576<=a?""+(a/1048576).toFixed(1)+" M":1024<=a?""+(a/1024).toFixed(1)+" K":a.toFixed(1)+" "}
function formatTickUnit(a,b){return 1E12<=a?""+(a/1E12).toFixed(1)+" T":1E9<=a?""+(a/1E9).toFixed(1)+" G":1E6<=a?""+(a/1E6).toFixed(1)+" M":1E3<=a?""+(a/1E3).toFixed(1)+" K":a.toFixed(1)+" "}function SubUnitFormat(a){return.01>a-Math.floor(a)?Math.floor(a).toPrecision(3):a.toFixed(2)}function formatTickSubUnit(a,b){return 0==a?"0":1<=a?a.toFixed(1):.001>a?""+SubUnitFormat(1E6*a)+" \u00b5":""+SubUnitFormat(1E3*a)+" m"}
function formatTickCurrency(a,b){return 1E9<=a?""+(a/1E9).toFixed(1)+" G"+b:1E6<=a?""+(a/1E6).toFixed(1)+" M"+b:1E3<=a?""+(a/1E3).toFixed(1)+" K"+b:a.toFixed(1)+" "+b}function formatTickInt(a,b){return a.toFixed(0)}function formatTickPercent(a,b){return 0<a?"+"+a.toFixed(1)+"%":a.toFixed(1)+"%"}function formatTickSubPercent(a,b){return.01<a?"+"+a.toFixed(2)+" %":a.toFixed(3)+" %"}function formatTickUnsignedPercent(a,b){return a.toFixed(0)+"%"}
function formatTickDuration(a){return 60>a?a.toFixed(0)+" seconds":120>a?"1 minute "+(a%60).toFixed(0)+" seconds":3600>a?Math.floor(a/60).toFixed(0)+" minutes "+(a%60).toFixed(0)+" seconds":7200>a?"1 hour "+(a%3600/60).toFixed(0)+" minutes":86400>a?Math.floor(a/3600).toFixed(0)+" hours "+(a%3600/60).toFixed(0)+" minutes":172800>a?"1 day "+(a%86400/3600).toFixed(0)+" hours":Math.floor(a/86400).toFixed(0)+" days "+(a%86400/3600).toFixed(0)+" hours"}
function formatTickDurationRounded(a){return 60>a?a.toFixed(0)+" seconds":150>a?"1 minute":3600>a?Math.round(a/60).toFixed(0)+" minutes":5400>a?"1 hour":172800>a?Math.round(a/3600).toFixed(0)+" hours":Math.round(a/86400).toFixed(0)+" days"}function formatTickHashrate(a){return 1E3>a?a.toFixed(2)+" Mhash/s":1E6>a?(a/1E3).toFixed(2)+" Ghash/s":1E9>a?(a/1E6).toFixed(2)+" Thash/s":(a/1E9).toFixed(2)+" Phash/s"}
function formatTitleHashrate(a){return 1E3>a?a.toFixed(2)+" Mh/s":1E6>a?(a/1E3).toFixed(2)+" Gh/s":1E9>a?(a/1E6).toFixed(2)+" Th/s":(a/1E9).toFixed(2)+" Ph/s"}function coinorama_getCurrentSection(){var a=document.location.pathname.split("/"),b=1;2<a.length&&(b=2);if(1<a.length&&"markets"!=a[b]){if("network"==a[b])return"N";if("blocks"==a[b])return"B";if("webapp.html"==a[b])return"T";if("api"==a[b])return"A"}return"M"}Long=function(a,b){this.low_=a|0;this.high_=b|0};
Long.fromBits=function(a,b){return new Long(a,b)};Long.fromNumber=function(a){return isNaN(a)||!isFinite(a)?Long.ZERO:a<=-Long.TWO_PWR_63_DBL_?Long.MIN_VALUE:a+1>=Long.TWO_PWR_63_DBL_?Long.MAX_VALUE:new Long(a%Long.TWO_PWR_32_DBL_|0,a/Long.TWO_PWR_32_DBL_|0)};Long.TWO_PWR_16_DBL_=65536;Long.TWO_PWR_32_DBL_=Long.TWO_PWR_16_DBL_*Long.TWO_PWR_16_DBL_;Long.TWO_PWR_64_DBL_=Long.TWO_PWR_32_DBL_*Long.TWO_PWR_32_DBL_;Long.TWO_PWR_63_DBL_=Long.TWO_PWR_64_DBL_/2;Long.ZERO=Long.fromNumber(0);
Long.prototype.getLowBitsUnsigned=function(){return 0<=this.low_?this.low_:Long.TWO_PWR_32_DBL_+this.low_};Long.prototype.toNumber=function(){return this.high_*Long.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()};Long.prototype.isZero=function(){return 0==this.high_&&0==this.low_};Long.prototype.and=function(a){return Long.fromBits(this.low_&a.low_,this.high_&a.high_)};Long.prototype.xor=function(a){return Long.fromBits(this.low_^a.low_,this.high_^a.high_)};var ticker_config={},cur;
for(cur in currency_symbol)ticker_config[cur]=!0;function loadTickerConfig(){var a=document.cookie,b=a.indexOf("ticker=");if(-1!=b){var b=a.indexOf("=",b)+1,d=a.indexOf(";",b),a=-1!=d?unescape(a.substring(b,d)):unescape(a.substring(b)),f;try{f=JSON.parse(a)}catch(m){return}for(cur in ticker_config)f.hasOwnProperty(cur)&&(ticker_config[cur]=f[cur])}}
function saveTickerConfig(){var a=new Date;a.setDate(a.getDate()+366);document.cookie="ticker="+JSON.stringify(ticker_config)+"; expires="+a.toUTCString()}var previous_markets_title_price=0,previous_markets_tick_direction={},previous_markets_tick_price={},previous_network_block_number=0,e;for(e in exchanges_uid)previous_markets_tick_direction[e]=-1,previous_markets_tick_price[e]=0;function coinorama_getTimestamp(){var a=new Date;return a.toDateString()+", "+a.toLocaleTimeString()}
function makeTicker(){var a=coinorama_getCurrentSection(),b='<div id="info_live"><br/><div class="info_live_sub" style="text-align:center;"><div id="timestamp"></div></div><hr style="background:#777; height:1px; border-width:0; margin-top:1em; margin-bottom:1em;" /><div class="info_live_sub" style="text-align:center;"><div id="summary"></div></div><hr style="background:#777; height:1px; border-width:0; margin-top:1em; margin-bottom:1em;" />',d="",f;for(f in exchanges_by_currency)for(var m in exchanges_by_currency[f]){var g=
exchanges_by_currency[f][m];f!=d&&(0<d.length&&(b+="</table></div>",b+='<div style="clear:both"></div>',b+="</div><br/>"),d=f,b+='<div class="info_live_sub">',b+='<div style="float:right; clear:both; font-weight:bold;"> <a id="ticker_'+f+'_display" href="#" style="text-decoration:none; color:#ddd;">'+currency_name[f]+" "+currency_symbol[f]+' &nbsp;[-]</a>&nbsp;</div><div style="float:right; clear:both;"><table id="ticker_'+f+'" style="float:right">');b+='<tr><td><span id="live_ename_'+g.name+'">'+
g.desc+"</span></td>";b+='<td><span class="info_direction" id="live_direction_'+g.name+'" /></td>';b+='<td><span id="live_price_'+g.name+'" /></td>';b+="</tr>"}b+='</table></div><div style="clear:both"></div>';b+="</div>";b+='<hr style="background:#777; height:1px; border-width:0; margin-top:1em; margin-bottom:1em;"/>';b+='<div class="info_live_sub" style="line-height:'+("T"==a?"1.5":"1.34")+'">';"T"!=a?(b+='<span class="info_ticker">Block: <span id="live_block_number"></span></span><br/>',b+='<span class="info_ticker"><span id="live_block_age"></span></span><br/><br/>',
b+='<span class="info_ticker">Difficulty: <span id="live_block_diff"></span></span><br/>',b+='<span class="info_ticker">Target: <span id="live_block_drate"></span></span><br/>',b+='<span class="info_ticker">Current: <span id="live_block_rate"></span></span><br/><br/>'):(b+='<span class="info_ticker">Block: <span id="live_block_number"></span>&nbsp; (<span id="live_block_age"></span>)</span><br/>',b+='<span class="info_ticker">Difficulty: <span id="live_block_diff"></span></span>&nbsp;;&nbsp;Retarget in <span id="live_block_next"></span>&nbsp;(~ <span id="live_block_next_delay"></span>)</span><br/>',
b+='<span class="info_ticker">Target Hashrate: <span id="live_block_drate"></span>&nbsp;;&nbsp;Current: ~<span id="live_block_rate"></span></span><br/><br/>');"T"!=a&&(b+='<span class="info_ticker">Retarget in <span id="live_block_next"></span> (~<span id="live_block_next_delay"></span>)</span><br/>');b+="</div>";b+="<br/>";b+="</div>";$("div#livebar").html(b);$.each(currency_symbol,function(a){$("a#ticker_"+a+"_display").on("click",function(b){b.preventDefault();toggleTickerCurrency(a)})})}
function updateTickerDisplay(a){ticker_config[a]?($("a#ticker_"+a+"_display").html(currency_name[a]+" "+currency_symbol[a]+' &nbsp; <span style="color:#aaa; font-weight:normal;">[-]</span>'),$("table#ticker_"+a).show()):($("a#ticker_"+a+"_display").html(currency_name[a]+" "+currency_symbol[a]+' &nbsp; <span style="color:#aaa; font-weight:normal;">[+]</span>'),$("table#ticker_"+a).hide())}
function toggleTickerCurrency(a){ticker_config[a]=!ticker_config[a];updateTickerDisplay(a);saveTickerConfig()}
function coinorama_ticks_updateNetwork(a){a=a[0].tick;previous_network_block_number!=a.last&&(previous_network_block_number=a.last,$("#live_block_number").css("opacity",0),$("#live_block_number").text(a.last),$("#live_block_number").animate({opacity:1},500,"linear"));var b=(new Date).getTime()/1E3;$("#live_block_age").text(formatTickDuration(b-a.time)+" ago");b=7.158278826666667*a.diff;$("#live_block_diff").text(a.diff.toExponential(2));$("#live_block_drate").text(formatTickHashrate(b));$("#live_block_rate").text(formatTickHashrate(a.hrate));
var d=2016*(1+Math.floor(a.last/2016))-1-a.last;$("#live_block_next").text(d.toString()+" block"+(1<d?"s":""));$("#live_block_next_delay").text(formatTickDurationRounded(b/a.hrate*d*600));"N"==coinorama_getCurrentSection()&&$(document).attr("title","~"+formatTitleHashrate(a.hrate)+" - Coinorama");$("div#timestamp").text(coinorama_getTimestamp())}function detectShownCurrency(a){var b="USD",d={},f;for(f in a)a[f]&&(d[getExchangeCurrency(f)]=1);d=Object.keys(d);1==d.length&&(b=d[0]);return b}
var alerts={},nb_alerts=0;function markets_getDirection(a,b){return 0==a||.01>=Math.abs(a-b)?1:a>b?0:2}
function coinorama_ticks_updateMarkets(a,b,d,f){var m="USD",m={},g={},r={},l={},n={},s=0,q=["\u2193","\u2192","\u2191"],h;for(h in currency_symbol)m[h]=0,g[h]=0,l[h]=0;for(var c in a){var k=a[c];h=getExchangeCurrency(c);s+=k.volume;l[h]+=k.volume;m[h]+=k.last*k.volume;g[h]+=k.open*k.volume}for(h in currency_symbol)n[h]=(m[h]-g[h])/g[h]*100,r[h]=m[h]/l[h];m=detectShownCurrency(f);if("M"==coinorama_getCurrentSection()){var g=0,p;if("s"!=b){p=0;for(c in a)k=a[c],f[c]&&(g="USD"==m?g+k.last*k.rusd*k.volume:
g+k.last*k.volume,p+=k.volume);0!=p?(g/=p,p=markets_getDirection(previous_markets_title_price,g),previous_markets_title_price=g,g=g.toFixed(2)):(g="n/a",p=1);$(document).attr("title",""+q[p]+" "+g+" "+m+"/BTC - Coinorama")}else a.hasOwnProperty(d)&&(k=a[d],g=k.last.toFixed(2),p=markets_getDirection(k.avg,k.last)),$(document).attr("title",""+q[p]+" "+g+" "+getExchangeCurrency(d)+"/BTC - Coinorama")}for(c in a){k=a[c];f=$("#live_ename_"+c);b=$("#live_direction_"+c);d=$("#live_price_"+c);m=getExchangeCurrency(c);
p=markets_getDirection(k.avg,k.last);switch(p){case 0:b.attr("style","color:#aa0000;");break;case 2:b.attr("style","color:#00aa00;");break;default:b.attr("style","color:#aaaaaa;")}previous_markets_tick_direction[c]!=p&&(previous_markets_tick_direction[c]=p,b.css("opacity",0),b.text(q[p]),b.animate({opacity:1},500,"linear"));previous_markets_tick_price[c]!=k.last&&(d.css("opacity",0),0!=previous_markets_tick_price[c]&&(previous_markets_tick_price[c]<k.last?f.css("background","#008000"):f.css("background",
"#800000")),d.html(""+k.last.toFixed(2)+" "+currency_symbol[m]+" &nbsp;["+(100*k.volume/s).toFixed(1)+"%]"),f.animate({backgroundColor:"#1f1f1f"},2500,"linear"),d.animate({opacity:1},1E3,"linear"),previous_markets_tick_price[c]=k.last)}$("div#timestamp").text(coinorama_getTimestamp());c='<table style="text-align:left; margin-left:auto; margin-right:auto; ">';for(h in{USD:0,EUR:1,CNY:2})c+="<tr>",c+='<td style="text-align:right;">~ '+r[h].toFixed(2)+" </td>",c+="<td>"+h+"</td>",c=.01>Math.abs(n[h])?
c+('<td style="color:#aaaaaa">'+q[1]+"</td>"):0>n[h]?c+('<td style="color:#aa0000">'+q[0]+"</td>"):c+('<td style="color:#00aa00">'+q[2]+"</td>"),c+="<td>"+n[h].toFixed(2)+"%</td>",c+="</tr>";c+='</table><br style="line-height:0.3em"/>';c+="24h:&nbsp;"+formatTickCurrency(s," BTC");$("div#summary").html(c);for(var t in alerts)alerts[t].tick(a)}
function coinorama_load(a){function b(a){coinorama_ticks_updateMarkets(a.ticks,null,null,null)}function d(a,b,d){}function f(){$.ajax({url:"/coinorama/data.cft",type:"GET",dataType:"json",success:b,error:d});markets_ticks_timeout_id=setTimeout(f,1E4)}function m(a){coinorama_ticks_updateNetwork(a.ticks)}function g(a,b,d){}function r(){$.ajax({url:"/coinorama/data.bft",type:"GET",dataType:"json",success:m,error:g});network_tick_timeout_id=setTimeout(r,3E4)}exchanges_info=a.config.markets;exchanges_views=
a.config.views;if(1>exchanges_info.length||1>exchanges_views.length)$("span#winmsg_title").text("Error"),$("div#winmsg_ctnt").html("Sorry, markets configuration data is empty.<br/>The service is being upgraded/rebooted, or it crashed.<br/>Please reload the page in a couple of minutes.<br/><br/>"),windowShow("message");else{for(var l in exchanges_info)exchanges_info_by_name[exchanges_info[l].name]=exchanges_info[l];for(l in exchanges_info)exchanges_uid[exchanges_info[l].name]=exchanges_info[l].uid;
for(l in exchanges_info){a=exchanges_info[l];var n=getExchangeCurrency(a.name);exchanges_by_currency.hasOwnProperty(n)||(currency_list.push(n),exchanges_by_currency[n]=[]);exchanges_by_currency[n].push(a)}network_tick_timeout_id=markets_ticks_timeout_id=-1;makeTicker();loadTickerConfig();for(n in currency_symbol)updateTickerDisplay(n);l=coinorama_getCurrentSection();switch(l){case "N":$("div#markets_bar").hide();$("div#markets_page").hide();$("div#blocks_bar").hide();$("div#blocks_page").hide();$("div#api_page").hide();
$("div#network_bar").show();$("div#network_page").show();$("span#network_ct").css("background","#c6881d");$(document).attr("title","Coinorama - Network");break;case "B":$("div#markets_bar").hide();$("div#markets_page").hide();$("div#network_bar").hide();$("div#network_page").hide();$("div#api_page").hide();$("div#blocks_bar").show();$("div#blocks_page").show();$("span#blocks_ct").css("background","#c6881d");$(document).attr("title","Coinorama - Blocks");break;case "A":$("div#markets_bar").hide();
$("div#markets_page").hide();$("div#network_bar").hide();$("div#network_page").hide();$("div#blocks_bar").hide();$("div#blocks_page").hide();$("div#api_page").show();$("span#api_ct").css("background","#c6881d");$(document).attr("title","Coinorama - API");break;case "T":break;default:$("div#network_bar").hide(),$("div#network_page").hide(),$("div#blocks_bar").hide(),$("div#blocks_page").hide(),$("div#api_page").hide(),$("div#markets_bar").show(),$("div#markets_page").show(),$("span#markets_ct").css("background",
"#c6881d"),$(document).attr("title","Coinorama - Markets")}"T"!=l&&(n=$(window).height(),800>n?$("div#livebar").css("font-size","50%"):900>n?$("div#livebar").css("font-size","53%"):1E3>n?$("div#livebar").css("font-size","56%"):$("div#livebar").css("font-size","62%"));"M"!=l&&f();"N"!=l&&"B"!=l&&r()}}
function onMarketsConfigFetchError(a,b,d){$("span#winmsg_title").text("Error");$("div#winmsg_ctnt").html("Sorry, markets configuration data could not be fetched.<br/>The service is being upgraded/rebooted, or it crashed.<br/>Please reload the page in a couple of minutes.<br/><br/>"+d+"<br/>");windowShow("message")}$(function(){$.ajax({url:"/coinorama/data.cf?l=1",type:"GET",dataType:"json",success:coinorama_load,error:onMarketsConfigFetchError})});
