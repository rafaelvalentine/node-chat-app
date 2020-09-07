var socket = io()

function handleMessage(data) {
    const timestamp = moment(data.createdAt).format('H:mm')
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: data.message,
        timestamp,
        from: data.from
    })
    $('#messages').append(html)
    scrollToButton()
}

function handleLocationMessage(message) {
    const timestamp = moment(message.createdAt).format('H:mm')

    var template = $('#location-message-template').html()
    var html = Mustache.render(template, {
        url: message.url,
        timestamp,
        from: message.from
    })
    $('#messages').append(html)
    scrollToButton()
}

function scrollToButton() {
    // Selectors
    var messages = $('#messages')
    var newMessage = messages.children('li:last-child')
        // Heights

    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var penUltimateMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + penUltimateMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

function handleUserList(users) {
    const ol = $('<ol></ol>')

    users.forEach(user => {
        ol.append($('<li></li>').text(user))
    });

    $('#users').html(ol)
}
socket.on('connect', function() {
    var params = $.deparam(window.location.search)

    // socket.emit('join', params, function(err, result){
    //     if (err) {
    //         return
    //     }
    // })
    socket.emit('newUser', {...message, ...params }, function(err, data) {
        if (err) {
            alert(err)
            window.location.href = '/'
            return
        }
        console.log('No error')
    })
})

socket.on('newMessage', handleMessage)
socket.on('welcome_user', handleMessage)
socket.on('new_user_joined', handleMessage)
socket.on('newLocationMessage', handleLocationMessage)
socket.on('updateUserList', handleUserList)
socket.on('event', function(data) {})
socket.on('disconnect', function() {
    console.log('Disconnected from Server')
})