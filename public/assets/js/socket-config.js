var socket = io()

function handleMessage(data) {
    const timestamp = moment(data.createdAt).format('H:mm')
    var li = $('<li></li>').text(`${data.from}: ${timestamp} ${data.message}`)
    $('#messages').append(li)
    console.log('new-email', data)
}

function handleLocationMessage(message) {
    const timestamp = moment(message.createdAt).format('H:mm')
    var li = $('<li></li>')
    var a = $('<a target="_blank"> My Current Location</a>')
    li.text(`${message.from} ${timestamp}: `)
    a.attr('href', message.url)
    li.append(a)
    $('#messages').append(li)
    console.log('new-email', message)
}
socket.on('connect', function() {
    console.log('Connected to Server')
        // socket.emit('createMessage', {
        //     to: 'valentine@client.io',
        //     message: 'I received your message',
        // })
})
socket.emit('newUser', message, function(err, data) {
    console.log('Admin Acknowledge!', data)
})

socket.on('newMessage', handleMessage)
socket.on('welcome_user', handleMessage)
socket.on('new_user_joined', handleMessage)
socket.on('newLocationMessage', handleLocationMessage)
socket.on('event', function(data) {})
socket.on('disconnect', function() {
    console.log('Disconnected from Server')
})