const GenericCountry = require('./generic.js');
 
class FranceCountry extends GenericCountry {
  name = 'France';
  type = 'city';
  codes = {
    '+33105': 'Paris',
    '+3313021': 'Versailles',
    // ...
    '+339769': 'Reunion',
  };
}
 
module.exports = FranceCountry;