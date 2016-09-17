'use strict';

class Router{
    constructor(app){
        this.app = app;
        this._run();
    }

    _run(){
        this.app.get('/queryUser', function(req, res){
            res.send({'exist':'true'});
        });

        this.app.post('/login', function(req, res){
            res.send({'login':'success'});
        });
    }
}

module.exports = Router;