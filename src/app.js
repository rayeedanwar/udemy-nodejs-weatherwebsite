const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//define paths fore express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'HELP MEH',
        msg: "What's up?",
        

    })
})

app.get('/weather', (req,res) => {
    const searchedLocation = req.query.address
    if(!searchedLocation) {
        return res.send({
            error: "Missing search term 'address'"
        })
    }

    geocode(searchedLocation, (error, {longitude, latitude, location:locationFound} ={  }) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(longitude,latitude, (error,weatherResults) => {
            if(error) {
                return res.send({
                    error
                })
            }
            return res.send({
                searched: searchedLocation,
                locationFound,
                weatherResults
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "send somets to search init"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "404"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})