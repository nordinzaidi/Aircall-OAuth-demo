const GenericCountry = require('./generic.js');
 
class BelgiumCountry extends GenericCountry {
  name = 'Belgium';
  type = 'region';
  codes = {
    '+3210': 'Wavre',
    '+3211': 'Hasselt',
    // ...
    '+329': 'Gand',
  };
}
 
module.exports = BelgiumCountry;