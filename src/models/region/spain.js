const GenericCountry = require('./generic.js');
 
class SpainCountry extends GenericCountry {
  name = 'Spain';
  type = 'city';
  codes = {
    '+3481': 'Madrid',
    '+34820': 'Avila',
    '+34821': 'Segovia',
    // ...
    '+34988': 'Orense',
  };
}
 
module.exports = SpainCountry;