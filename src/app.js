const path= require('path')
const express = require ('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')

const app = express()

// Defining the path for EXpress config
const publicDir =path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

////Setup Handlebars
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup Static directory path
app.use(express.static(publicDir))

// main page
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Ajmer Singh'
    })
})

// about page
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Ajmer Singh'
    })
})

//Help page
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message: 'What kind of help do you need',
        name: 'Ajmer Singh'
    })
})


// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.city, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            location: req.query.city ,
            forecast: forecastData
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Ajmer Singh',
        errorMessage: 'Help Article not found'
    })
})


// errror page
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Ajmer Singh',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000 , () => {
    console.log('server is up on port 3000')
})