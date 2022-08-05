/**
 *  OpenWeatherMap API
 *  Fetching weather information
 */
 
 const axios = require('axios'),
 Logger = require('./../modules/logger'),
 Env = require('./../modules/env'),
 StringUtils = require('./../utils/strings');

const IMPERIAL_COUNTRIES = ['usa'];
const WEATHER_EMOJIS = {
 thunderstorm: '⛈',
 drizzle: '🌧',
 rain: '🌧',
 snow: '🌨',
 mist: '🌧',
 smoke: '☁️',
 haze: '☁️',
 dust: '☁️',
 fog: '☁️',
 sand: '☁️',
 ash: '☁️',
 squall: '☁️💨',
 tornado: '🌪',
 clear: '☀️',
 clouds: '☁️',
};

/**
*  Takes a city and a country
*  Returns location information
*/
const _getCityWeather = async (city, country) => {
 if (!city) {
   throw new Error('[OpenWeatherMap][_getCityWeather] city is not defined.');
 }

 const apiUrl = Env.fetch('OPEN_WEATHER_API_URL');
 const apiKey = Env.fetch('OPEN_WEATHER_API_KEY');

 let unit = getTemperatureUnit(country);
 let location = `${city}`;

 if (!!country) {
   location = `${location},${country}`;
 }

 const url = `${apiUrl}/weather?q=${encodeURI(location)}&units=${unit}`;

 Logger.info(
   `[OpenWeatherMap][_getCityWeather] requesting temperature for ${location}`
 );

 try {
   let payload = await axios.get(`${url}&APPID=${apiKey}`);
   const unitSymbol = unit === 'imperial' ? '℉' : '℃';
   const temperature =
     !!payload &&
     !!payload.data &&
     !!payload.data.main &&
     !!payload.data.main &&
     `${Math.round(payload.data.main.temp)}${unitSymbol}`;

   const weather =
     !!payload &&
     !!payload.data &&
     !!payload.data.weather &&
     !!payload.data.weather.length > 0 &&
     !!payload.data.weather[0] &&
     payload.data.weather[0];

   Logger.info(
     `[OpenWeatherMap][_getCityWeather] temperature found ${location}`
   );

   return {
     temps: temperature,
     emoji: getWeatherEmoji(weather.main),
     description: StringUtils.capitalize(weather.description),
   };
 } catch (e) {
   throw new Error(
     `[OpenWeatherMap][_getCityWeather] Error for URL ${url}: ${e.message}`
   );
 }

 return null;
};

/*********************************************************/
/*                   PRIVATE FUNCTIONS                   */
/*********************************************************/

/**
*  Fetch emoji from WEATHER_EMOJIS
*/
const getWeatherEmoji = (main) => {
 if (!main) {
   return;
 }

 return WEATHER_EMOJIS[main.toLowerCase()]
   ? WEATHER_EMOJIS[main.toLowerCase()]
   : main;
};

/**
*  Get temperature unit
*/
const getTemperatureUnit = (country) => {
 if (!!country && !!IMPERIAL_COUNTRIES.includes(country.toLowerCase())) {
   return 'imperial';
 }
 return 'metric';
};

module.exports = {
 getCityWeather: _getCityWeather,
};