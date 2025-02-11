const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_TOKEN = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    const cars = 'https://api.hubspot.com/crm/v3/objects/cars?properties=name%2Cbrand%2Cproduction_country';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(cars, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Homepage', data });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cars', (req, res) => {
    try {
      res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
    } catch (error) {
      console.error(error);
    }
  });

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cars', async (req, res) => {
    const create = {
        properties: {
            "name": req.body.name,
            "brand": req.body.brand,
            "production_country": req.body.production_country
        }
    }

    const createCar = 'https://api.hubapi.com/crm/v3/objects/cars';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(createCar, create, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));