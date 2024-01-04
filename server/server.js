const express = require('express')
const cors = require('cors')
const {newPatient, getPatients} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/getPatients', getPatients)
app.post('/api/newPatient', newPatient)


app.listen(4004, () => console.log('Up on 4004'))