const express = require('express');
const router = express.Router();
const passport = require('passport');



const controller = require('./../controllers/auth');

router.post('/login', controller.login);
router.post('/reg', controller.reg);
router.post('/loginOnToken',controller.loginOnToken);
router.post('/changeLogin',passport.authenticate('jwt', {session:false}),controller.changeLogin)
router.post('/changePassword',passport.authenticate('jwt', {session:false}),controller.changePassword)
router.post('/generateCode',controller.generateCode)
router.post('/editPassword',controller.editPassword)

router.get('/getRole',passport.authenticate('jwt', {session:false}),controller.getRole)
router.get('/deleteUser',passport.authenticate('jwt', {session:false}),controller.deleteUser)

module.exports = router;