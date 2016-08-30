'use strict';

import QueryString from './QueryString'
import Ajax from './Ajax'
import Constant from './Constant'

export default class Page{
    constructor(){
        console.log('init page');
    }

    run(config){
        this.config = config;
        this._loadTitle();
        this._loadDialogs();
    }

    _loadTitle(){
        $('title').html(this.config.title);
    }

    _loadDialogs(){
        let dialogs = this.config.dialogs;
        for(let dialog of dialogs){
            let $dialog = $(`<div id=${dialog.title} class='dialog'></div>`);
            $dialog.attr('id', dialog.title + 'Dialog').width(dialog.width).height(dialog.height);
            $('body').append($dialog);
            this.viewPath = Constant.BASE_SERVER + 'modules/' + dialog.child + '/view.html';
            this.controllerPath = Constant.BASE_SERVER + 'modules/' + dialog.child + '/controller';
            this.modelPath = Constant.BASE_SERVER + 'modules/' + dialog.child + '/model';
            this.stylePath = Constant.BASE_SERVER + 'modules/' + dialog.child + '/style.css';
            this._loadView($dialog, this.viewPath);
        }
    }

    _loadView($dialog, viewPath){
        let callback = (result) => {
            this._loadStyle(this.stylePath);
            this._loadController(this.controllerPath);
            this._loadModel(this.modelPath);
        };
        Ajax.loadHTML($dialog, viewPath, callback);
    }

    _loadController(controllerPath){
        System.import(controllerPath).then(function({Controller}){
            new Controller();
        });
    }

    _loadStyle(stylePath){
        $('head').append(`<link rel='stylesheet' href=${stylePath} />`);
    }

    _loadModel(modelPath){
        System.import(modelPath).then(function({Model}){
            new Model();
        });
    }

}