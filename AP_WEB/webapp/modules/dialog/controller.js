'use strict';

import Ajax from '/core/Ajax'

export class Controller{
    constructor(dialog){
        this.dialog = dialog;
        this._renderTree();
        this._handleEvent();
    }

    _renderTree(){
        let $dialog = $('<div>').attr('id', this.dialog.id).attr('class', 'dialog');
        let url = 'modules/dialog/view.html';
        let callback = () => {
            $('body').append($dialog);
        };
        Ajax.loadHTML($dialog, url, callback);
    }

    _handleEvent(){

    }
}