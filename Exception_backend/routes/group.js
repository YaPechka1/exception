const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('./../controllers/group');

router.get('/getUserGroup', passport.authenticate('jwt', {session:false}), controller.getUserGroup);
router.get('/getUserGroupAdmin', passport.authenticate('jwt', {session:false}), controller.getUserGroupAdmin);
router.post('/getGroupAll', passport.authenticate('jwt', {session:false}), controller.getGroups);
router.post('/searchGroups', passport.authenticate('jwt', {session:false}), controller.searchGroups);

router.post('/getGroupInfo', passport.authenticate('jwt', {session:false}), controller.getGroupInfo);
router.post('/getGroupRecord', passport.authenticate('jwt', {session:false}), controller.getGroupRecord);
router.post('/getGroupImg', passport.authenticate('jwt', {session:false}), controller.getGroupImg);
router.post('/getGroupVideo', passport.authenticate('jwt', {session:false}), controller.getGroupVideo);
router.post('/getGroupPeople', passport.authenticate('jwt', {session:false}), controller.getGroupPeople);
router.post('/getGroupStatus', passport.authenticate('jwt', {session:false}), controller.getGroupStatus);
router.post('/pushPeople', passport.authenticate('jwt', {session:false}), controller.pushPeople);
router.post('/deletePeople', passport.authenticate('jwt', {session:false}), controller.deletePeople);
router.post('/editGroupInfo', passport.authenticate('jwt', {session:false}), controller.editGroupInfo);
router.post('/editGroupAvatar', passport.authenticate('jwt', {session:false}), controller.editGroupAvatar);
router.post('/createRecord', passport.authenticate('jwt', {session:false}), controller.createRecord);
router.post('/createGroup', passport.authenticate('jwt', {session:false}), controller.createGroup);
router.post('/deleteGroup', passport.authenticate('jwt', {session:false}), controller.deleteGroup);

module.exports = router;