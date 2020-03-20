const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

//Application settings
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve - middleware
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index')
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (err, response) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        forcast(response.latitude, response.longitude, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                forcast: data,
                location: response.location,
                address: req.query.address
            })
        })
    })
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})