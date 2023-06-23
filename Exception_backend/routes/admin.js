const express = require('express');
const router = express.Router();
const passport = require('passport');



const controller = require('./../controllers/admin');

router.post('/deleteUser',passport.authenticate('jwt', {session:false}), controller.deleteUser);
router.post('/deleteGroup',passport.authenticate('jwt', {session:false}), controller.deleteGroup);

router.get('/test',passport.authenticate('jwt', {session:false}),(req,res)=>{
    res.json({
        message: 'тестовый тест'
    })
})

module.exports = router;