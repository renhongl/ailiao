'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');

class Records {
    constructor(app) {
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'records';
        this._saveRecords();
        this._getRecords();
    }

    _saveRecords() {
        this.app.post('/saveRecords', (req, res) => {
            let insertData = req.body.records;
            let queryData = {
                you: req.body.records.you,
                notYou: req.body.records.notYou,
            };
            let callback = (db) => {
                let collection = db.collection(this.userCollection);
                collection.find(queryData).toArray(function (err, result) {
                    if (result.length === 0) {
                        collection.insert([insertData], function (err, result) {
                            assert.equal(null, err);
                            db.close();
                            res.send({ status: 'success' });
                        });
                    } else {
                        let tempRecords = insertData.records;
                        collection.updateOne(queryData, {$set: {records: tempRecords}}, function(err, result){
                            assert.equal(null, err);
                            db.close();
                            res.send({status: 'success'});
                        })
                    }
                });
            };
            new MongoDB(this.currentDB, callback);
        });
    }

    _getRecords() {
        this.app.post('/getRecords', (req, res) => {
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

module.exports = Records;
