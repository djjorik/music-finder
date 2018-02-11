var express = require('express');
var router = express.Router();
var passport = require('../middlewares/auth');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const jwtsecret = require('../../config/config').secret;
const User = require('../models/user');


router.post('/register', async (req, res, err) => {
    try {
      if (req.body.username && req.body.password) {
        let user = await User.findOne({ username: req.body.username });
        if (user) res.send({ status: 'User has already register' })
        let newUser = await User.create(req.body);
        res.send({
          username: newUser.username,
          status: 'You are successfully registered.'
        })
      }
    }
    catch (err) {
      res.send({
        status: 'Sorry, try again a little later.'
      })
    }
  });
  
  router.post('/login', function (req, res, next) {
    passport.authenticate('local',
      function (err, user, info) {
        console.log(err, user, info)
        if (err) res.send(err);
        if (user) {
          const payload = {
            id: user.id,
            username: user.username
          };
          const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
          res.send({ user: user.username, token: 'JWT ' + token });
        } else {
          res.send(info);
          // return res.send(info);
        }
      }
    )(req, res, next);
  })
  
  router.get('/login-jwt', function (req, res, next) {
    passport.authenticate('jwt',
      function (err, user, info) {
        if (err) return next(err);
        if (user) {
          res.send('hello ' + user.username)
        } else {
          return res.send(info);
        }
      }
    )(req, res, next);
  })

  module.exports = router;