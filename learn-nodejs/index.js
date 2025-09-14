
const app = require('./app');


console.log(app);
let data = new Set([1,2,3,4,5,6,7,8]);

console.log([...data][0]);
console.log(data.values().next().value);
