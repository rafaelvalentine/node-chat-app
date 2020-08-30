const moment = require('moment');

// const date = moment()
// console.log(date.format('MMM Do, YYYY'))

const sometimeStamp = moment().valueOf()
console.log(sometimeStamp)

const date = moment().format('HH:mm:ss a')
console.log(date)