
define([], function () {
    'use strict';
    const config = {
        title: 'Vue Demo',
        dialogs: [
            {
                id: 'demoVue',
                type: 'dialog',
                showTitle: true,
                settings: {
                    width: AP.width * 0.25,
                    height: AP.height * 0.45,
                    x: AP.width * 0.24,
                    y: AP.height * 0 + 20,
                },
                content: {
                    id: 'demoVue',
                    type: 'module',
                    showTitle: true,
                }
            },
        ]
    };

    return config;
});