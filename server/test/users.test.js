const expect = require('expect');

const { Users } = require('../utils/users');

describe('Users', () => {
    let users
    users = new Users();
    beforeEach(() => {
        // const Users = new Users()
        users.users = [{
                _id: 1,
                username: 'Valentine',
                room: 'Vue Course'
            },
            {
                _id: 2,
                username: 'Rafael',
                room: 'Node Course'
            }, {
                _id: 3,
                username: 'Ozichukwu',
                room: 'React Course'
            },
            {
                _id: 4,
                username: 'Bobby',
                room: 'React Course'
            }
        ]
    })


    it('should add new user', () => {
        var users = new Users();
        var user = {
            _id: '123',
            username: 'Andrew',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user._id, user.username, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        const user = users.removeUser(4)
        expect(users.users).toNotContain(user)
    })
    it('should not remove user', () => {
        const user = users.removeUser(Math.random())
        expect(user).toNotExist()
        expect(users.users.length).toEqual(4)
    })
    it('should find user', () => {
        const user = users.getUser(4)
        expect(users.users).toContain(user)
    })

    it('should not find user', () => {
        const user = users.getUser(5)
        expect(user).toNotExist()
    })
    it('should return names for node course', () => {
        // var users = new Users();
        const userList = users.getUserList('React Course')

        expect(userList).toEqual(['Ozichukwu', 'Bobby'])
    })

});