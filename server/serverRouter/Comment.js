'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');

class Comment {
    constructor(app) {
        this.recordsLength = 100;
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'comment';
        this._getComment();
        this._saveComment();
        this._updateComment();
    }

    _updateComment(){
        this.app.post('/updateComment', (req, res) => {
            let queryData = {
                index: req.body.index
            };
            let setData = {
                read: req.body.read,
                like: req.body.like,
                comments: req.body.comments
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.updateOne(queryData,{$set: setData}, function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({ status: 'success'});
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _saveComment() {
        this.app.post('/saveComment', (req, res) => {
            let insertData = {
                index: req.body.index,
                read: req.body.read,
                like: req.body.like,
                comments: req.body.comments,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.insert([insertData], function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({ status: 'success'});
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _getComment() {
        this.app.get('/getComment', (req, res) => {
            let queryData = {
                index: req.query.index,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData).toArray(function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({ status: 'success', result: result[0] });
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

}

module.exports = Comment;
