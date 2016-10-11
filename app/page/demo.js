
define([], function() {
    'use strict';
    const config = {
        title: 'Demo',
        dialogs: [{
            name:'demo',
            id: 'Demo',
            type: 'dialog',
            showTitle: false,
            settings: {
                width: AP.width * 0.25,
                height: AP.height * 0.45,
                x: AP.width * 0.04 + 5,
                y: AP.height * 0 + 20,
            },
            content: {
                name:'demo',
                id: 'demo',
                type: 'module',
            }
        }, 
        {   
            name:'demo',
            id: 'Demo2',
            type: 'dialog',
            showTitle: true,
            settings: {
                width: AP.width * 0.25,
                height: AP.height * 0.45,
                x: AP.width * 0.49 + 10,
                y: AP.height * 0 + 20,
            },
        }, 
        ]
    };

    return config;
});