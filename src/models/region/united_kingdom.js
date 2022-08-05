const GenericCountry = require('./generic.js');
 
class UKCountry extends GenericCountry {
  name = 'United Kingdom';
  type = 'city';
  codes = {
    '+44113': 'Leeds',
    '+44114': 'Sheffield',
    // ...
    '+4499': 'Southend-on-Sea',
  };
}
 
module.exports = UKCountry;