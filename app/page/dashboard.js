
define([], function () {
    'use strict';
    const config = {
        title: '主页',
        dialogs: [
            {   
                name: 'ChatHome',
                id: 'ChatHome',
                type: 'dialog',
                showTitle: true,
                settings: {
                    width: 330,
                    height: 650,
                    x: 10,
                    y: 10,
                },
                content: {
                    name: 'chat/chatHome',
                    id: 'chatHome',
                    type: 'module',
                    showTitle: true,
                }
            },
            {   
                name: 'ChatRoom',
                id: 'ChatRoom',
                type: 'dialog',
                show: false,
                showTitle: true,
                settings: {
                    width: 550,
                    height: 550,
                    x: 600,
                    y: 20,
                },
                content: {
                    name: 'chat/chatRoom',
                    id: 'chatRoom',
                    type: 'module',
                    showTitle: true,
                }
            },
            {   
                name: 'Documents',
                id: 'Documents',
                type: 'dialog',
                show: false,
                showTitle: true,
                settings: {
                    width: AP.width * 0.55,
                    height: AP.height,
                    x: AP.width * 0.5 / 2,
                    y: 0,
                },
                content: {
                    name: 'document',
                    id: 'document',
                    type: 'module',
                    showTitle: true,
                }
            },
        ]
    };

    return config;
});