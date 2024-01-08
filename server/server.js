require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const {newPatient, getPatients, completeOrder} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.get('/api/getPatients', getPatients)
app.post('/api/newPatient', newPatient)
app.put('/api/completeOrder/:id', completeOrder)


app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))