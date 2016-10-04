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
        this._setInfor();
        this._queryAll();
    }

    _queryAll(){
        this.app.get('/queryAll', (req, res) => {
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find({}, {name: 1, face: 1, status: 1, intro: 1}).toArray(function(err, result){
                    assert.equal(null, err);
                    db.close();
                    res.send({status: 'success', result: result});
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _setInfor(){
        this.app.post('/setInfor', (req, res) => {
            let setData = {};
            let name = req.body.name;
            for(let key of Object.keys(req.body)){
                setData[key] = req.body[key];
            }
            delete setData.name;
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.updateOne({name: name}, {$set: setData}, function(err, result){
                    assert.equal(null, err);
                    db.close();
                    if(result.result.ok === 1){
                        res.send({status: 'success', result: 'success'});
                    }else{
                        res.send({status: 'error', text: '服务器端出错。'});
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
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
                        res.send({status:'success', result: {infor: result[0]}});
                    }else{
                        res.send({status:'error', text: '没有此账号'});
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _login(){
        this.app.post('/login', (req, res) => {
            let queryByName = {
                name: req.body.userName,
                pwd: req.body.password,
            };
            let queryByEmail = {
                email: req.body.userName,
                pwd: req.body.password,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find({$or: [queryByName, queryByEmail]}).toArray(function(err, result){
                    assert.equal(null, err);
                    db.close();
                    if(result.length !== 0){
                        res.send({status:'success', result: result[0]});
                    }else{
                        res.send({status:'error', text: '账号或密码错误。'});
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
                        res.send({ status: 'error', text: '此账号已经有人使用，请换一个。' });
                    } else {
                        collection.insert([insertData], function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            res.send({ status: 'success', text: '注册成功。' });
                        });
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

}

module.exports = User;