
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {
            
        }

        _handleEvents() {
            this._login();
        }

        _login(){
            let login = AP.Constant.LOGIN;
            let postData = {
                userName: 'renhongl',
                password: '123456',
            };
            AP.Ajax.post(login, postData, function(result){
                console.log(result);
            });
        }
    }

    return controller;
});