const mysql = require('mysql2/promise');
const config = require('./../config/db_config');

module.exports.getUserInfo = async function (req, res) {

    let connection = await mysql.createConnection(config);
    // console.log("SELECT `nick_name`, `user_info`.`about_me`, `user_info`.`phone`, `user_info`.`mail`, `user_info`.`user_logo_src` FROM `user_info` INNER JOIN `users` ON `users`.`id_user` = `user_info`.`id_user` where `user_info`.`id_user`="+req.user.id_user+"'"+'\n')
    const [rows, fields] = await connection.execute("SELECT `nick_name`, `user_info`.`about_me`, `user_info`.`phone`, `user_info`.`mail`, `user_info`.`user_logo_src` FROM `user_info` INNER JOIN `users` ON `users`.`id_user` = `user_info`.`id_user` where `user_info`.`id_user`='" + req.user.id_user + "'");
    connection.destroy();
    // console.log(rows[0]);
    res.json({
        user_data: rows[0],
    })
}

module.exports.getUserRecord = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `id_user_record`, DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record', `text`, `img_src`, `like_count`, `dislike_count`, `nick_name`, `user_logo_src`, `video_src` FROM `user_record` INNER JOIN `users` on `users`.`id_user` = `user_record`.`id_user` INNER JOIN `user_info` on `user_info`.`id_user` = `users`.`id_user` WHERE `users`.`id_user`='" + req.user.id_user + "' ORDER BY `user_record`.`date_record` DESC");
    connection.destroy();
    res.json({
        user_record: rows
    })
}
module.exports.getUserPhotoAndVideo = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `user_record`.`img_src` FROM `user_record` WHERE `user_record`.`img_src` is NOT null and `user_record`.`id_user`='" + req.user.id_user + "'");
    const [rows1, fields1] = await connection.execute("SELECT `user_record`.`video_src` FROM `user_record` WHERE `user_record`.`video_src` is NOT null and `user_record`.`id_user`='" + req.user.id_user + "'");
    connection.destroy();
    res.json({
        user_photo_and_video: {
            img_src: rows,
            video_src: rows1
        }
    })
}
module.exports.getUserFriend = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT DISTINCT `users`.`id_user`,`users`.`nick_name`, `user_info`.`user_logo_src` from `user_friend`INNER JOIN `users` on `users`.`id_user`=`user_friend`.`id_who` INNER JOIN `user_info` on `users`.`id_user` = `user_info`.`id_user`  where `id_whom`='" + req.user.id_user + "' and `status`='1' UNION ALL SELECT DISTINCT `users`.`id_user`, `users`.`nick_name`, `user_info`.`user_logo_src` from`user_friend` INNER JOIN`users` on`users`.`id_user` = `user_friend`.`id_whom` INNER JOIN`user_info` on`users`.`id_user` = `user_info`.`id_user`  where`id_who` = '" + req.user.id_user + "' and `status`='1'");
    connection.destroy();
    console.log(rows);
    res.json({
        user_friend: rows
    })

}

module.exports.getUserGroup = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`group_logo_url` from `group_people` INNER JOIN `group` on `group`.`id_group` = `group_people`.`id_group` WHERE `group_people`.`id_people`='" + req.user.id_user + "'");
    connection.destroy();
    console.log(rows);
    res.json({
        user_group: rows
    })
}

module.exports.editUserInfo = async function (req, res) {
    const connection = await mysql.createConnection(config);

    const [rows, fields] = await connection.execute("UPDATE `user_info` SET `about_me`='" + req.body.about + "',`phone`='" + req.body.phone + "',`mail`='" + req.body.mail + "' WHERE `id_user`='" + req.user.id_user + "'; ");
    const [rows1, fields1] = await connection.execute("UPDATE `users` SET `nick_name`='" + req.body.nick_name + "' WHERE `id_user`='" + req.user.id_user + "'");
    connection.destroy();

    res.json({
        status: 'OK'
    })
}
module.exports.editUserAvatar = async function (req, res) {
    const connection = await mysql.createConnection(config);

    const [rows, fields] = await connection.execute("UPDATE `user_info` SET `user_logo_src` = '" + req.body.edit_user_avatar + "' WHERE `user_info`.`id_user` = '" + req.user.id_user + "';");
    connection.destroy();
    res.json({
        status: 'OK'
    })
}
module.exports.getUserInfoPeople = async function (req, res) {

    let connection = await mysql.createConnection(config);
    // console.log("SELECT `nick_name`, `user_info`.`about_me`, `user_info`.`phone`, `user_info`.`mail`, `user_info`.`user_logo_src` FROM `user_info` INNER JOIN `users` ON `users`.`id_user` = `user_info`.`id_user` where `user_info`.`id_user`="+req.user.id_user+"'"+'\n')
    const [rows, fields] = await connection.execute("SELECT `nick_name`, `user_info`.`about_me`, `user_info`.`phone`, `user_info`.`mail`, `user_info`.`user_logo_src` FROM `user_info` INNER JOIN `users` ON `users`.`id_user` = `user_info`.`id_user` where `user_info`.`id_user`='" + req.body.id_user + "'");
    connection.destroy();
    // console.log(rows[0]);
    res.json({
        user_data: rows[0],
    })
}
module.exports.getUserRecordPeople = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `id_user_record`, DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record', `text`, `img_src`, `like_count`, `dislike_count`, `nick_name`, `user_logo_src`, `video_src` FROM `user_record` INNER JOIN `users` on `users`.`id_user` = `user_record`.`id_user` INNER JOIN `user_info` on `user_info`.`id_user` = `users`.`id_user` WHERE `users`.`id_user`='" + req.body.id_user + "' ORDER BY `user_record`.`date_record` DESC");
    connection.destroy();
    res.json({
        user_record: rows
    })
}
module.exports.getUserPhotoAndVideoPeople = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `user_record`.`img_src` FROM `user_record` WHERE `user_record`.`img_src` is NOT null and `user_record`.`id_user`='" + req.body.id_user + "'");
    const [rows1, fields1] = await connection.execute("SELECT `user_record`.`video_src` FROM `user_record` WHERE `user_record`.`video_src` is NOT null and `user_record`.`id_user`='" + req.body.id_user + "'");
    connection.destroy();
    res.json({
        user_photo_and_video: {
            img_src: rows,
            video_src: rows1
        }
    })
}
module.exports.getUserFriendPeople = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT DISTINCT `users`.`id_user`,`users`.`nick_name`, `user_info`.`user_logo_src` from `user_friend`INNER JOIN `users` on `users`.`id_user`=`user_friend`.`id_who` INNER JOIN `user_info` on `users`.`id_user` = `user_info`.`id_user`  where `id_whom`='" + req.body.id_user + "' and `status`='1' UNION ALL SELECT DISTINCT `users`.`id_user`, `users`.`nick_name`, `user_info`.`user_logo_src` from`user_friend` INNER JOIN`users` on`users`.`id_user` = `user_friend`.`id_whom` INNER JOIN`user_info` on`users`.`id_user` = `user_info`.`id_user`  where`id_who` = '" + req.body.id_user + "' and `status`='1'");
    connection.destroy();
    // console.log(rows);
    res.json({
        user_friend: rows
    })

}

module.exports.getUserGroupPeople = async function (req, res) {
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`group_logo_url` from `group_people` INNER JOIN `group` on `group`.`id_group` = `group_people`.`id_group` WHERE `group_people`.`id_people`='" + req.body.id_user + "'");
    connection.destroy();
    console.log(rows);
    res.json({
        user_group: rows
    })
}
module.exports.getFriendStatus = async function (req, res) {
    const connection = await mysql.createConnection(config);
    console.log(req.body.id_user)
    let [rows, fields] = await connection.execute("SELECT id_who as 'id_user' FROM `user_friend` WHERE id_whom=" + req.user.id_user + " and status=1 and id_who=" + req.body.id_user
        + " UNION"
        + " SELECT id_whom as 'id_user' FROM `user_friend` WHERE id_who=" + req.user.id_user + " and status=1 and id_whom=" + req.body.id_user);

    if (rows.length > 0) {
        connection.destroy();
        res.json({
            status: 2
        })
    }
    else {
        [rows, fields] = await connection.execute("SELECT id_who as 'id_user' FROM `user_friend` WHERE id_whom=" + req.user.id_user + " and status=0 and id_who=" + req.body.id_user
            + " UNION"
            + " SELECT id_whom as 'id_user' FROM `user_friend` WHERE id_who=" + req.user.id_user + " and status=0 and id_whom=" + req.body.id_user);
        connection.destroy();
        if (rows.length > 0) {
            res.json({
                status: 1
            })
        }
        else{
            res.json({
                status:0
            })
        }
    }
}
