const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const config = require("./../config/db_config");
const jwt = require("jsonwebtoken");
const secret = require("./../config/json_config");
const saltRounds = 10;
const nodemailer = require('nodemailer');
const config_mail = require('./../config/mail_config');

module.exports.login = async function (req, res) {
  const connection = await mysql.createConnection(config);
  let [rows, fields] = await connection.execute('SELECT * FROM `users` where `login` = "' + req.body.login + '"');
  if (rows.length == 0) {
    connection.destroy();
    res.json({ token: false });
  }
  else {
    bcrypt.compare(req.body.password, rows[0].password, async function (err, result) {
      if (result == true) {
        const token = jwt.sign(
          {
            id_user: rows[0]["id_user"],
            email: rows[0]["mail"],
            id_role: rows[0]["id_role"],
            nick_name: rows[0]["nick_name"],
            type: "access",
          },
          secret.jwt,
          { expiresIn: 60 * 60 }
        );
        const token1 = jwt.sign(
          {
            id_user: rows[0]["id_user"],
            email: rows[0]["mail"],
            id_role: rows[0]["id_role"],
            nick_name: rows[0]["nick_name"],
            type: "refresh",
          },
          secret.jwt,
          { expiresIn: 60 * 60 * 24 * 7 }
        );
        // console.log(token);


        const [rows1, fields1] = await connection.execute("insert into `tokens` (`token`, `id_user`) values  (MD5('" + token1 + "'), '" + rows[0]["id_user"] + "');");

        connection.destroy();
        res.json({
          token: `Bearer ${token}`,
          id_user: rows[0].id_user,
          tokenUpdate: token1,
          id_role: rows[0].id_role
        });
      } else {
        connection.destroy();
        res.json({ token: false });
      }
    }
    );
  }

};
module.exports.loginOnToken = async function (req, res) {

  const connection = await mysql.createConnection(config);
  // console.log('SELECT * FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');
  const [rows, fields] = await connection.execute('SELECT * FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');
  if (rows.length > 0) {
    const [rows2, fields] = await connection.execute('DELETE FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');

    const token = jwt.sign(
      {
        id_user: req.body.id_user,
        type: "access",
      },
      secret.jwt,
      { expiresIn: 60 * 60 }
    );
    const token1 = jwt.sign(
      {
        id_user: req.body.id_user,
        type: "refresh",
      },
      secret.jwt,
      { expiresIn: 60 * 60 * 24 }
    );
    const [rows1, fields1] = await connection.execute("INSERT INTO `tokens`(`id_user`, `token`) VALUES ('" + req.body.id_user + "', MD5('" + token1 + "'))");
    connection.destroy();
    res.json({
      token: `Bearer ${token}`,
      id_user: rows[0].id_user,
      tokenUpdate: token1,
      id_role: rows[0].id_role
    });
  }
  else {
    connection.destroy();
    res.json({
      token: null,
      id_user: null,
      tokenUpdate: null,
    });
  }

}
module.exports.reg = async function (req, res) {

  let connection = await mysql.createConnection(config);
  console.log(1);
  let [rows, fields] = await connection.execute('select * from `users` where `login` = "' + req.body.login + '"');
  connection.destroy();
  if (rows.length > 0) {
    res.json({ status: 'данный логин занят' });
    console.log(2);
  } else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      console.log(3);
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        connection = await mysql.createConnection(config);
        // console.log('INSERT INTO `users` (`id_user`, `login`, `password`, `nick_name`, `mail`, `id_role`) VALUES (NULL, "' + req.body.login + '", "' + hash + '", "' + req.body.nick_name + '", "' + req.body.mail + '", 1);')
        let [rows1, fields1] = await connection.execute('INSERT INTO `users` (`id_user`, `login`, `password`, `nick_name`, `mail`, `id_role`) VALUES (NULL, "' + req.body.login + '", "' + hash + '", "' + req.body.nick_name + '", "' + req.body.mail + '", 1);');
        // console.log("INSERT INTO `user_info`(`id_user_info`, `about_me`, `phone`, `mail`, `id_user`, `user_logo_src`) VALUES (NULL,'','','',LAST_INSERT_ID(),'./../assets/svg/person-fill.svg')")
        let [rows2, fields2] = await connection.execute("INSERT INTO `user_info`(`id_user_info`, `about_me`, `phone`, `mail`, `id_user`, `user_logo_src`) VALUES (NULL,'','','',LAST_INSERT_ID(),'./../assets/svg/person-fill.svg')")
        connection.destroy();
      });
    });
    // console.log("Регистрация завершена успешно");

    res.json({
      status: true,
    });
  }


}
module.exports.changeLogin = async function (req, res) {
  const connection = await mysql.createConnection(config);
  let [rows, fields] = await connection.execute('select * from `users` where `login` = "' + req.body.login + '" and id_user=' + req.user.id_user);
  if (rows.length == 0) {
    connection.destroy();
    res.json({ message: "Неверный логин" });
  }
  else {
    [rows, fields] = await connection.execute('select * from `users` where `login` = "' + req.body.loginNew + '"');
    if (rows.length > 0) {
      connection.destroy();
      res.json({ message: "Логин занят" });
    }
    else {

      [rows, fields] = await connection.execute("UPDATE `users` SET `login`='" + req.body.loginNew + "' WHERE id_user=" + req.user.id_user)
      connection.destroy();
      res.json({ message: "успешно" });
    }
  }
}
module.exports.changePassword = async function (req, res) {
  const connection = await mysql.createConnection(config);
  let [rows, fields] = await connection.execute('select * from `users` where id_user=' + req.user.id_user);
  bcrypt.compare(req.body.password, rows[0].password, async function (err, result) {
    if (result) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        // console.log(12);
        bcrypt.hash(req.body.passwordNew, salt, async function (err, hash) {
          [rows, fields] = await connection.execute("UPDATE `users` SET `password`='" + hash + "' WHERE id_user=" + req.user.id_user)
          connection.destroy();
          res.json({ message: 'Успешно' })
        })
      })
    }
    else {
      connection.destroy();
      res.json({ message: 'Неверный пароль' })
    }
  })
}
module.exports.getRole = function (req, res) {
  res.json({ status: req.user.id_role == '4' })
}
module.exports.deleteUser = async function (req, res) {
  const connection = await mysql.createConnection(config);
  const [rows, fields] = await connection.execute('DELETE from `users` where id_user=' + req.user.id_user);
  connection.destroy();
  res.json({ status: true })
}
module.exports.generateCode = async function (req, res) {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += '' + randomIntFromInterval(0, 9);
  }
  const connection = await mysql.createConnection(config);
  let [rows, fields] = await connection.execute("SELECT `nick_name`, `mail` FROM `users` WHERE login='" + req.body.login + "'")
  if (rows.length>0){
    console.log(rows)
    try {
      let transporter = nodemailer.createTransport(config_mail)
      let text_message = rows[0].nick_name+", ваш код для восстановления - "+code+"\n"+"Никому не сообщайте данный код"
      let info = await transporter.sendMail({
        from: '"Execption" <steel.iron@inbox.ru>', // sender address
        to: rows[0].mail, // list of receivers
        subject: 'Восстановление доступа', // Subject line
        text: text_message, // plain text body
      });
    }
    catch {
      console.log('invalid email')
    }
    [rows, fields] = await connection.execute("UPDATE `users` SET `code` = '"+code+"' WHERE `users`.`login` = '"+req.body.login+"';")
  }
  connection.destroy();
  res.json({
    message: 'ok',
  })
}
module.exports.editPassword = async function(req,res){
  bcrypt.genSalt(saltRounds, function (err, salt) {
    console.log(3);
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const connection = await mysql.createConnection(config);
      // console.log('INSERT INTO `users` (`id_user`, `login`, `password`, `nick_name`, `mail`, `id_role`) VALUES (NULL, "' + req.body.login + '", "' + hash + '", "' + req.body.nick_name + '", "' + req.body.mail + '", 1);')
      let [rows1, fields1] = await connection.execute("UPDATE `users` SET`password`='"+hash+"' WHERE `code`='"+req.body.code+"' AND `login`='"+req.body.login+"'");
      // console.log("INSERT INTO `user_info`(`id_user_info`, `about_me`, `phone`, `mail`, `id_user`, `user_logo_src`) VALUES (NULL,'','','',LAST_INSERT_ID(),'./../assets/svg/person-fill.svg')")
      
      connection.destroy();
    });
  });
  res.json({message:'ok'})
}
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}