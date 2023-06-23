const nodemailer = require("nodemailer");
const config_mail = require('./../config/mail_config');

module.exports.uploadData = async function (req, res) {
    console.log(req.file);
    res.json({path:'http://localhost:5000/'+req.file.path});
}
module.exports.feedback = async function(req,res){
    try{
        let transporter = nodemailer.createTransport(config_mail)
        let text_message=req.body.mail+"\n"+req.body.url+"\n"+req.body.text
        let info = await transporter.sendMail({
            from: '"Execption" <steel.iron@inbox.ru>', // sender address
            to: 'talyzovivan@gmail.com', // list of receivers
            subject: req.body.theme, // Subject line
            text: text_message, // plain text body
        });
    }
    catch{
        console.log('invalid email')
    }
    res.json({
        message: 'ok',
    })
}