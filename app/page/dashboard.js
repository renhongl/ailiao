
define([], function () {
    'use strict';
    const config = {
        title: '主页',
        dialogs: [
            {
                id: 'APChat',
                type: 'dialog',
                showTitle: true,
                settings: {
                    width: AP.width * 0.25,
                    height: AP.height * 0.8,
                    x: AP.width * 0 + 20,
                    y: AP.height * 0 + 20,
                },
                content: {
                    id: 'chat/chatHome',
                    type: 'module',
                    showTitle: true,
                }
            },
        ]
    };

    return config;
});