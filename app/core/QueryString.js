/**
 * 查询浏览器url中的各个参数值
 * 属于工具类，放在AP中
 * 使用时直接使用其静态方法getValue
 */
define([], function() {
    'use strict';
    class QueryString {
        constructor(){
            let search = window.location.search.substring(1).split('&'); //"?page=dashboard&name=1&age=2"
            let tempGroup = [];

            for (let p of search) {
                tempGroup.push(p.split('='));
            }
            this.params = new Map(tempGroup);
        }

        getValue(name){
            return this.params.get(name);
        }
    }

    let queryString = new QueryString();
    return queryString;
});