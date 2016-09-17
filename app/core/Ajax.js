/**
 * 封装所有jquery ajax请求
 * 属于工具类，放在AP中
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
                success: function(result){
                    new AP.Message().success('GET', '获取JSON成功。');
                    callback(result);
                }
            });
        }

        static getScript(url, callback) {
            $.ajax({
                dataType: 'script',
                url: url,
                success: function(result){
                    new AP.Message().success('GET', '获取Javascript成功。');
                    callback(result);
                }
            });
        }

        static loadHTML($container, url, callback) {
            $container.load(url, callback);
        }

        static get(url, callback){
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(result,status){
                    new AP.Message().success(status, 'GET请求成功。');
                    callback(result);
                },
                error: function(e){
                    new AP.Message().error(e.status, e.responseText);
                }
            })
        }

        static post(url, postData, callback){
            $.ajax({
                url: url,
                method: 'POST',
                data: postData,
                dataType: 'json',
                success: function(result,status){
                    new AP.Message().success(status, 'POST请求成功。');
                    callback(result);
                },
                error: function(e){
                    new AP.Message().error(e.status, e.responseText);
                }
            })
        }
    }

    return Ajax;
});