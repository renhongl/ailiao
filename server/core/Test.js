/**
 * 后台应用测试
 */
'use strict';

const Email = require('./Email');

class Test{
    constructor(){
        console.log('Running Test');
        new Email('1075220132@qq.com','应用平台验证码','你的验证码是10010。','html');
    }
}

module.exports = Test;