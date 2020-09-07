[{
    id: '/#12poiajdspfoif',
    name: 'Andrew',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(_id, username, room) {
        const user = { _id, username, room };
        this.users.push(user);
        return user;
    }
    removeUser(_id) {
        const user = this.getUser(_id)
        if (user) {

            this.users = this.users.filter(user => user._id !== _id)
        }
        return user
    }
    getUser(_id) {
        const user = this.users.filter(user => user._id === _id)
        return user[0]
    }
    getUserList(room) {
        const users = this.users.filter(user => user.room === room).map(user => user.username)
        return users
    }
}

module.exports = { Users };

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);