var message = {
    _id: Math.random(),
    email: '',
    username: ''
}
var messageTextBox = $('#message-form [name=message]')
$('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
        ...message,
        from: '',
        to: '',
        message: messageTextBox.val()
    }, function(err, data) {
        if (err) return alert(err)
        console.log('Admin Acknowledge!', data)
        messageTextBox.val('')
    })
})

var localButton = $('#send-location')
localButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported on your browser')
    }
    localButton.attr('disabled', true).text('Fetching location...')
    navigator.geolocation.getCurrentPosition(function({ coords: { latitude, longitude } }) {
        socket.emit('current_location-message', {
            latitude,
            longitude
        })
        localButton.attr('disabled', false).text('Send location')
            // console.log('position', position)
    }, function() {
        localButton.attr('disabled', false).text('Send location')
        alert('unable to fetch location')

    })
})