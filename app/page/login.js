
define([], function () {
    'use strict';
    const config = {
        title: 'AP Login',
        dialogs: [
            {
                id: 'login',
                type: 'dialog',
                show: true,
                showTitle: false,
                settings: {
                    width: 430,
                    height: 430,
                    x: AP.width * 0.35,
                    y: AP.height * 0.2,
                },
                content: {
                    id: 'login',
                    type: 'module',
                }
            },
            {
                id: 'register',
                type: 'dialog',
                show: false,
                showTitle: false,
                settings: {
                    width: 430,
                    height: 430,
                    x: AP.width * 0.35 + 435,
                    y: AP.height * 0.2,
                },
                content: {
                    id: 'register',
                    type: 'module',
                }
            },
        ]
    };

    return config;
});