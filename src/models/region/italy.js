const GenericCountry = require('./generic.js');
 
class ItalyCountry extends GenericCountry {
  name = 'Italy';
  type = 'city';
  codes = {
    '+3910': 'Genova',
    '+3911': 'Torino',
    // ...
    '+3999': 'Taranto',
  };
}
 
module.exports = ItalyCountry;