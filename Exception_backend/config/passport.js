const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const secret = require('./json_config');

const mysql = require('mysql2/promise');
const config = require('./db_config');

const optoins = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.jwt
}
module.exports = async (passport) => {
    // console.log(passport);
    passport.use(new jwtStrategy(optoins, async (payload, done) => {
        
        try {
            console.log(optoins.jwtFromRequest);
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.execute('SELECT * FROM `users` where `id_user` = "' + payload.id_user + '"');
            console.log(payload.id_user)
            const user = {
                id_user: rows[0]['id_user'],
                email: rows[0]['mail'],
                id_role: rows[0]['id_role'],
                nick_name: rows[0]['nick_name']
            }
            connection.destroy();
            if (rows.length > 0) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (e) {
            console.log(e);
        }

    }));

}