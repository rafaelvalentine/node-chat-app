// const mustasche = require("./libs/mustasche")

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
        // console.log('new-email', message)
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