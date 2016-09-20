/**
 * 封装所有ajax请求
 * 属于工具类，放在AP中
 * 1：统一的载入数据动画
 * 2：统一的错误提示类型
 * 3：如果完全正确，将会调用回调函数，在具体的请求那里处理结果。
 * 4：如果请求成功，但是后台返回错误，那么格式是{'status': 'error', 'text': 'error reason'}。
 * 5：如果返回成功，格式：{'status': 'success', 'result': {}};
 */
define([], function() {
    'use strict';
    class Ajax {

        static getJSON(url, callback) {
            let options = {
                dataType: 'json',
                url: url,
                success: function(result){
                    callback(result);
                }
            };
            $.ajax(options);
        }

        static getScript(url, callback) {
            let options = {
                dataType: 'script',
                url: url,
                success: function(result){
                    callback(result);
                }
            };
            $.ajax(options);
        }

        static loadHTML($container, url, callback) {
            $container.load(url, callback);
        }

        static get(url, callback){
            let options = {
                url: url,
                headers: {},
                method: 'GET',
                contentType: 'APPLICATION/JSON',
                dataType: 'JSON',
                crossDomain: true,
                beforeSend(){

                },
                success(result,status){
                    if(result.status === 'error'){
                        new AP.Message('error', result.status, result.text);
                        return;
                    }else{
                        callback(result);
                    }
                },
                error(e){
                    new AP.Message('error', e.status, e.text);
                },
                complete(){

                }
            };
            $.ajax(options);
        }

        static post(url, postData, callback){
            let options = {
                url: url,
                headers: {},
                method: 'POST',
                //contentType: 'APPLICATION/JSON',
                data: postData,
                dataType: 'JSON',
                crossDomain: true,
                beforeSend(){

                },
                success: function(result,status){
                    if(result.status === 'error'){
                        new AP.Message('error', result.status, result.text);
                        return;
                    }else{
                        callback(result);
                    }
                },
                error: function(e){
                    new AP.Message('error', e.status, e.text);
                },
                complete(){

                }
            };
            $.ajax(options);
        }

        static put(url, postData, callback){
            let options = {
                url: url,
                headers: {},
                method: 'PUT',
                contentType: 'APPLICATION/JSON',
                data: postData,
                dataType: 'JSON',
                crossDomain: true,
                beforeSend(){

                },
                success: function(result,status){
                    if(result.status === 'error'){
                        new AP.Message('error', result.status, result.text);
                        return;
                    }else{
                        callback(result);
                    }
                },
                error: function(e){
                    new AP.Message('error', e.status, e.responseText);
                },
                complete(){

                }
            };
            $.ajax(options);
        }

        static delete(url, postData, callback){
            let options = {
                url: url,
                headers: {},
                method: 'DELETE',
                contentType: 'APPLICATION/JSON',
                data: postData,
                dataType: 'JSON',
                crossDomain: true,
                beforeSend(){

                },
                success: function(result,status){
                    if(result.status === 'error'){
                        new AP.Message('error', result.status, result.text);
                        return;
                    }else{
                        callback(result);
                    }
                },
                error: function(e){
                    new AP.Message('error', e.status, e.text);
                },
                complete(){

                }
            };
            $.ajax(options);
        }
    }

    return Ajax;
});