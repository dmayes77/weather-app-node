const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	const location = search.value;

	msgOne.textContent = 'Loading...';
	msgTwo.textContent = '';

	fetch(`/weather?address=${location}`).then(res => {
		res.json().then(data => {
			const { error, location, forecast } = data;
			if (error) {
				msgOne.textContent = error;
			} else {
				msgOne.textContent = location;
				msgTwo.textContent = forecast;
			}
		});
	});
});
