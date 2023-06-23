const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('./../controllers/user_info');

router.get('/getUserInfo', passport.authenticate('jwt', {session:false}), controller.getUserInfo);
router.get('/getUserRecord', passport.authenticate('jwt', {session:false}), controller.getUserRecord);
router.get('/getUserPhotoAndVideo', passport.authenticate('jwt', {session:false}), controller.getUserPhotoAndVideo);
router.get('/getUserFriend', passport.authenticate('jwt', {session:false}), controller.getUserFriend);
router.get('/getUserGroup',passport.authenticate('jwt', {session:false}),controller.getUserGroup);

router.post('/editUserInfo',passport.authenticate('jwt', {session:false}),controller.editUserInfo);
router.post('/editUserAvatar',passport.authenticate('jwt', {session:false}),controller.editUserAvatar);

router.post('/getUserInfoPeople',passport.authenticate('jwt', {session:false}),controller.getUserInfoPeople);
router.post('/getUserRecordPeople',passport.authenticate('jwt', {session:false}),controller.getUserRecordPeople);
router.post('/getUserPhotoAndVideoPeople',passport.authenticate('jwt', {session:false}),controller.getUserPhotoAndVideoPeople);
router.post('/getUserFriendPeople', passport.authenticate('jwt', {session:false}), controller.getUserFriendPeople);
router.post('/getUserGroupPeople',passport.authenticate('jwt', {session:false}),controller.getUserGroupPeople);
router.post('/getFriendStatus',passport.authenticate('jwt', {session:false}),controller.getFriendStatus);

module.exports = router;