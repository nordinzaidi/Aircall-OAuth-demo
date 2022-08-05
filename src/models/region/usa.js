const GenericCountry = require('./generic.js');
 
class USACountry extends GenericCountry {
  name = 'USA';
  type = 'region_capital';
  codes = {
    '+1201': 'Jersey City,NJ',
    '+1202': 'District of Columbia',
    '+1203': 'Bridgeport,CT',
    // ...
    '+1989': 'Saginaw,MI',
  };
}
 
module.exports = USACountry;