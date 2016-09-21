/**
 * 统一的mongdb连接。
 * 1：创建时传入需要连接的数据库，以及回调函数。
 */

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