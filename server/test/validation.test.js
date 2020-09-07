const expect = require('expect')
const { isValidString } = require('../utils/validation')


describe('isValidString', () => {
    it('it should reject non string', () => {
        let number = Math.random()
        const response = isValidString(number)
        expect(response).toBe(false)
    })

    it('it should reject string with only whitespace', () => {
        let emptyString = '   '
        const response = isValidString(emptyString)
        expect(response).toBe(false)
    })
    it('it should allow strings with non-white space character', () => {
        let string = '   string    '
        const response = isValidString(string)
        expect(response).toBe(true)
    })
})