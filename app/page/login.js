
define([], function () {
    'use strict';
    const config = {
        title: '登录',
        dialogs: [
            {   
                name: 'login',
                id: 'login',
                type: 'dialog',
                show: true,
                showTitle: false,
                settings: {
                    width: 430,
                    height: 430,
                    x: AP.width * 0.5 - 215,
                    y: 100,
                },
                content: {
                    name:'login',
                    id: 'login',
                    type: 'module',
                }
            },
            {   
                name: 'register',
                id: 'register',
                type: 'dialog',
                show: false,
                showTitle: true,
                settings: {
                    width: 430,
                    height: 430,
                    x: AP.width * 0.5 -215,
                    y: 100,
                },
                content: {
                    name:'register',
                    id: 'register',
                    type: 'module',
                }
            },
        ]
    };

    return config;
});
