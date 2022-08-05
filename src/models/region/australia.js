
const GenericCountry = require('./generic.js');
 
class AustraliaCountry extends GenericCountry {
  name = 'Australia';
  type = 'city';
  codes = {
    '+61233': 'Gosford',
    // ...
    '+61899': 'Geraldton',
  };
}
 
module.exports = AustraliaCountry;