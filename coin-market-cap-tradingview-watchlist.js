var currenciesList = [];
var todayDate = new Date().toISOString().slice(0,10);
var pairing = prompt('What pairing(s) would you like?', 'BTC,ETH,USD,USDT') || 'BTC,ETH,USD,USDT';
var limit = prompt('How many symbols do you want?', '50') || '50';
var exchange = prompt('Enter the TradingView exchange code (optional)', 'BITTREX') || '';
exchange = exchange.toUpperCase();
pairing = pairing.toUpperCase();
pairing = pairing.replace(/[^A-Z0-9,]+/g,'');
pairingArray = pairing.split(',');
for(var o=0;o<pairingArray.length;o++){
  var count = 1;
  $("table#currencies tr[role=row] > td.circulating-supply > a > span.hidden-xs").each(function(i,v){
    var symbol = $(v).text();
    symbol = symbol.replace('MIOTA', 'IOTA');
    if(symbol != pairingArray[o] && exchange != ''){ symbol = exchange + ':' + symbol; }
    if(count<=limit){
      if(symbol != pairingArray[o]){
        currenciesList.push(symbol + pairingArray[o]);
      }
      count++;
    }
  });
}
var element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(currenciesList.join("\n")));
element.setAttribute('download', 'CMC100 (' + todayDate + ').txt');
element.style.display = 'none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);