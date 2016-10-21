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
        Message: 'core/Message',
        Auth: 'core/Auth',
        
        //libs
        jquery: 'libs/jquery',
        io: 'libs//socket.io',
        bootstrap: 'libs/bootstrap/js/bootstrap.min',
        bootstrapSwitch: 'libs/bootstrap/js/bootstrap-switch.min',
        Vue: 'libs/vue',
	    dropzone: 'libs/dropzone',
        fileupload: 'libs/jqueryFileUpload/jquery.fileupload',
        iframeTransport: 'libs/jqueryFileUpload/jquery.iframe-transport',
        widget: 'libs/jqueryFileUpload/jquery.ui.widget',
    }
});
