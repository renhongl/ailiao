'use strict';

import Controller from '/core/Controller'
import model from './model'
import Draggable from '/core/Draggable'

export class controller extends Controller{
    constructor(obj, $container){
        super(obj, $container);
    }
    
    _renderTree(){
       new model(this.obj);
       new Draggable($(`#${ this.obj.id }`));
    }

    _handleEvents(){
        $('.dialog').off('click').on('click', (e) => {
            this._handleClick(e);
        });
    }

    _handleClick(e){
        $('.dialog').removeClass('current');
        $(e.currentTarget).addClass('current');
    }

}