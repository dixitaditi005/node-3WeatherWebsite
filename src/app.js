const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const pathtoPublicDirectory = path.join(__dirname, '../public')
const viewpathDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpathDirectory)
hbs.registerPartials(partialsPath)
app.use(express.static(pathtoPublicDirectory))


app.get('',(req,res) =>{
    res.render('index',{
        title:'Welcome to home page',
        name: 'Created by Aditi'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'Welcome to about page',
        name: 'Created by Aditi'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Welcome to help page',
        name: 'Created by Aditi'
    })
})

/*app.get('' , (req,res) =>{
    res.send('hello its main page.')
})

app.get('/help', (req, res) =>{
    res.send('Hi its help page.')
})

app.get('/about', (req,res) =>{
    res.send('<h1>Welcome to weather page.</h1>')
})*/

app.get('/weather', (req, res) =>{

    if(!req.query.address)
    return res.send({
        error:'No address found in the provided url'
    })
     
    geocode(req.query.address, (error,{longitude,latitude,location} ={})=>{

        if (error){
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastdata) => {
    
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location,
                forecast:forecastdata
            })
            
          })
    })
    
    })
    


app.get('/help/*',(req,res) =>{
    res.render('error',{
        title:'Welcome to error page',
        error: 'help document not found.',
        name: 'Created by Aditi'
    })
})

app.get('/*',(req,res) =>{
    res.render('error',{
        title:'Welcome to error page',
        error: '404 error page.',
        name: 'Created by Aditi'
    })
})


app.listen(port,() => {
    console.log('Hey! server is listning on' + port )
})