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
    }, function(err, data) {
        console.log('Admin Acknowledge!', data)
        $('#message-form [name=message]').val('')
    })
})

var localButton = $('#send-location')
localButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported on your browser')
    }
    navigator.geolocation.getCurrentPosition(function({ coords: { latitude, longitude } }) {
        socket.emit('current_location-message', {
                latitude,
                longitude
            })
            // console.log('position', position)
    }, function() {
        alert('unable to fetch location')
    })
})