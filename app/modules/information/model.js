
define(['Model'], function (Model) {
    'use strict';
    class model extends Model {
        constructor(obj, config) {
            super(obj, config);
        }

        _loadData() {
            let name = localStorage.name;
            let getInfor = AP.Constant.GETINFOR + '?name=' + name;
            let callback = function (result) {
                $.publish('infor-loaded', result);
            };
            AP.Ajax.get(getInfor, callback);
        }

        _refresh() {

        }
    }

    return model;
});