const GenericCountry = require('./generic.js');
 
class SwitzerlandCountry extends GenericCountry {
  name = 'Switzerland';
  type = 'region_city';
  codes = {
    '+4121': 'Lausanne',
    '+4122': 'Geneve',
    // ...
    '+4191': 'Bellinzona',
  };
}
 
module.exports = SwitzerlandCountry;