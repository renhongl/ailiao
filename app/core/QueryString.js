/**
 * 查询浏览器url中的各个参数值
 * 属于工具类，放在AP中
 * 1：定义完成后，创建一个实例。这时候会将当前地址栏的所有参数存储到params属性中。
 * 需要查询时，只用调用getValue外部方法。
 * 2：如果页面没刷新，地址栏就不会变，不用每次使用的时候都去查询一次。
 */
define([], function() {
    'use strict';
    class QueryString {
        constructor(){
            let search = window.location.search.substring(1).split('&');
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