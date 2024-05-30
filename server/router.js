const express = require('express')

// creat a router object
const router = express.Router();

// This code defines a route for HTTP GET requests to the root URL ('/').
router.get('/', (req, res) => {
    res.send('Server is up and Running')
})

// exports the router object 
// so it can be used in other parts of the application. 
module.exports = router