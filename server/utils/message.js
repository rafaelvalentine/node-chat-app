const generateMessage = (obj = {}, message = 'Welcome to the Chat App', from = 'Admin', to = null) => ({
    from,
    to,
    message,
    ...obj,
    createdAt: new Date().getTime()
})

const generateLocationMessage = (from = 'Admin', to = 'all', coords = {}) => ({
    from,
    to,
    url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: new Date().getTime()
})
module.exports = {
    generateMessage,
    generateLocationMessage
}