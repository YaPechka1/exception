const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('./../controllers/message');

router.get('/getMessageList', passport.authenticate('jwt', {session:false}), controller.getMessageList);
router.post('/getMessageDialog', passport.authenticate('jwt', {session:false}), controller.getMessageDialog);
router.post('/getMessagePeople', passport.authenticate('jwt', {session:false}), controller.getMessagePeople);
router.post('/getMessageAdmin', passport.authenticate('jwt', {session:false}), controller.getMessageAdmin);
router.post('/getFriendNotFoundMessage', passport.authenticate('jwt', {session:false}), controller.getFriendNotFoundMessage);
router.post('/pushPeopleMessage', passport.authenticate('jwt', {session:false}), controller.pushPeopleMessage);
router.post('/deletePeopleMessage', passport.authenticate('jwt', {session:false}), controller.deletePeopleMessage);
router.post('/updateNameMessage', passport.authenticate('jwt', {session:false}), controller.updateNameMessage);
router.post('/pushMessageDialog', passport.authenticate('jwt', {session:false}), controller.pushMessageDialog);
router.post('/deleteMessageDialog', passport.authenticate('jwt', {session:false}), controller.deleteMessageDialog);


module.exports = router;