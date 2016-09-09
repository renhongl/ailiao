/**
 * 封装所有jquery ajax请求
 * 属于工具类，放在AP对象中
 * 1：统一的载入数据动画
 * 2：统一的错误提示类型
 * 
 */
define([], function() {
    'use strict';
    class Ajax {

        static getJSON(url, callback) {
            $.ajax({
                dataType: 'json',
                url: url,
                success: callback
            });
        }

        static getScript(url, callback) {
            $.ajax({
                dataType: 'script',
                url: url,
                success: callback
            });
        }

        static loadHTML($container, url, callback) {
            $container.load(url, callback);
        }
    }

    return Ajax;
});