'use strict';

const MongoDB = require('../core/MongoDB');
const assert = require('assert');

class Record {
    constructor(app) {
        this.recordsLength = 100;
        this.app = app;
        this.currentDB = 'ap';
        this.userCollection = 'record';
        this._saveRecord();
        this._getRecord();
    }

    _saveRecord() {
        this.app.post('/saveRecord', (req, res) => {
            let recordsLength = this.recordsLength;
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
                        if(tempRecords.length > recordsLength){
                            tempRecords = tempRecords.splice(tempRecords.length - recordsLength, tempRecords.length -1);
                        }
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

module.exports = Record;
