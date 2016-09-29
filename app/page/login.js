
define([], function () {
    'use strict';
    const config = {
        title: '登录',
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
                    y: 10,
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
                    x: AP.width * 0.35,
                    y: 10,
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