
define([], function () {
    'use strict';
    const config = {
        title: '主页',
        dialogs: [
            {
                id: 'InformationManagement',
                type: 'dialog',
                showTitle: true,
                settings: {
                    width: AP.width * 0.25,
                    height: AP.height * 0.45,
                    x: AP.width * 0.24,
                    y: AP.height * 0 + 20,
                },
                content: {
                    id: 'Information',
                    type: 'module',
                    showTitle: true,
                }
            },
        ]
    };

    return config;
});