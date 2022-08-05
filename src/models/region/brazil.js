const GenericCountry = require('./generic.js');
 
class BrazilCountry extends GenericCountry {
  name = 'Brazil';
  type = 'region_capital';
  codes = {
    '+5511': 'Sao Paulo',
    '+5521': 'Rio de Janeiro',
    // ...
    '+5599': 'Maranhao',
  };
}
 
module.exports = BrazilCountry;