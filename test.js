const {genSaltSync, hashSync} = require("bcrypt");

function hashPassword (str) {
    const salt = genSaltSync(12);
    const hash = hashSync(str, salt);
    return hash;
}
console.log(hashPassword("12345"));
console.log(hashPassword("654321"));
console.log(hashPassword("0258"));
console.log(hashPassword("85463"));
console.log(hashPassword("74123"));
