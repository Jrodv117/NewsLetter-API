const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.listen(3000, () => {
	console.log('run server, run');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);
	const url = 'https://us9.api.mailchimp.com/3.0/lists/d758e13daf';

	const options = {
		method: 'POST',
	};

	const request = https.request(url, options, (response) => {
		response.on('data', (data) => {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

//cbbbfd74afdd919eb41b21c7224256e1-us8
