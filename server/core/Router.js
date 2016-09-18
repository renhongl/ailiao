'use strict';

const User = require('./User');

class Router{
    constructor(app){
        this.app = app;
        this._run();
        new User(app);
    }

    _run(){
        let app = this.app;
        app.get('/test', function(req, res){
            res.send("Current path: /test");
        });
    }
}

module.exports = Router;