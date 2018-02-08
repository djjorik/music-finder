const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const user = mongoose.Schema({
  username: {
    type: 'string',
    minLength: 2,
    maxLength: 20,
    required: true,
    unique: true,
},
  passwordHash: String,

})
const saltRounds = 10

user.virtual('password')
  .set(function hashPassword(password) {
    this.plainPassword = password
    if (password) {
      this.passwordHash = bcrypt.hashSync(password, saltRounds)
    }
    else {
      this.passwordHash = undefined
    }
  })

  .get(function () {
    return this.plainPassword;
  })

user.methods.checkPassword = function (password, passwordHashed) {
  return bcrypt.compareSync(password, passwordHashed);
  
}

module.exports = mongoose.model('User', user)
