const multer = require('multer');
const moment=require('moment');

const storage = multer.diskStorage({
    destination(req,file,cb){
        let path = '';
        console.log(file.mimetype);
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') path='img/';
        if (file.mimetype === 'video/mp4') path='video/'; 
        cb(null, 'upload/'+path);
    },
    filename(req,file,cb){
        const date = moment().format('DDMMYYYY-HHmmsss_SSS')
        cb(null,`${date}-${file.originalname}`)
    }
})

const fileFilter= (req,file,cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const limits={
    fileSize:1024*1024*500
}

module.exports = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:limits
})