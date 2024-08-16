const greeting = 'HELLO';
function greetings(name){
    return `Hello ${name}`;
}
// module.exports = greeting;
module.exports = {
    greeting: greeting,
    greetFn:greetings
};