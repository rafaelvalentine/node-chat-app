// require env config
// require('./config/config')
// module imports
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const socketIO = require('socket.io')
const { generateMessage } = require('./utils/message')
    // local imports
    // const { connectToDB } = require('./database')
    // const BaseRoute = require('./routes')
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 5050
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(helmet())
app.use(express.static(publicPath))
    // app.use('/api/v1', BaseRoute)

io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    // client.on('event', data => { /* … */ });
    client.on('newUser', ({ _id, email, username }, callback) => {
        const message = {
            _id,
            email,
            username,
            message: '',
            from: 'Admin'
        }
        client.emit('welcome_user', generateMessage({...message, message: 'Welcome to the Chat App', to: username }))
        client.broadcast.emit('new_user_joined', generateMessage({...message, message: 'New User Joined the Group' }))
        callback('this is from the server!')
    })
    client.on('createMessage', (data, callback) => {
            const message = {
                    from: data.from,
                    to: data.to,
                    message: data.message
                }
                // console.log(message)
            io.emit('newMessage', generateMessage(message))
            callback('this is from the server!')
                // client.broadcast.emit('newMessage', message)
        })
        // client.emit('newMessage', {
        //     from: 'valentine@testing.com',
        //     message: 'Hi!, we are testing socket.io',
        //     createdAt: new Date().getTime()
        // })
    client.on('disconnect', () => {
        console.log('Disconnected from Client')
    })
    console.log('New User Connected')
})

server.listen(port, () => {
    // connectToDB()
    console.log(`Server running at http://127.0.0.1:${port}/`)
    console.log(`Server running at http://localhost:${port}/`)
})

module.exports = { app }