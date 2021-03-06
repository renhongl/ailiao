'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');
const fs = require('fs');
const Email = require('../core/Email');

class User {
    constructor(app) {
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'user';
        this.removeTime = 6000 * 30;
        this._login();
        this._regiser();
        this._getInfor();
        this._setInfor();
        this._queryAll();
        this._queryByName();
        this._addToGroup();
        this._removeUser();
        this._getCode();
    }

    _removeCode(email){
        setTimeout(() => {
            let queryData = {
                email: email
            };
            let updateData = {
                code: ''
            };
            let callback = (result) => {
                let collection = db.collection(this.userCollection);
                collection.updateOne(queryData, {$set: updateData}, (err, result) => {
                    assert.equal(null, err);
                    db.close();
                });
            };
            new MongoDB(this.currentDB, callback);
        }, this.removeTime);
    }

    _getCode(){
        this.app.get('/getCode', (req, res) => {
            let email = req.query.email;
            let code = '';
            for(let i = 0; i < 5; i++){
                code += Math.floor(Math.random() * 10);
            }
            let queryData = {
                email: email
            };
            let updateData = {
                code: code
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.updateOne(queryData, {$set: updateData}, (err, result) => {
                    assert.equal(null, err);
                    db.close();
                    if(result.result.n === 1){
                        new Email(email, '重置密码', '你的验证码是：' + code);
                        this._removeCode(email);
                        res.send({status: 'success', text: '验证码已发往你的邮箱，请查收。30分钟内有效。'});
                    }else{
                        res.send({status: 'error', text: '没有此邮箱，或许你需要注册账号。'});
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _removeUser() {
        this.app.delete('/removeUser', (req, res) => {
            let removeUser = req.body.removeUser;
            let queryData = {
                name: req.body.user,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData, {
                    _id: 0,
                    groups: 1
                }).toArray((err, result) => {
                    assert.equal(null, err);
                    let tempGroups = result[0].groups;
                    for (let group of tempGroups) {
                        for (let user of group.users.entries()) {
                            if (user[1].name === removeUser) {
                                group.users.splice(user[0], 1);
                            }
                        }
                    }
                    collection.updateOne(queryData, {
                        $set: {
                            groups: tempGroups
                        }
                    }, function (err, result) {
                        assert.equal(null, err);
                        db.close();
                        if (result.result.ok === 1) {
                            res.send({
                                status: 'success'
                            });
                        } else {
                            res.send({
                                status: 'error',
                                text: '服务器未知错误'
                            });
                        }
                    });
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _addToGroup() {
        this.app.post('/addToGroup', (req, res) => {
            let addUser = req.body.addUser;
            let addGroup = req.body.addGroup;
            let queryData = {
                name: req.body.name,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find({
                    name: addUser
                }, {
                    _id: 0,
                    name: 1,
                    status: 1,
                    face: 1,
                    intro: 1
                }).toArray(function (err, result) {
                    assert.equal(null, err);
                    let addUser = result[0];
                    collection.find(queryData).toArray(function (err, result) {
                        assert.equal(null, err);
                        let tempGroups = [];
                        for (let group of result[0].groups) {
                            if (group.name === addGroup) {
                                group.users.push(addUser);
                                tempGroups.push(group);
                            } else {
                                tempGroups.push(group);
                            }
                        }
                        collection.updateOne(queryData, {
                            $set: {
                                groups: tempGroups
                            }
                        }, function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            if (result.result.ok === 1) {
                                res.send({
                                    status: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'error',
                                    text: '服务器未知错误'
                                });
                            }
                        });
                    });
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _queryByName() {
        this.app.get('/queryByName', (req, res) => {
            let queryData = {
                name: req.query.name,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData, {
                    _id: 0,
                    name: 1,
                    status: 1,
                    face: 1,
                    intro: 1
                }).toArray(function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({
                        status: 'success',
                        result: result[0]
                    });
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _queryAll() {
        this.app.get('/queryAll', (req, res) => {
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find({}, {
                    name: 1,
                    face: 1,
                    status: 1,
                    intro: 1
                }).toArray(function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({
                        status: 'success',
                        result: result
                    });
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _setInfor() {
        this.app.post('/setInfor', (req, res) => {
            let setData = {};
            let name = req.body.name;
            for (let key of Object.keys(req.body)) {
                setData[key] = req.body[key];
            }
            delete setData.name;
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                if (setData.email) {
                    collection.find({
                        name: {
                            $ne: name
                        },
                        email: setData.email
                    }).toArray(function (err, result) {
                        if (result.length !== 0) {
                            res.send({
                                status: 'error',
                                text: '此邮箱已存在，请换一个邮箱，否则将影响邮箱登录以及密码找回功能。如果你是第一次登录，请修改自己的邮箱地址。'
                            });
                        } else {
                            collection.updateOne({
                                name: name
                            }, {
                                $set: setData
                            }, function (err, result) {
                                assert.equal(null, err);
                                db.close();
                                if (result.result.ok === 1) {
                                    res.send({
                                        status: 'success',
                                        result: 'success'
                                    });
                                } else {
                                    res.send({
                                        status: 'error',
                                        text: '服务器端出错。'
                                    });
                                }
                            });
                        }
                    });
                } else {
                    collection.updateOne({
                        name: name
                    }, {
                        $set: setData
                    }, function (err, result) {
                        assert.equal(null, err);
                        db.close();
                        if (result.result.ok === 1) {
                            res.send({
                                status: 'success',
                                result: 'success'
                            });
                        } else {
                            res.send({
                                status: 'error',
                                text: '服务器端出错。'
                            });
                        }
                    });
                }
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _getInfor() {
        this.app.get('/getInfor', (req, res) => {
            let queryByName = {
                name: req.query.name,
            };
            let queryByEmail = {
                email: req.query.name,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find({$or: [queryByName, queryByEmail]}, {pwd: 0}).toArray(function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    if (result.length !== 0) {
                        res.send({
                            status: 'success',
                            result: {
                                infor: result[0]
                            }
                        });
                    } else {
                        res.send({
                            status: 'error',
                            text: '没有此账号'
                        });
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _login() {
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
                collection.find({
                    $or: [queryByName, queryByEmail]
                }).toArray(function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    if (result.length !== 0) {
                        res.send({
                            status: 'success',
                            result: result[0]
                        });
                    } else {
                        res.send({
                            status: 'error',
                            text: '账号或密码错误。'
                        });
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _regiser() {
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
                        res.send({
                            status: 'error',
                            text: '此账号已经有人使用，请换一个。'
                        });
                    } else {
                        collection.insert([insertData], function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            res.send({
                                status: 'success',
                                text: '注册成功。'
                            });
                        });
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

}

module.exports = User;