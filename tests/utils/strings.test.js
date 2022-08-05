/**
 *  Test the Strings util
 */
 
 const StringUtils = require('../../src/utils/strings');
 
 describe('Capitalize', () => {
   test('empty string', () => {
     let result = StringUtils.capitalize('');
     expect(result).toBe('');
   });
  
   test('when null', () => {
     let result = StringUtils.capitalize();
     expect(result).toBe('');
   });
  
   test('when not a string', () => {
     let result = StringUtils.capitalize({ hello: 'world' });
     expect(result).toBe('');
   });
  
   test('all lowercase', () => {
     let result = StringUtils.capitalize('hello world');
     expect(result).toBe('Hello world');
   });
  
   test('all uppercase', () => {
     let result = StringUtils.capitalize('HELLO WORLD');
     expect(result).toBe('HELLO WORLD');
   });
  
   test('already capitalized', () => {
     let result = StringUtils.capitalize('Hello world');
     expect(result).toBe('Hello world');
   });
 });