'use strict';

import Controller from '/core/Controller'
import model from './model'

export class controller extends Controller{
    constructor(obj, $container){
        super(obj, $container);
    }
    
    _renderTree(){
       new model();
    }

    _handleEvents(){
        $('.dialog').off('click').on('click', function(){
            $('.dialog').removeClass('current');
            $(this).addClass('current');
        });
    }
}