// set up dependencies
// express
const express = require('express');
const app = express();

// fs and path
const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

// port
const port = process.env.PORT || 8000;

// handle routes
// /pets
app.get('/pets', (req, res, next) => {
    fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
        if (readErr) {
            console.error(readErr.stack)
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain')
            return res.end('Internal Server Error');
        }
        res.setHeader('Content-Type', 'application/json')
        res.end(petsJSON)
    })
})

// /pets/:id
app.get('/pets/:id', (req, res, next) => {
    const id = req.params.id // id is string type
    // console.log(isNaN(id))
    if (isNaN(id)) {
        next({ status: 400, message: 'Please enter a number!' }) // 400: bad request
    } else {
        fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
            if (readErr) {
                console.error(readErr.stack)
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain')
                return res.end('Internal Server Error');
            }
            var pets = JSON.parse(petsJSON)
            if (id == 0) {
                var petsJSON = JSON.stringify(pets[0])
                res.setHeader('Content-Type', 'application/json')
                res.end(petsJSON)
            } else if (id == 1) {
                var petsJSON = JSON.stringify(pets[1])
                res.setHeader('Content-Type', 'application/json')
                res.end(petsJSON)
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found')
            }
        })
    }
})


app.get('/boom', function(req, res, next) {
    next({ status: 500, message: 'Internal Server Error' })
});

// handle error id is not a number on /pets/:id and /boom internal server error
app.use((err, req, res, next) => {
    console.error(err.stack)
    return res.send(err.status, { message: err.message });
})

// handle all unknown http requests
app.use(function (req, res, next) {
    res.status(404).end("Not Found")
})

// listen on port
app.listen(port, () => {
    console.log('Listening on port', port)
})

// test purpose
module.exports = app;
