const express = require('express')
const morgan = require('morgan')
const pages = require('./views/main.js')
const app = express()

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send(pages(''))
})

app.listen('1337', () => {
    console.log('Server running.')
})

