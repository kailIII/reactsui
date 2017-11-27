var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var md5 = require('md5');
var store = require('data-store')('database', {cwd: 'data'});

var app = express();
app.use(cors());
app.use(bodyParser.json());

function sk(key) {
    return key ? key.replace(/\./g, '-') : 'xxx';
}

function authByLogin(email, pwd) {
    var email = sk(email);
    if (store.has(email)) {
        var user = store.get(email);
        if (md5(pwd) === user.pwd) {
            user.auth_token = md5(email+':'+pwd);
            store.set(email, user);
            return user;
        }
    }
    return false;
}

function authByToken(token) {
    var users = store.get();
    for (key in store.get()) {
        if (store.get(key).auth_token === token) {
            return store.get(key);
        }
    }
    return false;
}

if (!store.has(sk('admin@isp.com'))) {
    store.set(sk('admin@isp.com'), {
        pwd: md5('admin')
    });
}
if (!store.has(sk('other@isp.com'))) {
    store.set(sk('other@isp.com'), {
        pwd: md5('other')
    });
}
store.save();

app.use(session({
    secret: 'reactsui',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

app.post('/login', function (req, res, next) {
    var user = authByLogin(req.body.email, req.body.pwd);
    return user ? res.send({success: true, auth_token: user.auth_token})
        : res.send({'success': false});
});

app.get('/user', function (req, res) {
    var user = authByToken(req.headers['x-authorization']);
    user ? res.send({success: true, user: user})
        : res.send({success: false})
});

app.get('/', function (req, res) {
    res.send('Server')
});

const port = 8080;
app.listen(port, function () {
    console.log('Listening: '+port);
});
