const mysql = require('mysql2/promise');
const config = require('./../config/db_config');

module.exports.getMessageList = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE T as select `message`.`id_message_list`,MAX(date_time) as 'date_and_time' from `message` GROUP BY (`message`.`id_message_list`); ");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T1`; ");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE T1 as select DISTINCT `id_message_list` from `message_people` WHERE `id_user`='" + req.user.id_user + "'; ");
    [rows, fields] = await connection.execute("SELECT T.`id_message_list`,`message_name`, DATE_FORMAT(T.`date_and_time`, '%e.%c.%Y - %H:%i:%S' ) as 'date_and_time', if(`text_message` is NULL, 'Файл', `text_message`) as 'text_message', `user_info`.`user_logo_src` FROM T INNER JOIN T1 on T.id_message_list=T1.`id_message_list`  INNER JOIN `message` ON `message`.`date_time` = T.`date_and_time` INNER JOIN `user_info` on `message`.`id_user`=`user_info`.`id_user` INNER JOIN `message_list` on `message_list`.`id_message_list`=T.`id_message_list`  ORDER BY (`date_and_time`) DESC");
    
    connection.destroy();
    // console.log(rows)

    res.json({
        message_list: rows
    })
}
module.exports.getMessageDialog = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE T as SELECT `id_message`, `message`.`id_user`, `text_message`, `img`, `video`, `users`.`nick_name`, `user_info`.`user_logo_src`, DATE_FORMAT(`date_time`, '%H:%i - %d.%m.%Y') as 'date' FROM `message` INNER JOIN `users` on `users`.`id_user`=`message`.`id_user` INNER JOIN `user_info` ON `user_info`.`id_user` = `users`.`id_user` where id_message_list=(select `message_people`.`id_message_list` FROM `message_people` WHERE `message_people`.`id_message_list`=" + req.body.id_message_list + " and `message_people`.`id_user`=" + req.user.id_user + ") ORDER BY `date_time` DESC;");
    [rows, fields] = await connection.execute("ALTER TABLE `T` ADD `id` INT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);");
    [rows, fields] = await connection.execute("SET @id:=0;");
    [rows, fields] = await connection.execute("SELECT @id := id from T where `id_message`=" + req.body.last_index + ";");
    [rows, fields] = await connection.execute("select * from T where id>@id LIMIT 20;");

    connection.destroy();
    // console.log(rows)

    res.json({
        message_dialog: rows
    })
}
module.exports.getMessagePeople = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `message_people`.`id_user`, `users`.`nick_name`, `user_info`.`user_logo_src` FROM `message_people`INNER JOIN `users` on `users`.`id_user` = `message_people`.`id_user` INNER JOIN `user_info` on `user_info`.`id_user` = `users`.`id_user` WHERE `id_message_list`=" + req.body.id_message_list);

    connection.destroy();
    // console.log(rows)

    res.json({
        message_people: rows
    })
}
module.exports.getMessageAdmin = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `id_user_admin` FROM `message_list` WHERE `id_message_list`=" + req.body.id_message_list);

    connection.destroy();
    // console.log(rows[0].id_user_admin)
    try{
        res.json({
            status:rows[0].id_user_admin!=undefined && rows[0].id_user_admin == req.user.id_user
        })
    }
    catch{
        res.json({
            status:false
        })
    }
}
module.exports.getFriendNotFoundMessage = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let [rows, fields] = await connection.execute("create TEMPORARY TABLE T as SELECT DISTINCT `users`.`id_user`,`users`.`nick_name`, `user_info`.`user_logo_src` from `user_friend`INNER JOIN `users` on `users`.`id_user`=`user_friend`.`id_who` INNER JOIN `user_info` on `users`.`id_user` = `user_info`.`id_user` where `id_whom`='" + req.user.id_user + "' and `status`='1' UNION ALL SELECT DISTINCT `users`.`id_user`, `users`.`nick_name`, `user_info`.`user_logo_src` from`user_friend` INNER JOIN`users` on`users`.`id_user` = `user_friend`.`id_whom` INNER JOIN`user_info` on`users`.`id_user` = `user_info`.`id_user` where`id_who` = '" + req.user.id_user + "' and `status`=1");
    [rows, fields] = await connection.execute("select * from T where T.id_user not in(select DISTINCT id_user from message_people where id_message_list=" + req.body.id_message_list + ")");
    connection.destroy()
    res.json({
        message_people: rows
    })
}
module.exports.pushPeopleMessage = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let [rows, fields] = await connection.execute("SELECT `id_message_list` FROM `message_list` WHERE `id_message_list`=" + req.body.id_message_list + " and `id_user_admin`=" + req.user.id_user + ";");
    if (rows.length > 0) {
        [rows, fields] = await connection.execute("INSERT INTO `message_people`( `id_message_list`, `id_user`) VALUES (" + req.body.id_message_list + "," + req.body.id_user + ")");
        connection.destroy()
        res.json({
            status: true
        })
    }
    else {
        connection.destroy()
        res.json({
            status: false
        })
    }
}
module.exports.deletePeopleMessage = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let [rows, fields] = await connection.execute("SELECT `id_message_list` FROM `message_list` WHERE `id_message_list`=" + req.body.id_message_list + " and `id_user_admin`=" + req.user.id_user + ";");
    if (rows.length > 0) {
        [rows, fields] = await connection.execute("DELETE FROM `message_people` WHERE id_user=" + req.body.id_user + " and id_message_list=" + req.body.id_message_list);
        connection.destroy()
        res.json({
            status: true
        })
    }
    else {
        connection.destroy()
        res.json({
            status: false
        })
    }
}
module.exports.updateNameMessage = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let [rows, fields] = await connection.execute("UPDATE `message_list` set `message_name` = '"+req.body.message_name+"' where id_message_list="+req.body.id_message_list+" and id_user_admin="+req.user.id_user);
    connection.destroy()

    res.json({
        message:'ok'
    })

}
module.exports.pushMessageDialog = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let [rows, fields] = await connection.execute("INSERT INTO `message_list`(`message_name`, `id_user_admin`) VALUES ('"+req.body.message_name+"',"+req.user.id_user+")");
    
    [rows, fields] = await connection.execute("SELECT LAST_INSERT_ID() as 'id'");
    let id =rows[0].id;

    [rows, fields] = await connection.execute("INSERT INTO `message_people`( `id_message_list`, `id_user`) VALUES ("+id+","+req.user.id_user+")");
    [rows, fields] = await connection.execute("INSERT INTO `message`( `id_message_list`, `id_user`, `text_message`, `date_time`) VALUES ("+id+","+req.user.id_user+",'Беседа создана',NOW())");
    connection.destroy()

    res.json({
        message:'ok'
    })

}
module.exports.deleteMessageDialog = async function (req, res) {
    const connection = await mysql.createConnection(config);
    console.log("DELETE FROM `message_list` WHERE `message_list`.`id_message_list` = "+req.body.id_message_list+" and id_user_admin="+req.user.id_user)
    let [rows, fields] = await connection.execute("DELETE FROM `message_list` WHERE `message_list`.`id_message_list` = "+req.body.id_message_list+" and id_user_admin="+req.user.id_user);
    
    connection.destroy()

    res.json({
        message:'ok'
    })

}