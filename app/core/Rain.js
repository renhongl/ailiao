/**
 * 
 */
define([], function() {
    'use strict';
    class Rain{
        constructor(){
            $(document).on('click', (e) => {
                if($('.rain').length !== 0){
                    $('.rain').remove();
                }
                let $rain = $(`<div class='rain'></div>`);
                $('body').append($rain);
                let x = e.clientX;
                let y = e.clientY;
                let width = $rain.width();
                let height = $rain.height();
                let radius = $rain.css('border-radius').split('px')[0];
                let offset = 1;
                let rainThread = null;
                let max = 50;
                let opacityOffset = 0.04;
                if(!AP.PC){
                    max = 150;
                    opacityOffset = 0.01;
                    offset = 2;
                }
                $rain.css('top', y - height / 2 + 'px').css('left', x - width / 2 + 'px');
                rainThread = setInterval(function(){
                    let width = $rain.width();
                    let height = $rain.height();
                    let opacity = $rain.css('opacity');
                    $rain.width(width + offset);
                    $rain.height(height + offset);
                    $rain.css('top', y - height / 2 + 'px').css('left', x - width / 2 + 'px');
                    $rain.css('border-radius', radius + offset + 'px').css('opacity', opacity - opacityOffset * offset);
                    if(width > max){
                        clearInterval(rainThread);
                        $('.rain').remove();
                    }
                }, 10);
            });
        }
    }

    let rain = new Rain();
    return rain;
});