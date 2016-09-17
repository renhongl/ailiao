/**
 * 用于核心类的测试
 */
define([
    
], function() {
    'use strict';
    class Test {
        constructor() {
            console.log('Running Test');
            setTimeout(function(){
                new AP.Message().warning('API错误', '登录密码错误！');
                setTimeout(function(){
                    new AP.Message().success('登录成功', '马上跳转到应用主页。');
                    new AP.Message().infor('登录成功', '马上跳转到应用主页。');
                    new AP.Message().error('登录成功', '马上跳转到应用主页。');
                },1000);
            }, 3000);
            
        }
    }

    return Test;
});