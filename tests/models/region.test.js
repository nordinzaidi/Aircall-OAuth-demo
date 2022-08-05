/**
 *  Test the Region model
 */
 
 const Region = require('../../src/models/region');
 
 /**
  *  Not defined
  */
 describe('Country: not defined', () => {
   test('no number given', () => {
     let region = new Region();
     expect(region.get()).toBe(undefined);
   });
  
   test('empty string given', () => {
     let region = new Region('');
     expect(region.get()).toBe(undefined);
   });
  
   test('alpha-string given', () => {
     let region = new Region('this is not a number');
     expect(region.get()).toBe(undefined);
   });
  
   test('A-Z string given', () => {
     let region = new Region('this is not a number');
     expect(region.get()).toBe(undefined);
   });
 });
  
 /**
  *  Australia
  */
 describe('Country: Australia', () => {
   const cities = [
     { phoneNumber: '+61284172226', name: 'Sydney' },
     { phoneNumber: '+61738443236', name: 'Brisbane' },
     { phoneNumber: '+61 8 9444 8212', name: 'Perth' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Australia' });
     });
   });
  
   test('mobile number', () => {
     let region = new Region('+61 413 538 474');
     expect(region.get()).toBe(undefined);
   });
 });
  
 /**
  *  Belgium
  */
 describe('Country: Belgium', () => {
   const cities = [
     { phoneNumber: '+32 2 223 73 77', name: 'Bruxelles' },
     { phoneNumber: '+32 9 223 55 55', name: 'Gand' },
     { phoneNumber: '+32 494 61 75 79', name: 'Liege' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Belgium' });
     });
   });
 });
  
 /**
  *  Brazil
  */
 describe('Country: Brazil', () => {
   const cities = [
     { phoneNumber: '+55 11 3503-3333', name: 'Sao Paulo' },
     { phoneNumber: '+55 21 2523-3787', name: 'Rio de Janeiro' },
     { phoneNumber: '+55 61 2028-5000', name: 'Distrito Federal' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Brazil' });
     });
   });
 });
  
 /**
  *  Canada
  */
 describe('Country: Canada', () => {
   const cities = [
     { phoneNumber: '+1 514-937-7754', name: 'Montreal' },
     { phoneNumber: '+1 604-666-6655', name: 'Abbotsford' },
     { phoneNumber: '+1 416-901-4724', name: 'Toronto' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Canada' });
     });
   });
 });
  
 /**
  *  France
  */
 describe('Country: France', () => {
   const cities = [
     { phoneNumber: '+33176360036', name: 'Bobigny' },
     { phoneNumber: '+33563721234', name: 'Castres' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'France' });
     });
   });
  
   test('mobile number', () => {
     let region = new Region('+33645135390');
     expect(region.get()).toBe(undefined);
   });
  
   test('toll-free number', () => {
     let region = new Region('+33800123432');
     expect(region.get()).toBe(undefined);
   });
 });
  
 /**
  *  Germany
  */
 describe('Country: Germany', () => {
   const cities = [
     { phoneNumber: '+49 30 2835293', name: 'Berlin' },
     { phoneNumber: '+49 511 1699680', name: 'Hannover' },
     { phoneNumber: '+49 521 98818467', name: 'Bielefeld' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Germany' });
     });
   });
 });
  
 /**
  *  Ireland
  */
 describe('Country: Ireland', () => {
   const cities = [
     { phoneNumber: '+353 21 431 6118', name: 'Cork' },
     { phoneNumber: '+353 1 455 6633', name: 'Dublin' },
     { phoneNumber: '+353 91 526 003', name: 'Galway' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Ireland' });
     });
   });
 });
  
 /**
  *  Italy
  */
 describe('Country: Italy', () => {
   const cities = [
     { phoneNumber: '+39 377 087 7360', name: 'Codogno' },
     { phoneNumber: '+39 393 825 3361', name: 'Monza' },
     { phoneNumber: '+39 351 644 4007', name: 'Bergamo' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Italy' });
     });
   });
 });
  
 /**
  *  Mexico
  */
 describe('Country: Mexico', () => {
   const cities = [
     { phoneNumber: '+52 55 5521 2048', name: 'Mexico City' },
     { phoneNumber: '+52 998 886 9891', name: 'Puerto Morelos' },
     { phoneNumber: '+52 662 212 2700', name: 'San Pedro El Saucito' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Mexico' });
     });
   });
 });
  
 /**
  *  Morocco
  */
 describe('Country: Morocco', () => {
   const cities = [
     { phoneNumber: '+212 5376-33333', name: 'Rabat' },
     { phoneNumber: '+212 5243-81609', name: 'Marrakech' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Morocco' });
     });
   });
 });
  
 /**
  *  Netherlands
  */
 describe('Country: Netherlands', () => {
   const cities = [
     { phoneNumber: '+31 10 414 4188', name: 'Rotterdam' },
     { phoneNumber: '+31 20 320 5700', name: 'Amsterdam' },
     { phoneNumber: '+31 70 388 2367', name: 'The Hague' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Netherlands' });
     });
   });
 });
  
 /**
  *  Spain
  */
 describe('Country: Spain', () => {
   const cities = [
     { phoneNumber: '+34 915 32 02 59', name: 'Madrid' },
     { phoneNumber: '+34 933 19 70 03', name: 'Barcelona' },
     { phoneNumber: '+34 963 91 06 68', name: 'Valencia' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Spain' });
     });
   });
 });
  
 /**
  *  Switzerland
  */
 describe('Country: Switzerland', () => {
   const cities = [
     { phoneNumber: '+41 31 312 33 00', name: 'Berne' },
     { phoneNumber: '+41 21 625 01 45', name: 'Lausanne' },
     { phoneNumber: '+41 44 225 33 00', name: 'Zurich' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Switzerland' });
     });
   });
 });
  
 /**
  *  UK
  */
 describe('Country: UK', () => {
   const cities = [
     { phoneNumber: '+44 20 7268 6565', name: 'London' },
     { phoneNumber: '+44 1603 305300', name: 'Norwich' },
     { phoneNumber: '+44 1603 305300', name: 'Norwich' },
     { phoneNumber: '+44 131 624 8624', name: 'Edinburgh' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({
         city: city.name,
         country: 'United Kingdom',
       });
     });
   });
 });
  
 /**
  *  Sweden
  */
 describe('Country: Sweden', () => {
   const cities = [
     { phoneNumber: '+46 8 446 870 01', name: 'Stockholm' },
     { phoneNumber: '+46 40 630 92 80', name: 'Malmö' },
     { phoneNumber: '+46 46 841 00 59', name: 'Lund' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'Sweden' });
     });
   });
 });
  
 /**
  *  USA
  */
 describe('Country: USA', () => {
   const cities = [
     { phoneNumber: '+1 (212) 254-2246', name: 'New York,NY' },
     { phoneNumber: '+1 (415) 487-2600', name: 'San Francisco,CA' },
     { phoneNumber: '+1 (303) 830-6839', name: 'Denver,CO' },
     { phoneNumber: '+1 (713) 581-2337', name: 'Houston,TX' },
   ];
  
   cities.forEach((city) => {
     test(`testing ${city.name}`, () => {
       let region = new Region(city.phoneNumber);
       expect(region.get()).toEqual({ city: city.name, country: 'USA' });
     });
   });
 });