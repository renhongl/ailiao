'use strict';

import QueryString from './QueryString';
import Ajax from './Ajax';
import Constant from './Constant';

export default class Page{
    constructor(){
        let qs = new QueryString();
        let pageName = qs.getValue('page');
        this.pageName = pageName;
        this.modulePath = Constant.BASE_SERVER + '/modules/' + pageName;
        this.pagePath = Constant.BASE_SERVER + '/page/' + pageName + '.js';
        this._loadPage();
    }

    _loadPage(){
        let callback = function(result){
            debugger;
        }.bind(this);
        Ajax.getScript(this.pagePath, callback);
    }

    _loadJSON(){
        let jsonPath = this.modulePath + '/config.json';
        let callback = function(result){
            this._loadModules(result);
        }.bind(this);

        Ajax.getJSON(jsonPath, callback);
    }

    _loadModules(result){
        let viewPath = this.modulePath + '/' + result.view;
        let controllerPath = this.modulePath + '/' + result.controller;
        
        $('#container').load(viewPath, function(){
            System.import(controllerPath);
        }.bind(this));
    }
}