var socket = io();
socket.on('connect', function() {
    console.log('Connected to Server')
    socket.emit('createMessage', {
        to: 'valentine@client.io',
        message: 'I received your message',
    })
});
socket.on('newMessage', function(data) {
    console.log('new-email', data)
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {
    console.log('Disconnected from Server')
});