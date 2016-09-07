define([

], function() {
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