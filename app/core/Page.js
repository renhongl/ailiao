'use strict';

import QueryString from './QueryString'
import Ajax from './Ajax'
import Constant from './Constant'

export default class Page{
    constructor({ config }){
        this.config = config;
        this._loadTitle();
        this._loadDialogs();
    }

    _loadTitle(){
        $('title').html(this.config.title);
    }

    _loadDialogs(){
        let dialogs = this.config.dialogs;
        let dialogStyle = 'modules/dialog/style.css';
        if(dialogs.length !== 0){
            $('head').append(`<link rel='stylesheet' href=${ dialogStyle } />`);
        }
        for(let dialog of dialogs){
            this._loadDialog(dialog);
        }
    }

    _loadDialog(dialog){
        let dialogPath = 'modules/dialog/';
        let dialogController = dialogPath + 'controller';
        System.import(dialogController).then( ({ controller }) => {
            $.subscribe(`${ dialog.id }-loaded`, () => {
                this._loadModule(dialog.content, $(`#${ dialog.id } .content`));
            });
            new controller(dialog, $('body'));
        });
    }

    _loadModule(module, $container){
        let modulePath = `modules/${ module.id }/`;
        let moduleController = modulePath + 'controller';
        let moduleStyle = `modules/${ module.id }/style.css`;

        $('head').append(`<link rel='stylesheet' href=${ moduleStyle } />`);

        System.import(moduleController).then( ({ controller }) => {
            new controller(module, $container);
        });
    }

}