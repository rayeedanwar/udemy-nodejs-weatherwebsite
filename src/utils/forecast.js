const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/016d28db4d249cf3cb861b5eadf83e3d/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.code === 400) {
            callback('Error in weather service: ' + body.error, undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast