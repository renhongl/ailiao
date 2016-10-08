'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');

class Chatting {
    constructor(app) {
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'chatting';
        this._getRecord();
    }

    _getRecord() {
        this.app.post('/getRecord', (req, res) => {
            let queryData = {
                you: req.body.you,
                notYou: req.body.notYou,
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

module.exports = Chatting;
