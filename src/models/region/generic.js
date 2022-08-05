/**
 *  GenericCountry class implementing get functions
 *  Each country must extend this class
 *
 *  - name: full name of the country
 *  - type: can be city, region, region_capital
 *  - codes: a JSON object with prefixes as keys and city/region as values:
 *    { "+33105": "Ile de France",... }
 */
 class GenericCountry {
    name = null;
    type = null;
    codes = {};
   
    getName() {
      return this.name;
    }
   
    getType() {
      return this.type;
    }
   
    getCodes() {
      return this.codes;
    }
  }
   
  module.exports = GenericCountry;