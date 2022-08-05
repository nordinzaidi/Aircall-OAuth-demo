const GenericCountry = require('./generic.js');
 
class MexicoCountry extends GenericCountry {
  name = 'Mexico';
  type = 'city';
  codes = {
    '+5255': 'Mexico City',
    '+5233': 'Guadalajara',
    // ...
    '+52747': 'Zumpango Del Rio',
  };
}
 
module.exports = MexicoCountry;