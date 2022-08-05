/**
 *  String helpers
 */
 
/**
 *  Capitalize a string
 */
 let _capitalize = (text) => {
    if (!text || typeof text !== 'string') {
      return '';
    }
   
    return `${text[0].toUpperCase()}${text.slice(1, text.length)}`;
  };
   
  module.exports = {
    capitalize: _capitalize,
  };