const GenericCountry = require('./generic.js');
 
class NetherlandsCountry extends GenericCountry {
  name = 'Netherlands';
  type = 'city';
  codes = {
    '+3110': 'Rotterdam',
    '+31111': 'Zierikzee',
    // ...
    '+3179': 'Zoetermeer',
  };
}
 
module.exports = NetherlandsCountry;