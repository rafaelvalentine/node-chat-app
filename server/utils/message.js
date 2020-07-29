const generateMessage = (obj = {}, message = 'Welcome to the Chat App', from = 'Admin', to = null) => ({
    from,
    to,
    message,
    ...obj,
    createdAt: new Date().getTime()
})

module.exports = {
    generateMessage
}