const GenericCountry = require('./generic.js');
 
class MoroccoCountry extends GenericCountry {
  name = 'Morocco';
  type = 'city';
  codes = {
    '+212520': 'Casablanca',
    '+2125243': 'Marrakech',
    // ...
    '+2125399': 'Al Hoceima',
  };
}
 
module.exports = MoroccoCountry;