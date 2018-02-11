const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const playlistRoutes = require('./playlist');

router.use('/', authRoutes);
router.use('/', playlistRoutes);


module.exports = router;