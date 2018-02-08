var bcrypt = require('bcrypt');

const saltRounds = 10;


bcrypt.hash(password, saltRounds, function(err, hash) {
    this.passwordHash = hash;
    console.log(this.passwordHash)
   });