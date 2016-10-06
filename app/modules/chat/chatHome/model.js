define(['Model'], function(Model) {
    'use strict';
    class model extends Model {
        constructor(obj, config) {
            super(obj, config);
        }

        _loadData() {
            let name = localStorage.name;
            let url = AP.Constant.GETINFOR + '?name=' + name;
            let callback = function(result) {
                $.publish('userInfo-loaded', result.result);
            };
            AP.Ajax.get(url, callback);
            
        }

        _refresh() {
            $.subscribe('needRefresh', () => {
                this._loadData();
            });
        }
    }

    return model;
});