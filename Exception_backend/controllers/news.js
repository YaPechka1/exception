const mysql = require('mysql2/promise');
const config = require('./../config/db_config');

module.exports.getUserNews = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("DROP TABLE if EXISTS `T`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE T as SELECT `user_record`.`id_user_record`, `users`.`id_user`,`user_info`.`user_logo_src`,`users`.`nick_name`,`user_record`.`date_record`, `user_record`.`text`,`user_record`.`img_src`,`user_record`.`video_src`,`user_record`.`like_count`,`user_record`.`dislike_count` from `user_record` INNER JOIN `users` on `users`.`id_user`=`user_record`.`id_user` INNER JOIN `user_info` ON `user_info`.`id_user`=`users`.`id_user`;");
    [rows, fields] = await connection.execute("DROP TABLE if EXISTS `T1`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T1` as select `id_who` as 'id_user' from `user_friend` where `id_whom`=" + req.user.id_user + " AND `status`=1"
        + " UNION"
        + " select `id_whom` as 'id_user' from `user_friend` where `id_who`=" + req.user.id_user + " AND `status`=1;");
    [rows, fields] = await connection.execute("INSERT INTO `T1` (`id_user`) VALUES ('" + req.user.id_user + "');");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T2`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T2` as select `T`.`id_user_record` as 'id_record', `T`.`id_user` as 'id',`T`.`user_logo_src` as 'logo_src',`T`.`nick_name` as 'name',`T`.`date_record`, `T`.`text`,`T`.`img_src`,`T`.`video_src`,`T`.`like_count`,`T`.`dislike_count`, 1 as 'type' FROM `T` INNER JOIN `T1` on `T1`.`id_user`=`T`.`id_user`;");

    [rows, fields] = await connection.execute("DROP TABLE If EXISTS `T3`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T3` as SELECT `group_record`.`id_group_record`,`group`.`id_group`,`group`.`group_logo_url`,`group`.`group_name`,`group_record`.`date_record`, `group_record`.`text`,`group_record`.`img_src`,`group_record`.`video_src`,`group_record`.`like_count`,`group_record`.`dislike_count` from `group_record` INNER JOIN `group` on `group`.`id_group`=`group_record`.`id_group`;");
    [rows, fields] = await connection.execute("DROP TABLE If EXISTS `T4`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T4` as select `id_group` FROM `group_people` WHERE `id_people`=" + req.user.id_user + ";");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T5`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T5` as select `T3`.`id_group_record` as 'id_record', `T3`.`id_group` as 'id',`T3`.`group_logo_url` as 'logo_src',`T3`.`group_name` as 'name',`T3`.`date_record`, `T3`.`text`,`T3`.`img_src`,`T3`.`video_src`,`T3`.`like_count`,`T3`.`dislike_count`, 0 as 'type' FROM `T3` INNER JOIN `T4` on `T3`.`id_group`=`T4`.`id_group`;");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T6`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T6` as"
        + " SELECT * from T2"
        + " UNION"
        + " SELECT * FROM `T5`;");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T7`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T7` as select 0 as 'id_record_list', `id_record`, `id`, `logo_src`, `name`, `date_record`, `text`, `img_src`, `video_src`, `like_count`, `dislike_count`, `type`  FROM `T6` ORDER by (`date_record`) DESC;");
    [rows, fields] = await connection.execute("ALTER TABLE `T7` CHANGE `id_record_list` `id_record_list` INT NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id_record_list`);");
    [rows, fields] = await connection.execute("SET @id_record_List_last:=0;");
    if (req.body.last_index != '0') {
        [rows, fields] = await connection.execute("SELECT @id_record_List_last:=id_record_list from T7 where id_record=" + req.body.last_index + " and type=" + req.body.last_type + ";");
    }
    [rows, fields] = await connection.execute("SELECT id_record_list,id_record,id,logo_src,name,DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record',text,img_src,video_src,like_count, dislike_count,type from T7 where `id_record_list`>@id_record_List_last LIMIT 5");
    connection.destroy();
    //console.log(rows)

    res.json({
        record_list: rows
    })
}
module.exports.getUserNewsFriends = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("DROP TABLE if EXISTS `T`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE T as SELECT `user_record`.`id_user_record`, `users`.`id_user`,`user_info`.`user_logo_src`,`users`.`nick_name`,`user_record`.`date_record`, `user_record`.`text`,`user_record`.`img_src`,`user_record`.`video_src`,`user_record`.`like_count`,`user_record`.`dislike_count` from `user_record` INNER JOIN `users` on `users`.`id_user`=`user_record`.`id_user` INNER JOIN `user_info` ON `user_info`.`id_user`=`users`.`id_user`;");
    [rows, fields] = await connection.execute("DROP TABLE if EXISTS `T1`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T1` as select `id_who` as 'id_user' from `user_friend` where `id_whom`=" + req.user.id_user + " AND `status`=1"
        + " UNION"
        + " select `id_whom` as 'id_user' from `user_friend` where `id_who`=" + req.user.id_user + " AND `status`=1;");
    [rows, fields] = await connection.execute("INSERT INTO `T1` (`id_user`) VALUES ('" + req.user.id_user + "');");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T2`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T2` as select `T`.`id_user_record` as 'id_record', `T`.`id_user` as 'id',`T`.`user_logo_src` as 'logo_src',`T`.`nick_name` as 'name',`T`.`date_record`, `T`.`text`,`T`.`img_src`,`T`.`video_src`,`T`.`like_count`,`T`.`dislike_count`, 1 as 'type' FROM `T` INNER JOIN `T1` on `T1`.`id_user`=`T`.`id_user`;");

    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T3`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T3` as select * from T2 ORDER by (`date_record`) DESC;");
    [rows, fields] = await connection.execute("ALTER TABLE `T3` ADD `id_record_list` INT NOT NULL AUTO_INCREMENT AFTER `type`, ADD PRIMARY KEY (`id_record_list`);");
    [rows, fields] = await connection.execute("SET @id_record_List_last:=0;");
    if (req.body.last_index != '0') [rows, fields] = await connection.execute("SELECT @id_record_List_last:=id_record_list from T3 where id_record=" + req.body.last_index);
    [rows, fields] = await connection.execute("select id_record_list,id_record,id,logo_src,name,DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record',text,img_src,video_src,like_count, dislike_count,type from T3 where id_record_list>@id_record_List_last LIMIT 5");
    connection.destroy();
    //console.log(rows)

    res.json({
        record_list: rows
    })
}

module.exports.getUserNewsGroups = async function (req, res) {
    const connection = await mysql.createConnection(config);

    let [rows, fields] = await connection.execute("DROP TABLE If EXISTS `T3`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T3` as SELECT `group_record`.`id_group_record`,`group`.`id_group`,`group`.`group_logo_url`,`group`.`group_name`,`group_record`.`date_record`, `group_record`.`text`,`group_record`.`img_src`,`group_record`.`video_src`,`group_record`.`like_count`,`group_record`.`dislike_count` from `group_record` INNER JOIN `group` on `group`.`id_group`=`group_record`.`id_group`;");
    [rows, fields] = await connection.execute("DROP TABLE If EXISTS `T4`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T4` as select `id_group` FROM `group_people` WHERE `id_people`=" + req.user.id_user + ";");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T5`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T5` as select `T3`.`id_group_record` as 'id_record', `T3`.`id_group` as 'id',`T3`.`group_logo_url` as 'logo_src',`T3`.`group_name` as 'name',`T3`.`date_record`, `T3`.`text`,`T3`.`img_src`,`T3`.`video_src`,`T3`.`like_count`,`T3`.`dislike_count`, 0 as 'type' FROM `T3` INNER JOIN `T4` on `T3`.`id_group`=`T4`.`id_group`;");
    [rows, fields] = await connection.execute("DROP TABLE IF EXISTS `T6`;");
    [rows, fields] = await connection.execute("CREATE TEMPORARY TABLE `T6` as select * from T5 ORDER BY (`date_record`) DESC;");
    [rows, fields] = await connection.execute("ALTER TABLE `T6` ADD `id_record_list` INT NOT NULL AUTO_INCREMENT AFTER `type`, ADD PRIMARY KEY (`id_record_list`);");
    [rows, fields] = await connection.execute("SET @id_record_List_last:=0;");
    if (req.body.last_index != '0') [rows, fields] = await connection.execute("SELECT @id_record_List_last:=id_record_list from T6 where id_record=" + req.body.last_index + ";");
    [rows, fields] = await connection.execute("select id_record_list,id_record,id,logo_src,name,DATE_FORMAT(`date_record`, '%e.%c.%Y' ) as 'date_record',text,img_src,video_src,like_count, dislike_count,type from T6 where id_record_list>@id_record_List_last LIMIT 5");
    connection.destroy();
    //console.log(rows)

    res.json({
        record_list: rows
    })
}

module.exports.createRecord = async function (req, res) {
    const connection = await mysql.createConnection(config);

    //console.log("INSERT INTO `user_record`( `id_user`, `date_record`, `text`, `img_src`, `like_count`, `dislike_count`, `video_src`) VALUES (" + req.user.id_user + ",NOW()," + req.body.text + "," + req.body.img_src + ",0,0," + req.body.video_src + ")")
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
    
    let [rows, fields] = await connection.execute("INSERT INTO `user_record`( `id_user`, `date_record`, `text`, `img_src`, `like_count`, `dislike_count`, `video_src`) VALUES (" + req.user.id_user + ",NOW()," + req.body.text + "," + img_src_new + ",0,0," + video_src_new + ")");
    connection.destroy();
    res.json({
        status: 'OK'
    })
}