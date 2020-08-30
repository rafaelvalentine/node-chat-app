const { expectCt } = require('helmet')
const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('../utils/message')

describe('generateMessage', () => {
    it('it should generate correct message object', () => {
        let from = 'From Admin'
        let to = 'valentine'
        let message = 'Welcome to the Chat App'
        const response = generateMessage({}, message, from, to)
        expect(response.message).toBe(message)
        expect(response.from).toBe(from)
        expect(response.createdAt).toBeA('number')
    })
})

describe('generateLocationMessage', () => {
    it('it should generate correct location object', () => {
        let from = 'rafaelvalentine'
        let to = 'all'
        let latitude = Math.random()
        let longitude = Math.random()
        let url = `https://google.com/maps?q=${latitude},${longitude}`
        const response = generateLocationMessage(from, to, { latitude, longitude })
        expect(response).toInclude({ from, to, url })
        expect(response.createdAt).toBeA('number')
    })
})