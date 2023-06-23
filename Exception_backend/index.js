const app = require('./app');
const port = process.env.port || 5000;
const server = require('https').Server(app);
const mysql = require("mysql2/promise");
const config = require("./config/db_config");
const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})


const decodingJWT = (token) => {
    console.log(token)
    if (token != null && token != undefined) {
        const base64String = token.split('.')[1];
        const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
        console.log(decodedValue);
        return decodedValue;
    }
    return null;
}

// io.use((socket, next) => {
//     if (socket.handshake.query.Authorization) {
//         const decodedJWT = decodingJWT(socket.handshake.query.Authorization);
//         if (decodedJWT.exp<(new Date()).getTime()/1000) next();
//     }
//     next(socket.emit('refresh'))

// })


io.on('connection', (socket) => {



    // console.log(socket.handshake.query.Authorization)
    let decodedJWT = '';
    console.log(decodedJWT);
    // console.log('user connected')


    socket.on('connectQ', (data) => {
        // console.log(socket.handshake.query.Authorization)
        decodedJWT = decodingJWT(data.token)
        console.log(12)
        console.log('Комната: ' + data.id)
        socket.join(data.id);
    })

    socket.on('pushMes', async (msg) => {
        const connection = await mysql.createConnection(config);
        let img_src_new = '';
        if (msg.img_src == null) img_src_new = null;
        else {
            let temp = msg.img_src.split('\\');
            for (let i = 0; i < temp.length - 1; i++) {
                img_src_new += temp[i] + '/';
            }
            img_src_new += temp[temp.length - 1];
        }

        let video_src_new = '';
        if (msg.video_src == null) video_src_new = null;
        else {
            let temp = msg.video_src.split('\\');
            for (let i = 0; i < temp.length - 1; i++) {
                video_src_new += temp[i] + '/';
            }
            video_src_new += temp[temp.length - 1];
        }
        let [rows, fields] = await connection.execute("select `id_message_list` from  `message_people` where `id_message_list`=" + msg.id_message_list + " and `id_user` =" + decodedJWT.id_user);
        if (rows.length > 0) {
            [rows, fields] = await connection.execute("INSERT INTO `message`( `id_message_list`, `id_user`, `text_message`, `img`, `video`, `date_time`) VALUES (" + msg.id_message_list + "," + decodedJWT.id_user + ",'" + msg.text + "'," + img_src_new + "," + video_src_new + ",NOW())");
            [rows, fields] = await connection.execute("select `id_message`, `message`.`id_user`, `text_message`, `img`, `video`, `users`.`nick_name`, `user_info`.`user_logo_src`, DATE_FORMAT(`date_time`, '%H:%i - %d.%m.%Y') as 'date' from `message` INNER JOIN `users` on `users`.`id_user`=`message`.`id_user` INNER JOIN `user_info` ON `user_info`.`id_user` = `users`.`id_user` where id_message = LAST_INSERT_ID()")
            connection.destroy();
            console.log(msg)
            io.to(msg.id_message_list).emit('getMes', (rows[0]));
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

});
server.listen(port, () => {
    console.log('Yra ' + port);
})


