const mysql = require('mysql2/promise');
const config = require('./../config/db_config');

module.exports.getUserGroup = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`theme`, `group`.`group_logo_url` from `group_people` INNER JOIN `group` on `group`.`id_group`=`group_people`.`id_group` WHERE `id_people`="+req.user.id_user);
    connection.destroy();
    //console.log(rows)
    res.json({
        group_list: rows
    })
}
module.exports.getUserGroupAdmin = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`,`roles`.`role_name` , `group`.`group_logo_url` from `group_people` INNER JOIN `group` on `group`.`id_group`=`group_people`.`id_group` INNER JOIN `roles` on `roles`.`id_role`=`group_people`.`id_role` WHERE `id_people`='"+req.user.id_user+"' and `group_people`.`id_role`!=1");
    connection.destroy();
    //console.log()
    res.json({
        group_list_admin: rows
    })
}
module.exports.getGroups = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`theme`, `group`.`group_logo_url` from `group` WHERE `id_group`>"+req.body.last_index+" LIMIT 50" );
    connection.destroy();
    //console.log(rows)
    res.json({
        group_list_all: rows,
    })
}
module.exports.searchGroups = async function(req,res){
    const connection = await mysql.createConnection(config);
    //console.log("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`theme`, `group`.`group_logo_url` from `group` WHERE `group_name`>'"+req.body.last_group_name+"' and `group_name` LIKE '"+req.body.group_name+"%' ORDER BY (`group_name`) LIMIT 50");
    let [rows, fields] = await connection.execute("SELECT `group`.`id_group`, `group`.`group_name`, `group`.`theme`, `group`.`group_logo_url` from `group` WHERE `group_name`>'"+req.body.last_group_name+"' and `group_name` LIKE '"+req.body.group_name+"%' ORDER BY (`group_name`) LIMIT 50");
    connection.destroy();
    //console.log(rows)
    res.json({
        group_list_all: rows,
    })
}

module.exports.getGroupInfo = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("SELECT `id_group`,`group`.`about`, `group_name`, `id_admin`, `group`.`mail`,`user_info`.`user_logo_src`, `theme`, `group_logo_url`, `users`.`nick_name` FROM `group` INNER JOIN `users` on `users`.`id_user`=`group`.`id_admin` INNER JOIN `user_info` on `user_info`.`id_user`=`users`.`id_user` WHERE `id_group`="+req.body.id_group);
    connection.destroy();
    //console.log(rows)
    res.json({
        group_info: rows[0]
    })
}

module.exports.getGroupRecord = async function (req, res) {
    const connection = await mysql.createConnection(config);
    
    let [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T` as SELECT `id_group_record`, DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record', `text`, `img_src`, `like_count`, `dislike_count`, `group_name`, `group_logo_url`, `video_src` FROM `group_record` INNER JOIN `group` on `group`.`id_group` = `group_record`.`id_group`  WHERE `group`.`id_group`='"+req.body.id_group+"' ORDER BY `group_record`.`date_record` DESC;");
    [rows, fields] = await connection.execute("ALTER TABLE `T` ADD `id_record_list` INT NOT NULL AUTO_INCREMENT AFTER `video_src`, ADD PRIMARY KEY (`id_record_list`);");
    [rows, fields] = await connection.execute("SET @id_record_List_last:=0;");
    if (req.body.last_index!=0) [rows, fields] = await connection.execute("SELECT @id_record_List_last:=`id_record_list` from  `T` where `id_group_record`="+req.body.last_index+";");
    [rows, fields] = await connection.execute("SELECT * from T where `id_record_list`>@id_record_List_last LIMIT 5;");
    connection.destroy();
    res.json({
        group_record: rows
    })
}

module.exports.getGroupImg = async function(req,res){
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `id_group_record`,`img_src` FROM `group_record` where `id_group_record`>"+req.body.last_index+" and `id_group`="+req.body.id_group+" and `img_src` is not null LIMIT "+req.body.limit);
    connection.destroy();
    res.json({
        group_img: rows
    })
}
module.exports.getGroupVideo = async function(req,res){
    //console.log("SELECT `id_group_record`,`video_src` FROM `group_record` where `id_group_record`>"+req.body.last_index+" and `id_group`="+req.body.id_group+" and `video_src` is not null LIMIT "+req.body.limit);
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `id_group_record`,`video_src` FROM `group_record` where `id_group_record`>"+req.body.last_index+" and `id_group`="+req.body.id_group+" and `video_src` is not null LIMIT "+req.body.limit);
    connection.destroy();
    res.json({
        group_video: rows
    })
}
module.exports.getGroupPeople =async function(req,res){
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute("SELECT `group_people`.`id_group_people`,`group_people`.`id_people`,`roles`.`role_name`, `users`.`nick_name`, `user_info`.`user_logo_src` FROM `group_people` INNER JOIN `roles` on `roles`.`id_role`=`group_people`.`id_role` INNER JOIN `users` on `users`.`id_user`=`group_people`.`id_people` INNER JOIN `user_info` on `user_info`.`id_user` = `users`.`id_user` where `group_people`.`id_group`="+req.body.id_group+" and `group_people`.`id_group_people`>"+req.body.last_index+" LIMIT 50");
    connection.destroy();
    //console.log(rows);
    res.json({
        group_people: rows
    })
}
module.exports.getGroupStatus =async function(req,res){
    const connection = await mysql.createConnection(config);
    console.log(req.body)
    const [rows, fields] = await connection.execute("SELECT id_role FROM `group_people` WHERE id_group="+req.body.id_group+" and id_people="+req.user.id_user);
    connection.destroy();
    if (rows.length==0){
        res.json({
            status: 0
        })
    }
    else
    res.json({
        status: rows[0].id_role
    })
}
module.exports.pushPeople =async function(req,res){
    const connection = await mysql.createConnection(config);
    console.log(req.body)
    const [rows, fields] = await connection.execute("INSERT INTO `group_people`( `id_group`, `id_people`, `id_role`) VALUES ("+req.body.id_group+","+req.user.id_user+",1)");
    connection.destroy();
    
    
    res.json({
        message:'ok'
    })
}
module.exports.deletePeople =async function(req,res){
    const connection = await mysql.createConnection(config);
    console.log(req.body)
    const [rows, fields] = await connection.execute("delete from `group_people` where id_group ="+req.body.id_group+" and id_people="+req.user.id_user);
    connection.destroy();
    
    
    res.json({
        message:'ok'
    })
}
module.exports.editGroupInfo = async function (req, res) {
    const connection = await mysql.createConnection(config);

    const [rows, fields] = await connection.execute("UPDATE `group` SET `group_name`='"+req.body.group_name+"',`about`='"+req.body.about+"',`mail`='"+req.body.mail+"',`theme`='"+req.body.theme+"' WHERE id_group='"+req.body.id_group+"' and `id_admin`='"+req.user.id_user+"'");
    connection.destroy();

    res.json({
        status: 'OK'
    })
}
module.exports.editGroupAvatar = async function (req, res) {
    const connection = await mysql.createConnection(config);

    const [rows, fields] = await connection.execute("UPDATE `group` SET `group_logo_url`='"+req.body.img_src+"' WHERE id_group='"+req.body.id_group+"' and id_admin='"+req.user.id_user+"'");
    connection.destroy();
    res.json({
        status: 'OK'
    })
}

module.exports.createRecord = async function (req, res) {
    const connection = await mysql.createConnection(config);
    let img_src=req.body.img_src;
    let img_src_new='';
    if (img_src==null) img_src_new=null;
    else{
        let temp =img_src.split('\\');
        for (let i=0;i<temp.length-1;i++){
            img_src_new+=temp[i]+'/';
        }
        img_src_new+=temp[temp.length-1];
    }
    let video_src=req.body.video_src;
    let video_src_new='';
    if (video_src==null) video_src_new=null;
    else{
        let temp =video_src.split('\\');
        for (let i=0;i<temp.length-1;i++){
            video_src_new+=temp[i]+'/';
        }
        video_src_new+=temp[temp.length-1];
    }
    console.log("INSERT INTO `group_record`( `date_record`, `dislike_count`, `like_count`, `img_src`, `video_src`, `text`, `id_group`) VALUES (NOW(),0,0,"+img_src_new+","+video_src_new+",'"+req.body.text+"','"+req.body.id_group+"')")
    const [rows, fields] = await connection.execute("INSERT INTO `group_record`( `date_record`, `dislike_count`, `like_count`, `img_src`, `video_src`, `text`, `id_group`) VALUES (NOW(),0,0,"+img_src_new+","+video_src_new+",'"+req.body.text+"','"+req.body.id_group+"')");
    connection.destroy();
    res.json({
        status: 'OK'
    })
}
module.exports.createGroup = async function(req,res){
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("INSERT INTO `group`(`group_name`, `id_admin`, `about`, `mail`, `theme`) VALUES ('"+req.body.group_name+"',"+req.user.id_user+",'','','"+req.body.theme+"')");
        [rows, fields] = await connection.execute("INSERT INTO `group_people`(`id_group`, `id_people`, `id_role`) VALUES (LAST_INSERT_ID(),"+req.user.id_user+",2)");
    connection.destroy();
    res.json({
        status: 'OK'
    })
}
module.exports.deleteGroup = async function(req,res){
    const connection = await mysql.createConnection(config);

    const [rows, fields] = await connection.execute("DELETE FROM `group` WHERE id_group="+req.body.id_group+" and id_admin="+req.user.id_user);
    connection.destroy();
    res.json({
        status: 'OK'
    })
}