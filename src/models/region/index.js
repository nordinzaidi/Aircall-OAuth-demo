/**
 *  Parse a phone number and gets the city/country out of it
 */
 
 const libPhoneNumber = require('libphonenumber-js/max'),
 Logger = require('../../modules/logger.js');

// Require all available countries
const countryClasses = {
 AU: require('./australia.js'),
 BE: require('./belgium.js'),
 BR: require('./brazil.js'),
 CA: require('./canada.js'),
 CH: require('./switzerland.js'),
 DE: require('./germany.js'),
 ES: require('./spain.js'),
 FR: require('./france.js'),
 GB: require('./united_kingdom.js'),
 IE: require('./ireland.js'),
 IT: require('./italy.js'),
 MA: require('./morocco.js'),
 MX: require('./mexico.js'),
 NL: require('./netherlands.js'),
 SE: require('./sweden.js'),
 US: require('./usa.js'),
};

class RegionClass {
 phoneNumber = null;
 country = null;

 constructor(phoneNumberString) {
   this.phoneNumber =
     !!phoneNumberString &&
     libPhoneNumber.parsePhoneNumberFromString(phoneNumberString);

   if (!this.phoneNumber) {
     Logger.warn(
       `[RegionClass][constructor] info of the following phoneNumber could not be extracted ${phoneNumberString}`
     );
     return;
   }

   if (!this.phoneNumber.country) {
     Logger.warn(
       `[RegionClass][constructor] countryCode is undefined for ${this.anonymizedPhoneNumber()}`
     );
     return;
   }

   this.country =
     !!countryClasses[this.phoneNumber.country] &&
     new countryClasses[this.phoneNumber.country]();
 }

 /**
  *  Returns an object with city and country names
  */
 get() {
   if (!this.phoneNumber || !this.country) {
     return;
   }
   let phoneNumberString = this.phoneNumber.number;

   let city = null;
   let codes = this.country.getCodes();

   while (!city && !!phoneNumberString.length) {
     if (!!codes[phoneNumberString]) {
       city = codes[phoneNumberString];
     }
     phoneNumberString = phoneNumberString.slice(0, -1);
   }

   let region = null;
   if (!city) {
     Logger.warn(
       `[RegionClass][get] region not found for number ${this.anonymizedPhoneNumber()} - type is ${this.phoneNumber.getType()}.`
     );
     return;
   }

   Logger.info(
     `[RegionClass][get] region found for number ${this.anonymizedPhoneNumber()}: ${city}`
   );

   return {
     city,
     country: this.country.getName(),
   };
 }

 /**
  *  Replace the last 4 digits of the number by XXXX
  */
 anonymizedPhoneNumber() {
   if (!this.phoneNumber || !this.phoneNumber.number) {
     return '';
   }

   let phoneNumberString = this.phoneNumber.number || '';
   return phoneNumberString.length > 4
     ? phoneNumberString.slice(0, phoneNumberString.length - 4) + 'XXXX'
     : phoneNumberString;
 }
}

module.exports = RegionClass;