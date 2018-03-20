/**
 * Created by w on 2017/12/5.
 */
const express = require('express');
const mongoose = require('mongoose');
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Chat = require('./model').getModule('chat');
const path = require('path');

io.on('connection', (socket) => {
    console.log('user login');
    socket.on('sendMsg', function (data) {
        const {from, to, msg} = data;
        const chatId = [from, to].sort().join('_');

        Chat.create({chatId, from, to, content: msg}, (err, docs) => {
            if (err) {
                console.log('Error : ' + err);
                return ({"code": "0"});
            }
            io.emit('recvMsg', Object.assign({}, docs._doc));
        });
        console.log(data);
        // io.emit('receiveMsg',data);
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/user', user);

app.get('user/info', (req, res, next) => {
    res.send();
});

app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        next();
    }

    console.log(path.resolve('build/index.html'));
    res.sendfile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));

let serverHost = server.listen(8000, () => {
    let host = serverHost.address().host;
    let port = serverHost.address().port;

    console.log('The App running at http://%s:%s', host, port);
});