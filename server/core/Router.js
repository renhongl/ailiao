'use strict';

const Login = require('./Login');

class Router{
    constructor(app){
        this.app = app;
        this._run();
    }

    _run(){
        let app = this.app;
        new Login(app);
        app.get('/test', function(req, res){
            res.send("Current path: /test");
        });
    }
}

module.exports = Router;