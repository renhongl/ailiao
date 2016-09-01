'use strict';

export class Controller{
    constructor(dialog, $container){
        console.log('dialog controller');
        // this._render(dialog, $container);
        // this._addEvent(dialog, $container);
    }

    _render(dialog, $container){
        debugger;
        $container.attr('id', dialog.id + 'Dialog').width(dialog.settings.width).height(dialog.settings.height);
    }

    _addEvent(dialog, $container){

    }
}