const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())

const { Pool } = require('pg');

const pool = new Pool ({
    user: 'thuandang',
    host: 'localhost',
    database: 'petshop',
    password: '',
    port: 5432,
})


// POST
app.post('/pets', async (request, response) => {
    try {
        const {name, age, kind} = request.body
        const insertCmd = 'INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3) RETURNING *'
        const values = [name, age, kind]
        await pool.query(insertCmd, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            }
            response.status(201).send(res.rows[0])
        })
    } catch (error) {
        console.log('Server error')
        response.status(500).json(error) 
    }
})

// GET
app.get('/pets/:id', async (request, response) => {
    try {
        const {id} = request.params
        const selectCmd = 'SELECT * FROM pets WHERE pet_id = $1'
        let {rows} = await pool.query(selectCmd, [id]);
        if (rows.length === 0) {
            response.status(404).end('NOT FOUND')
        } else {
            response.status(200).json(rows[0])
        }
    } catch (error) {
        console.log('Server error')
        response.status(500).json(error)
    }
})

// PATCH
app.patch('/pets/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const {name, age, kind} = request.body
        if ( name == null || kind == null || typeof age !== 'number' ) {
            response.status(400).send("Bad Request")
        } else {
            const updateCmd = 'UPDATE pets SET name = $1, age = $2, kind = $3 WHERE pet_id = $4 RETURNING *'
            const values = [name, age, kind, id]
            await pool.query(updateCmd, values, (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
                response.status(201).send(res.rows[0])
            })
        }
    } catch (error) {
        console.log('Server error')
        response.status(500).json(error)
    }
})

// DELETE
app.delete('/pets/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const deleteCmd = 'DELETE FROM pets WHERE pet_id = $1 RETURNING *'
        let {rows} = await pool.query(deleteCmd, [id]);
        response.status(200).json(rows[0])
    } catch (error) {
    console.log('Server error')
    response.status(500).json(error)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})