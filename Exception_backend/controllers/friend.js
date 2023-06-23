const mysql = require('mysql2/promise');
const config = require('./../config/db_config');

module.exports.getUsers = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `users`.`id_user`,`nick_name`, `user_info`.`user_logo_src` FROM `users` INNER JOIN `user_info` ON `user_info`.`id_user`=`users`.`id_user` WHERE `users`.`id_user`>"+req.body.last_index+" LIMIT 50");
    connection.destroy();
    // console.log(rows)
    res.json({
        user_list: rows,
    })
}
module.exports.searchUsers = async function(req,res){
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `users`.`id_user`,`nick_name`, `user_info`.`user_logo_src` FROM `users` INNER JOIN `user_info` ON `user_info`.`id_user`=`users`.`id_user` WHERE `users`.`nick_name`>'"+req.body.last_name+"' AND `users`.`nick_name` LIKE '"+req.body.user_name+"%' ORDER BY `users`.`nick_name` LIMIT 50");
    connection.destroy();
    // console.log(rows)
    res.json({
        user_list: rows,
    })
}

module.exports.getFriendApplication = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0");
    connection.destroy();
    res.json({
        user_list: rows,
    })
}
module.exports.getMyApplication = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_whom INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_who="+req.user.id_user+" and status=0");
    connection.destroy();
    res.json({
        user_list: rows,
    })
}
module.exports.deleteFriend = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("DELETE FROM `user_friend` WHERE id_who = '"+req.user.id_user+"' and id_whom='"+req.body.id_user+"' and status=1");
        [rows, fields] = await connection.execute("DELETE FROM `user_friend` WHERE id_whom = '"+req.user.id_user+"' and id_who='"+req.body.id_user+"' and status=1");
    connection.destroy();
    res.json({
        message: 'ok',
    })
}
module.exports.deleteMyApplication = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("DELETE FROM `user_friend` WHERE id_who = '"+req.user.id_user+"' and id_whom='"+req.body.id_user+"' and status=0");
    connection.destroy();
    res.json({
        message: 'ok',
    })
}
module.exports.deleteApplication = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("DELETE FROM `user_friend` WHERE id_whom = '"+req.user.id_user+"' and id_who='"+req.body.id_user+"' and status=0");
    connection.destroy();
    res.json({
        message: 'ok',
    })
}
module.exports.acceptApplication = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("UPDATE `user_friend` SET `status`=1  WHERE id_whom = '"+req.user.id_user+"' and id_who='"+req.body.id_user+"' and status=0");
    connection.destroy();
    res.json({
        message: 'ok',
    })
}
module.exports.pushFriend = async function(req,res){
    const connection = await mysql.createConnection(config);

    // console.log("SELECT users.id_user, users.nick_name, user_info.user_logo_src FROM `user_friend` inner join users on users.id_user = user_friend.id_who INNER JOIN user_info on users.id_user = user_info.id_user WHERE id_whom="+req.user.id_user+" and status=0")
    let [rows, fields] = await connection.execute("INSERT INTO `user_friend`( `id_who`, `id_whom`, `status`) VALUES ("+req.user.id_user+","+req.body.id_user+",0)");
    connection.destroy();
    res.json({
        message: 'ok',
    })
}