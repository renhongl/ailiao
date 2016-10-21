
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
                    width: AP.width,
                    height: AP.height,
                    x: 0,
                    y: 0,
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
                showTitle: false,
                settings: {
                    width: 0,
                    height: AP.height,
                    x: 0,
                    y: 0,
                },
                content: {
                    name:'register',
                    id: 'register',
                    type: 'module',
                }
            },
            {   
                name: 'resetPwd',
                id: 'ResetPwd',
                type: 'dialog',
                show: false,
                showTitle: false,
                settings: {
                    width: 0,
                    height: AP.height,
                    x: 0,
                    y: 0,
                },
                content: {
                    name:'resetPwd',
                    id: 'resetPwd',
                    type: 'module',
                }
            },
        ]
    };

    return config;
});
