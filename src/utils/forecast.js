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
			const { temperatureLow: tempLo, temperatureHigh: tempHi, summary } = body.daily.data[0];
			callback(
				`Today's high is ${tempHi} degrees with a low of ${tempLo} degress. ${summary} It is currently ${temp} degrees. There is a ${precip}% chance of rain.`,
				undefined,
			);
		}
	});
};

module.exports = forecast;
