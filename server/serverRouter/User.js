'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');

class User {
    constructor(app) {
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'user';
        this._login();
        this._regiser();
        this._getInfor();
    }

    _getInfor(){
        this.app.get('/getInfor', (req, res) => {
            let queryData = {
                name: req.query.name,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData).toArray(function(err, result){
                    assert.equal(null, err);
                    db.close();
                    if(result.length !== 0){
                        res.send({'status':'success', result: {infor: result[0]}});
                    }else{
                        res.send({'status':'error', 'text': '没有此账号'});
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _login(){
        this.app.post('/login', (req, res) => {
            let queryData = {
                name: req.body.userName,
                pwd: req.body.password,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData).toArray(function(err, result){
                    assert.equal(null, err);
                    db.close();
                    if(result.length !== 0){
                        res.send({'status':'success', result: {name: queryData.name}});
                    }else{
                        res.send({'status':'error', 'text': '账号或密码错误。'});
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _regiser(){
        this.app.post('/register', (req, res) => {
            let queryData = {
                name: req.body.userName,
            };
            let insertData = {
                name: req.body.userName,
                pwd: req.body.password,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData).toArray(function (err, result) {
                    assert.equal(null, err);
                    if (result.length !== 0) {
                        db.close();
                        res.send({ 'status': 'error', 'text': '此账号已经有人使用，请换一个。' });
                    } else {
                        collection.insert([insertData], function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            res.send({ 'status': 'success', 'text': '注册成功。' });
                        });
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

}

module.exports = User;