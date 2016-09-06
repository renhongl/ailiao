'use strict';

export default class QueryString{
    static getValue(name){
        let search = window.location.search.substring(1).split('&');//"?page=dashboard&name=1&age=2"
        let tempGroup = [];

        for(let p of search){
            tempGroup.push(p.split('='));
        }
        let params = new Map(tempGroup);
        return params.get(name);
    }
}
