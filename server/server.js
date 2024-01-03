const express = require('express')
const cors = require('cors')
const {} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())


app.listen(4004, () => console.log('Up on 4004'))