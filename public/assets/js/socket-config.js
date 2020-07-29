var socket = io()

function handleMessage(data) {
    var li = $('<li></li>').text(`${data.from}: ${data.message}`)
    $('#messages').append(li)
    console.log('new-email', data)
}
socket.on('connect', function() {
    console.log('Connected to Server')
        // socket.emit('createMessage', {
        //     to: 'valentine@client.io',
        //     message: 'I received your message',
        // })
})
socket.emit('newUser', message, function(data) {
    console.log('Admin Acknowledge!', data)
})

socket.on('newMessage', handleMessage)
socket.on('welcome_user', handleMessage)
socket.on('new_user_joined', handleMessage)
socket.on('event', function(data) {})
socket.on('disconnect', function() {
    console.log('Disconnected from Server')
})