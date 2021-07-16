// routes.js
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

// var str = '/pets/'
// const petRegExp = /^\/pets\/(.*)$/;
// console.log(petRegExp)
// console.log(str.match(petRegExp))
// console.log(petRegExp.test(str))

// if (petRegExp.test(str)) {
    
// }

routes = {
    '/pets': function(req, res) {
        if (req.method === 'GET') {
            fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
                if (readErr) {
                    console.error(readErr.stack)
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('Internal Server Error');
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(petsJSON);
                });
        }
    },

    '/pets/0': function(req, res) {
        if (req.method === 'GET') {
            fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
                if (readErr) {
                    console.error(readErr.stack)
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('Internal Server Error');
                }
                var pets = JSON.parse(petsJSON)
                var petsJSON = JSON.stringify(pets[0])
                res.setHeader('Content-Type', 'application/json');
                res.end(petsJSON);
                });
        }
    },

    '/pets/1': function(req, res) {
        if (req.method === 'GET') {
            fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
                if (readErr) {
                    console.error(readErr.stack)
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('Internal Server Error');
                }
                var pets = JSON.parse(petsJSON)
                var petsJSON = JSON.stringify(pets[1])
                res.setHeader('Content-Type', 'application/json');
                res.end(petsJSON);
                });
        }
    },

    // petRegExp: function(req, res) {
    //     if (req.method === 'GET') {
    //         fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    //             if (readErr) {
    //                 console.error(readErr.stack)
    //                 res.statusCode = 500;
    //                 res.setHeader('Content-Type', 'text/plain');
    //                 return res.end('Internal Server Error');
    //             }
    //             var pets = JSON.parse(petsJSON)
    //             var petsJSON = JSON.stringify(pets[1])
    //             res.setHeader('Content-Type', 'application/json');
    //             res.end(petsJSON);
    //             });
    //     }
    // },
};
  
module.exports = routes;