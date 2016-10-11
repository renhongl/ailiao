/**
 * 
 */
define([], function() {
    'use strict';
    class Auth {
        constructor() {
            this.checkValidThread = null;
            //this._valid();
        }

        _valid(){
            this.checkValidThread = setInterval(function(){
                let name = localStorage.name;
                let pageName = AP.QueryString.getValue('page') || AP.Constant.DEFAULT_PAGE;
                if(!name && pageName !== AP.Constant.DEFAULT_PAGE){
                    clearInterval(this.checkValidThread);
                    location = AP.Constant.BASE_SERVER;
                }
            }, 3000);
        }
    }

    return Auth;
});