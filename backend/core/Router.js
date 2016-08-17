'use strict';

class Router{
    constructor(app){
        this.app = app;
        console.log('init router');
    }

    run(){
        let app = this.app;
        app.get('/', function(req, res){
            res.send("Current path: /");
        });

    }
}

module.exports = Router;