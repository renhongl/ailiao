'use strict';

import Ajax from './Ajax'

export default class Controller{
    constructor(obj, $container){
        this.obj = obj;
        this.$container = $container;
        let $dialog = $('<div>').attr('id', obj.id).attr('class', obj.type);
        $dialog.width(obj.settings.width).height(obj.settings.height);
        $dialog.css('left', obj.settings.x).css('top', obj.settings.y);

        let url = 'modules/dialog/view.html';
        if(obj.type !== 'dialog'){
            url = `modules/${ obj.id }/view.html`
        }
        
        let callback = () => {
            this.$container.append($dialog);
            this._handleEvents();
            if(obj.type === 'dialog'){
                $.publish(`${ obj.id }-loaded`);
            }
        };

        Ajax.loadHTML($dialog, url, callback);
        
        this._renderTree();
    }

    _renderTree(){
        console.log('Controller/renderTree');
    }

    _handleEvents(){
        console.log('Controller/handleEvents');
    }
}