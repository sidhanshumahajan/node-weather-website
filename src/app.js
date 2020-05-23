const path = require('path');
const geocode = require('./utils/gecode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//register partial for handlebars
hbs.registerPartials(partialPath);

// setup a static directory to serve
//use to customize a express server
app.use(express.static(publicDirectoryPath));

// creating a routing for pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        createdBy: 'Sidhanshu Mahajan'
    }); //allow to render our html page
});
app.get('/about', (req, res) => {
    res.render('about', {
        name: "Sidhanshu",
        title: "About Me",
        createdBy: 'Sidhanshu Mahajan'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        createdBy: 'Sidhanshu Mahajan',
        message: "Help Service"
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(req.query.address,(error,{latitude, longitude, location } ={}) => {
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
                address: req.query.address
            });
        });
    });

});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        message: "Help article not found",
        createdBy: 'Sidhanshu Mahajan'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: "page not found",
        createdBy: 'Sidhanshu Mahajan'
    });
});
// set up a portNo for express server
app.listen(3000, () => {
    console.log("server is running");
});
