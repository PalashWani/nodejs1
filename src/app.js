const path = require('path');
const express = require('express');
const { application } = require('express');
const hbs = require('hbs');

const app = express();
const port = 3000;

// Define paths for express config
const viewPath = path.join(__dirname,'../templates/views')
const viewPartials = path.join(__dirname, '../templates/partials')

// Setting Up handleBars and View Location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(viewPartials)

// Setup static directory to serve
console.log(__dirname);
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res)=> {
    res.render('index', {
        name: 'Palash wani',
        title: 'Weather application'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        name: 'Palash Wani',
        title: 'Help'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Meself',
        name: 'Palash Wani'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    res.send({
        forcast: "It is snowing",
        location: "India",
        address: req.query.address
    });
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        error : 'Help article not found',
        title: '404',
        name: 'palash Wani'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        error : 'Page not found',
        title: '404',
        name: 'Palash Wani'
    })
})

app.listen(port, () => {
    console.log("the server is up and running on port 3000");
})


