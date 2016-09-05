'use strict';

import Ajax from './Ajax'

export default class Model{
    constructor(config){
        this.config = config;
        this._loadData();
        this._refresh();
    }

    _loadData(){
        console.log('Model/loadData');
    }

    _refresh(){
        console.log('Model/refresh');
    }
}