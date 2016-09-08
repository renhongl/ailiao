/**
 * 
 */
define([], function(require, factory) {
    'use strict';
    class Tipy{
        static tipy($button){
            let msg = $button.attr('tipy');
            let $tip = $(`<div class='tipyFoot'></div><div class='tipy'>${ msg }</div>`);
            
            $button.on('mouseover', (e) => {
                $button.append($tip);
            });

            $button.on('mouseout', (e) => {
                $tip.remove();
            });
        }
    }

    return Tipy;
});