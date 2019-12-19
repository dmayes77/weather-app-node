//core modules
require('dotenv').config();
const path = require('path');
//node modules
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up views engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static directory
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'David Mayes',
		helpText: 'Enter a city or zip code to get the weather!',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'David Mayes',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'David Mayes',
		helpText: 'This is some helpful text',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a city or zip code!',
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'David Mayes',
		errorMsg: 'Help article not found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'From 404.hbs',
		name: 'David Mayes',
		errorMsg: '404 page not found',
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
