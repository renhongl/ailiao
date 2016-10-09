/**
 * 服务器的路由。
 * 1：创建是需要传入服务器的app。
 * 2：测试路由是否正常工作。
 * 3：引入其他部分的路由。例如：User。
 */
'use strict';

const User = require('../serverRouter/User');
const Records = require('../serverRouter/Records');

class Router{
    constructor(app){
        this.app = app;
        this._test();
        this._addRouter();
    }

    _test(){
        this.app.get('/test', function(req, res){
            res.send("Server working successfully!");
        });
    }

    _addRouter(){
        new User(this.app);
        new Records(this.app);
    }

}

module.exports = Router;