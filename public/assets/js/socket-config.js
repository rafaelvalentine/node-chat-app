var socket = io()
socket.on('connect', function() {
    console.log('Connected to Server')
        // socket.emit('createMessage', {
        //     to: 'valentine@client.io',
        //     message: 'I received your message',
        // })
    socket.emit('new-user', {
        _id: Math.random(),
        email: 'valentine@client.io',
        username: 'rafaelvalentine,'
    })
})
socket.on('newMessage', function(data) {
    console.log('new-email', data)
})
socket.on('welcome-user', function(data) {
    console.log('user', data)
})
socket.on('new-user-joined', function(data) {
    console.log('new-user', data)
})
socket.on('event', function(data) {})
socket.on('disconnect', function() {
    console.log('Disconnected from Server')
})