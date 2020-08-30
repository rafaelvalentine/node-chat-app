const moment = require('moment')


const generateMessage = (obj = {}, message = 'Welcome to the Chat App', from = 'Admin', to = null) => ({
    from,
    to,
    message,
    ...obj,
    createdAt: moment().valueOf()
})

const generateLocationMessage = (from = 'Admin', to = 'all', coords = {}) => ({
    from,
    to,
    url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: moment().valueOf()
})
module.exports = {
    generateMessage,
    generateLocationMessage
}