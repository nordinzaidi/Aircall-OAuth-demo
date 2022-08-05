const GenericCountry = require('./generic.js');
 
class SwedenCountry extends GenericCountry {
  name = 'Sweden';
  type = 'city';
  codes = {
    '+4611': 'Norrköping',
    '+46120': 'Åtvidaberg',
    // ...
    '+46981': 'Vittangi',
  };
}
 
module.exports = SwedenCountry;