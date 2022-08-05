const GenericCountry = require('./generic.js');
 
class CanadaCountry extends GenericCountry {
  name = 'Canada';
  type = 'region_capital';
  codes = {
    '+1204': 'Winnipeg',
    '+1226': 'Brantford',
    // ...
    '+1905': 'Brampton',
  };
}
 
module.exports = CanadaCountry;