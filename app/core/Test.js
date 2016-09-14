/**
 * 用于核心类的测试
 */
define([
    
], function() {
    'use strict';
    class Test {
        constructor() {
            console.log('Running Test');
            $.subscribe('test', function(e, args){
                console.log(args);
            });

            //$.unsubscribe('test');

            setTimeout(function() {
                $.publish('test', 'TestData');
            }, 2000);
        }
    }

    return Test;
});