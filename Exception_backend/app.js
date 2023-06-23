const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const userInfoRoutes = require('./routes/user_info');
const messageRoutes = require('./routes/message');
const friendRoutes = require('./routes/friend')
const groupRoutes = require('./routes/group');
const newsRoutes = require('./routes/news');
const fileRoutes = require('./routes/file');
const adminRoutes = require('./routes/admin')

const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/user_info', userInfoRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/news/', newsRoutes);
app.use('/api/file/', fileRoutes);
app.use('/api/admin/', adminRoutes)
// const mysql = require('mysql2/promise');
// const config = require('./config/db_config');


module.exports = app;
