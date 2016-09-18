

'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class MongoDB {
    constructor(currentDB, callback) {
        var url = 'mongodb://localhost:27017/' + currentDB;
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            callback(db);
        });
    }

}

module.exports = MongoDB;