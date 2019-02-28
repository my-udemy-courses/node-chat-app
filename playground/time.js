const moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

var createdAt = moment().valueOf() - 1000 * 60 * 60;
var date = moment(createdAt);
console.log(date.format('DD. MMM HH:mm:ss'));
console.log(date.format('h:mm:ss a'));