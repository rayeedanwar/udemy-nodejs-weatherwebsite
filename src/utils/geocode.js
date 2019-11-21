const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicmFud2FyIiwiYSI6ImNqeGhsbGhmYTFkbG4zcG13NWFrM2hhbWcifQ.4HfPTHmPOZoZcKGvJuL3zw&limit=1"

    request( {url, json: true}, (error, {body}) => {
        if(error) {
            callback("Ya can't de service", undefined)
        } else if(body.message) {
            callback("De service be trippin: " + response.body.message, undefined)
        } else if(body.features.length === 0) {
            callback('Canny find yer location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } )
}

module.exports = geocode