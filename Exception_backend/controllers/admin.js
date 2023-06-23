const mysql = require('mysql2/promise');
const config = require('./../config/db_config');
const config_mail = require('./../config/mail_config');
const nodemailer = require("nodemailer");

module.exports.deleteUser = async function (req, res) {

    if (req.user.id_role == 4) {
        const connection = await mysql.createConnection(config);
        let [rows, fields] = await connection.execute("SELECT `mail`, `nick_name` FROM `users`where id_user=" + req.body.id_user);
        let mail = rows[0].mail;
        let text_message = rows[0].nick_name+', вы больше не пользователь Execption. Ваши данные были удалены. Всего доброго!';
        [rows, fields] = await connection.execute('DELETE FROM `users` where id_user=' + req.body.id_user);
        connection.destroy();

        try{
            let transporter = nodemailer.createTransport(config_mail)
            let info = await transporter.sendMail({
                from: '"Execption" <steel.iron@inbox.ru>', // sender address
                // to: mail, // list of receivers
                to: mail, // list of receivers
                subject: "Вы были удалены", // Subject line
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
    else {
        res.json({
            message: 'fail'
        })
    }
}
module.exports.deleteGroup = async function (req, res) {

    if (req.user.id_role == 4) {
        const connection = await mysql.createConnection(config);
        let [rows, fields] = await connection.execute("SELECT users.`mail` FROM `group` INNER JOIN users on users.id_user = `group`.id_admin where id_group = "+req.body.id_group);
        let mail = rows[0].mail;
        [rows, fields] = await connection.execute('DELETE FROM `group` where id_group=' + req.body.id_group);
        connection.destroy();

        let transporter = nodemailer.createTransport(config_mail)
        let info = await transporter.sendMail({
            from: '"Execption" <ITalyzov@yandex.ru>', // sender address
            to: mail, // list of receivers
            subject: "Ваше объединение удалено", // Subject line
            text: "Ваше объединение больше не существует в социальной сети Exception. Ваши данные были удалены. Всего доброго!", // plain text body
        });
        res.json({
            message: 'ok',
        })
    }
    else {
        res.json({
            message: 'fail'
        })
    }
}