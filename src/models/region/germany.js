const GenericCountry = require('./generic.js');
 
class GermanyCountry extends GenericCountry {
  name = 'Germany';
  type = 'region';
  codes = {
    '+49201': 'Essen',
    '+49202': 'Wuppertal',
    // ...
    '+499978': 'Schonthal Oberpfalz',
  };
}
 
module.exports = GermanyCountry;