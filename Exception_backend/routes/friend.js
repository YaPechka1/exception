const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('./../controllers/friend');

router.post('/getUsers', passport.authenticate('jwt', {session:false}), controller.getUsers);
router.post('/searchUsers', passport.authenticate('jwt', {session:false}), controller.searchUsers);
router.post('/deleteFriend', passport.authenticate('jwt', {session:false}), controller.deleteFriend);
router.post('/deleteApplication', passport.authenticate('jwt', {session:false}), controller.deleteApplication);
router.post('/deleteMyApplication', passport.authenticate('jwt', {session:false}), controller.deleteMyApplication);
router.post('/acceptApplication', passport.authenticate('jwt', {session:false}), controller.acceptApplication);
router.post('/pushFriend', passport.authenticate('jwt', {session:false}), controller.pushFriend);


router.get('/getFriendApplication', passport.authenticate('jwt', {session:false}), controller.getFriendApplication);
router.get('/getMyApplication', passport.authenticate('jwt', {session:false}), controller.getMyApplication);


module.exports = router;