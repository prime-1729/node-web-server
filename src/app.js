const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode.js')
const forecast = require('./utlis/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config.
const dirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dirpath))
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Karan'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Karan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        message : 'This is a help page',
        name :'Karan'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        res.send({
            error : 'Please provide address'
        })
    }
    else{
        const address = req.query.address
        geocode(address,(error,{lattitude,longitude,place}={})=>{
            if (error){
                return res.send({
                    error : error
                })
            }
            forecast(lattitude,longitude, (error, forecastdata) => {
                if (error){
                    return res.send({
                        error : error
                    })
                }
                console.log(place)
                console.log('Data', forecastdata)
                res.send({
                    forecast : forecastdata,
                    location : place
                })
              })
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title: 'Error 404',
        message: 'Help page not found',
        name : 'Karan'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title: 'Error 404',
        message: 'Page not found',
        name: 'Karan'
    })
})

app.listen(port,()=>{
    console.log('Server is running')
})