'use strict';

require.config({
    waitSeconds: 0,  
    paths: {
        //core
        Main: 'core/Main',
        Constant: 'core/Constant',
        Controller: 'core/Controller',
        Draggable: 'core/Draggable',
        MessageBus: 'core/MessageBus',
        Model: 'core/Model',
        Page: 'core/Page',
        preLoad: 'core/preLoad',
        QueryString: 'core/QueryString',
        Test: 'core/Test',
        WebSocket: 'core/WebSocket',
        Ajax: 'core/Ajax',
        Tipy: 'core/Tipy',
        
        //libs
        jquery: 'libs/jquery',
        io: 'libs//socket.io',
        bootstrap: 'libs/bootstrap/js/bootstrap.min',
    }
});