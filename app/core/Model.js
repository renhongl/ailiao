/**
 * 所有模块的model的父类
 * 1：设置config属性
 * 2：载入loadData和refresh方法
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
            
        }

        _refresh() {
            
        }
    }

    return Model;
});