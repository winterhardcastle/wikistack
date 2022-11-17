const express = require('express')
const router = express.Router()
const wikiPage = require('../views/wikipage.js')
const addPage  = require('../views/addPage.js')

router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/')
    // try {
    // res.send(wikiPage())
    // } catch(error){next(error)}
    next()
})

router.post('/', (req, res, next) => {
    res.send('got to POST /wiki/');
    next()
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
    next()
})

module.exports = router;