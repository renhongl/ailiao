
define([], function () {
    'use strict';
    const config = {
        title: 'Vue Demo',
        dialogs: [
            {   
                name:'demoVue',
                id: 'demoVue',
                type: 'dialog',
                showTitle: false,
                settings: {
                    width: AP.width * 0.25,
                    height: AP.height * 0.45,
                    x: AP.width * 0.24,
                    y: AP.height * 0 + 20,
                },
                content: {
                    name:'demoVue',
                    id: 'demoVue',
                    type: 'module',
                    showTitle: false,
                }
            },
        ]
    };

    return config;
});