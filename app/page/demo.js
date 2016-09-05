'use strict';

export const config = {
    title: 'demo',
    dialogs: [
        {
            id: 'dialog1',
            type: 'dialog',
            settings: {
                width: '100px',
                height: '100px',
                x: '100px',
                y: '100px',
            },
            content: {
                id: 'demo',
                type: 'module',
                settings: {
                    
                },
            },
        },
        {
            id: 'dialog2',
            type: 'dialog',
            settings: {
                width: '100px',
                height: '100px',
                x: '300px',
                y: '300px',
            },
            content: {
                id: 'demo2',
                type: 'module',
                settings: {

                },
            },
        },
    ]
};






