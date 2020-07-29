const { expectCt } = require('helmet')
const expect = require('expect')
const { generateMessage } = require('../utils/message')

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