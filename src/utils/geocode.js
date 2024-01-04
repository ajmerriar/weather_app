const request = require('request')

const geocode = (city,callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=9128d8519f019d444a27bfef01f4484d`

    request({ url, json: true } , (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message) {
            callback("Unable to Find Location. Try search some other location.", undefined)
        } else {
            const locationData = {
                city: body.name,
                // country: country,
                weather: body.weather[0].description,
                temperature: body.main.temp,
                feelsLike: body.main.feels_like
            }
            callback(undefined, 'Weather Data: '+ `${locationData.weather} with a temperature of ${locationData.temperature} K, and it feels like ${locationData.feelsLike} K out.`)
        }
    })
}

module.exports = geocode