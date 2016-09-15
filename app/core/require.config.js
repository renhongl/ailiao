'use strict';

require.config({
    waitSeconds: 60000,  
    paths: {
        //core
        PreLoad: 'core/PreLoad',
        Main: 'core/Main',
        Constant: 'core/Constant',
        Controller: 'core/Controller',
        Draggable: 'core/Draggable',
        MessageBus: 'core/MessageBus',
        Model: 'core/Model',
        Page: 'core/Page',
        QueryString: 'core/QueryString',
        Test: 'core/Test',
        WebSocket: 'core/WebSocket',
        Ajax: 'core/Ajax',
        Tipy: 'core/Tipy',
        Observer: 'core/Observer',
        Rain: 'core/Rain',
        
        //libs
        jquery: 'libs/jquery',
        io: 'libs//socket.io',
        bootstrap: 'libs/bootstrap/js/bootstrap.min',
    }
});