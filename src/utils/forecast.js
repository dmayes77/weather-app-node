const request = require('request');
const secretKey = '5eae0c461eeaa013f942b963e7c25b32';

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/${secretKey}/${lat},${long}`;

	request({ url: url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to location services!');
		} else if (body.error) {
			callback('Unable to find location. Try another search.');
		} else {
			const { temperature: temp, precipProbability: precip } = body.currently;
			const { data } = body.daily;
			callback(undefined, `${data[0].summary} It is currently ${temp} degrees. There is a ${precip}% chance of rain`);
		}
	});
};

module.exports = forecast;
