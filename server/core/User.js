'use strict';

const MongoDB = require('./MongoDB');
const assert = require('assert');

class User {
    constructor(app) {
        this.app = app;
        this._login();
        this._regiser();
    }

    _login(){
        this.app.post('/login', (req, res) => {
            let body = req.body;
            let currentDB = 'ap';
            let col = 'user';
            let callback = (db) => {
                let collection = db.collection(col);
                collection.find(body).toArray(function(err, result){
                    assert.equal(null, err);
                    db.close();
                    if(result.length !== 0){
                        res.send({'status':'success', 'text': '登陆成功。'});
                    }else{
                        res.send({'status':'error', 'text': '账号或密码错误。'});
                    }
                });
            };
            new MongoDB(currentDB, callback);
        });
    }

    _regiser(){
        this.app.post('/register', (req, res) => {
            let body = req.body;
            let currentDB = 'ap';
            let col = 'user';
            let callback = (db) => {
                let collection = db.collection(col);
                collection.find({'username': body.username}).toArray(function (err, result) {
                    assert.equal(null, err);
                    if (result.length !== 0) {
                        db.close();
                        res.send({ 'status': 'error', 'text': '此账号已经有人使用，请换一个。' });
                    } else {
                        collection.insert([body], function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            res.send({ 'status': 'success', 'text': '注册成功。' });
                        });
                    }
                });
            };
            new MongoDB(currentDB, callback);
        });
    }

}

module.exports = User;