const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;

const petPath = path.join(__dirname, 'pets.json')

// body parser & morgan middleware
app.use(morgan())
app.use(express.json());


// POST
app.post('/pets', (req, res) => {

    //es6 syntax destructuring obj
    const {name, age, kind} = req.body
    
    const newPet = {
        name,
        age,
        kind
    }

    fs.readFile(petPath,'utf8', (readErr, petsJSON) => {
        if (readErr) {
            console.error(readErr.stack)
            res.status(500).end('Internal Server Error')
        }

        const pets = JSON.parse(petsJSON); // array type

        // Data validation
        if ( name === "" || kind === "" || isNaN(age) ) {
            res.status(400).end("Bad request")
        } else {
            pets.push(newPet);
            res.status(201).json(newPet)
        }
        
        fs.writeFile(petPath, JSON.stringify(pets), (writeErr) => {
            if (writeErr) {
                console.error(writeErr.stack)
                res.status(500).end('Internal Server Error')
            }
        })
    })

})

// GET
app.get('/pets/3', (req, res, next) => {
    fs.readFile(petPath,'utf8', (readErr, petsJSON) => {
        if (readErr) {
            console.error(readErr.stack)
            res.status(500).end('Internal Server Error')
        }
        const pets = JSON.parse(petsJSON)
        const petToGet = pets[2]

        if (petToGet === undefined) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404).end('Not Found');
        } else {
            res.status(200).json(petToGet)
        }

    })
})

// PATCH
app.patch('/pets/3', (req, res) => {
    fs.readFile(petPath,'utf8', (readErr, petsJSON) => {
        if (readErr) {
            console.error(readErr.stack)
            res.status(500).end('Internal Server Error')
        }
        const pets = JSON.parse(petsJSON)
        let petToUpdate = pets[2];
        petToUpdate.name = req.body.name;
        res.status(201).json(petToUpdate)

        // Data validation
        // if ( req.body.name || req.body.kind || typeof req.body.age === 'number' ) {
        //     const {name, age, kind} = req.body
        //     petToUpdate = {
        //         name, age, kind
        //     }
        //     
        // } else {
        //     res.status(400).end("Bad request")
        // }

        fs.writeFile(petPath, JSON.stringify(pets), (writeErr) => {
            if (writeErr) {
                console.error(writeErr.stack)
                res.status(500).end('Internal Server Error')
            }
        })
    })
})

// DELETE
app.delete('/pets/3', (req, res) => {
    fs.readFile(petPath,'utf8', (readErr, petsJSON) => {
        if (readErr) {
            console.error(readErr.stack)
            res.status(500).end('Internal Server Error')
        }
        const pets = JSON.parse(petsJSON)
        const petToDelete = pets[2];
        pets.pop(petToDelete)
        
        fs.writeFile(petPath, JSON.stringify(pets), (writeErr) => {
            if (writeErr) {
                console.error(writeErr.stack)
                res.status(500).end('Internal Server Error')
            }
        })

        res.status(200).json(petToDelete)

    })
})

// handle all unknown http requests
app.use(function (req, res, next) {
    res.status(404).end("Not Found")
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})