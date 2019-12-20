const request = require('request');
const secretKey = process.env.DARKSKY_KEY;

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
			const { temperatureLow: tempLo, temperatureHigh: tempHi, summary } = data[0];
			callback(
				undefined,
				`${summary} It is currently ${temp} degrees. There is a ${precip}% chance of rain. Today has an high of ${tempHi} with a low of ${tempLo}`,
			);
		}
	});
};

module.exports = forecast;
