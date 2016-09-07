define([

], function() {
    'use strict';
    const config = {
        title: 'AP Demo',
        dialogs: [
            {
                id: 'Demo',
                type: 'dialog',
                settings: {
                    width: AP.width * 0.3,
                    height: AP.width * 0.3,
                    x: AP.width * 0.3,
                    y: AP.height * 0.3,
                },
            }, 
            {
                id: 'Demo2',
                type: 'dialog',
                settings: {
                    width: AP.width * 0.3,
                    height: AP.width * 0.3,
                    x: AP.width * 0.3,
                    y: AP.height * 0.3,
                },
            }, 
        ]
    };

    return config;
});