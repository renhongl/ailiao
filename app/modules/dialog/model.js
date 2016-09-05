'use strict';

import Model from '/core/Model'

export default class model extends Model{
    constructor(){
        super();
    }

    _loadData(){
        console.log('dialog');
    }

    _refresh(){
         console.log('dialog');
    }
}