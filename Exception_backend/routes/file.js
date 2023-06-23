const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload =require('./../config/upload')

const controller = require('./../controllers/file');


router.post('/uploadData',passport.authenticate('jwt', {session:false}),upload.single('media'), controller.uploadData);
router.post('/feedback', controller.feedback);


module.exports = router;