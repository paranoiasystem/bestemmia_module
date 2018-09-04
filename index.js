var https = require("https");
const cheerio = require('cheerio');

module.exports.getBestemmia = () => {
    var options = {
        hostname: 'www.santodelgiorno.it'
    };
    
    https.get(options, function(result) {
        parseHtml(result);
    }).on('error', function(e) {
        console.log(e);
    });
    
    var parseHtml = (data) => {
        let html = '';
        
        data.on('data', (chunk) => {
            html += chunk;
        });
    
        data.on('end', () => {
            var loadHtml = cheerio.load(html);
            var nomesanto = loadHtml('.NomeSantoDiOggi').text();
            return "Mannaggia a " + nomesanto;
        });
    };
}