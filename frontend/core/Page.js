'use strict';

import QueryString from './QueryString';
import Ajax from './Ajax';
import Constant from './Constant';

export default class Page{
    constructor(pageName){
        this.pageName = pageName;
        this.currentPath = Constant.BASE_SERVER + '/modules/' + pageName;
        this._loadPage();
    }

    _loadPage(){
        let pagePath = this.currentPath + '/' + this.pageName + '.js';
        
    }

    _loadJSON(){
        let jsonPath = this.currentPath + '/config.json';
        let callback = function(result){
            this._loadModules(result);
        }.bind(this);

        Ajax.getJSON(jsonPath, callback);
    }

    _loadModules(result){
        let viewPath = this.currentPath + '/' + result.view;
        let controllerPath = this.currentPath + '/' + result.controller;
        
        $('#container').load(viewPath, function(){
            System.import(controllerPath);
        }.bind(this));
    }
}