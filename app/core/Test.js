/**
 * 用于几个技能核心功能的测试
 */
define([
    
], function() {
    'use strict';
    class Test {
        constructor() {
            console.log('Running Test');
            $.subscribe('test', function(data){
                console.log(data);
            });

            $.publish('test', 'hehehhe');
        }
    }

    return Test;
});