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
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isValidString } = require('./utils/validation')
const { Users } = require('./utils/users')
const users = new Users()
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
    client.on('newUser', ({ _id, email, username, room }, callback) => {
        const message = {
            _id,
            email,
            username,
            message: '',
            from: 'Admin'
        }

        if (!(isValidString(username)) || !(isValidString(room))) {
            callback('invalid username/room identity')
            return
        }

        client.join(room)
        users.removeUser(client.id)
        users.addUser(client.id, username, room)
        io.to(room).emit('updateUserList', users.getUserList(room))
        client.emit('welcome_user', generateMessage({...message, message: 'Welcome to the Chat App', to: username }))
        client.broadcast.to(room).emit('new_user_joined', generateMessage({...message, message: `${username} Joined the Group` }))
        callback(null, 'Successfully Joined Room!!')
    })
    client.on('createMessage', (data, callback) => {
        const message = {
                from: data.from,
                to: data.to,
                message: data.message
            }
            // console.log(message)
        io.emit('newMessage', generateMessage(message))
        callback(null, '')
            // client.broadcast.emit('newMessage', message)
    })
    client.on('current_location-message', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', 'all', coords))
    })
    client.on('disconnect', () => {
        const user = users.removeUser(client.id)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList())
            io.to(user.room).emit('newMessage', generateMessage({ from: 'Admin', message: `${user.username} has left the room` }))
        }
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