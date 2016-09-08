/**
 * 所有模块的model的父类
 * 设置config属性
 * 载入loadData和refresh方法
 */
define([], function() {
    'use strict';
    class Model {
        constructor(config) {
            this.config = config;
            this._loadData();
            this._refresh();
        }

        _loadData() {
            console.log('Model/loadData');
        }

        _refresh() {
            console.log('Model/refresh');
        }
    }

    return Model;
});