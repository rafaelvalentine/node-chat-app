var message = {
    _id: Math.random(),
    email: 'valentine@client.io',
    username: 'rafaelvalentine'
}
$('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
        ...message,
        from: message.username,
        to: 'User zero 1 Zero',
        message: $('#message-form [name=message]').val() || 'Hello!'
    }, function(data) {
        console.log('Admin Acknowledge!', data)
    })

})