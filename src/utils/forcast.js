const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/de9275ef8afec2e904fbed15e81dab44/${latitude},${longitude}?units=si`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It's currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forcast