const GenericCountry = require('./generic.js');
 
class FranceCountry extends GenericCountry {
  name = 'Ireland';
  type = 'city';
  codes = {
    '+3531': 'Dublin',
    '+35321': 'Cork',
    // ...
    '+35399': 'Kilronan',
  };
}
 
module.exports = FranceCountry;