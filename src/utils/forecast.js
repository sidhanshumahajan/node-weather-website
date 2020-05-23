const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=19c8b4422d1028a372c4120b3b0e1050&query=' + latitude + ',' + longitude + '';
    request({
        url: weatherUrl,
        json: true,
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!!", undefined);
        } else if (body.error) {
            callback("Unable to find the location", undefined);
        } else {
            const data = {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            };
            callback(undefined,'Weather is '+body.current.weather_descriptions[0]+ 
            ' It is currently ' + body.current.temperature + ' degress out. But it feelsLike '+body.current.feelslike +' degress out. There is a ' 
            + body.current.precip + '% chance of rain.');
        }
    });
};
module.exports = forecast;