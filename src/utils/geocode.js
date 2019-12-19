const request = require('request');
const token = 'pk.eyJ1IjoiZG1heWVzNzciLCJhIjoiY2s0OWZtYWxiMDRzYjNubzFocDZldnF0MCJ9.qoyevXXTjN7fnE2zlHZwsg';

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address,
	)}.json?access_token=${token}&limit=1`;
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to location services!');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.');
		} else {
			const { center, place_name } = body.features[0];
			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				location: place_name,
			});
		}
	});
};

module.exports = geocode;
