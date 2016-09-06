'use strict';

import Controller from '/core/Controller'
import model from './model'

export class controller extends Controller{
    constructor(obj, $container){
        super(obj, $container);
    }

    _renderTree(){
       new model(this.obj);
    }

    _handleEvents(){
        
    }
}
