const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload =require('./../config/upload')

const controller = require('./../controllers/news');

router.post('/getUserNews', passport.authenticate('jwt', {session:false}), controller.getUserNews);
router.post('/getUserNewsFriends', passport.authenticate('jwt', {session:false}), controller.getUserNewsFriends);
router.post('/getUserNewsGroups', passport.authenticate('jwt', {session:false}), controller.getUserNewsGroups);
router.post('/createRecord', passport.authenticate('jwt', {session:false}), controller.createRecord);


module.exports = router;