// require env config
// require('./config/config')
// module imports
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')

// local imports
// const { connectToDB } = require('./database')
// const BaseRoute = require('./routes')
const publicPath = path.join(__dirname, '../public')
const app = express()

const port = process.env.PORT || 3000
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(helmet())
app.use(express.static(publicPath))
    // app.use('/api/v1', BaseRoute)
app.listen(port, () => {
    // connectToDB()
    console.log(`App listening on port ${port}!`)
})

module.exports = { app }