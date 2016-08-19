'use strict';

class Router{
    constructor(app){
        console.log('init router');
        this.app = app;
        this._run();
    }

    _run(){
        let app = this.app;
        app.get('/', function(req, res){
            res.send("Current path: /");
        });

    }
}

module.exports = Router;