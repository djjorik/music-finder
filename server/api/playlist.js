const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const Playlist = require('../models/playlist');

router.post('/add-track', function (req, res, next) {
    passport.authenticate('jwt',
      async function (err, user, info) {
        if (err) res.send(err);
        if (user) {
          let playlist = await Playlist.findOne({ username: user.username });
          if (playlist == null) {
            playlist = await Playlist.create({
              username: user.username,
              tracks: { trackname: req.body.songname, artistname: req.body.artistname }
            })
            res.send({ status: 'Added to playlist, created' })
          }
          if (playlist != null) {
            await Playlist.update({ username: user.username }, {
              username: user.username,
              $addToSet: {tracks: {trackname: req.body.songname, artistname: req.body.artistname}}
            })
            res.send({ status: 'Added to playlist, updated' })
          }
        } else {
          return res.send({ error: 'Token is wrong' });
        }
      }
    )(req, res, next);
  })
  
  router.get('/get-playlist', function (req, res, next) {
    passport.authenticate('jwt',
      async function (err, user, info) {
        if (err) res.send(err);
        if (user) {
          let playlist = await Playlist.findOne({username: user.username});
          res.send(playlist)
        } else {
          return res.send(info);
        }
      }
    )(req, res, next);
  })
  
  router.post('/delete-track', function (req, res, next) {
    passport.authenticate('jwt',
      async function (err, user, info) {
        if (err) res.send(err);
        if (user) {
          await Playlist.update({username: user.username},
            {$pull:{tracks:{
              trackname: req.body.trackname,
              artistname:req.body.artistname,
            }}}
          );
          res.send('ok');
        } else {
          return res.send(info);
        }
      }
    )(req, res, next);
  })

  module.exports = router;