/**
 * 鼠标点击网页的雨滴效果。
 * 1：创建时设置所有雨滴的基本属性。
 * 2：监听鼠标点击事件，点击后将创建一个新的雨滴，初始化，并且一直更新状态，知道消失。
 */
define([], function() {
    'use strict';
    class Rain {
        constructor() {
            this.settings = {
                width: 10,
                height: 10,
                borderColor: '#c6cac9',
                opacity: 0.7,
                borderRadius: 5,
                borderWidth: 5,
                maxWidth: 70,
                widthOffset: 2,
                radiusOffset: 1,
                opacityOffset: 0.05,
                borderOffset: 1,
                position: 'fixed',
                zIndex: 100,
                borderStyle: 'solid',
                class: 'rain',
            };
            this._handleEvents();
        }

        _handleEvents() {
            let settings = this.settings;
            $(document).on('click', (e) => {
                let $rain = $('<div>').attr('class', settings.class).css({
                    position: settings.position,
                    zIndex: settings.zIndex,
                    borderStyle: settings.borderStyle,
                });
                $('body').append($rain);
                let x = e.clientX;
                let y = e.clientY;
                this._initRain($rain, x, y);
                this._updateRain($rain, x, y);
            });
        }

        _updateRain($rain, x, y) {
            let settings = this.settings;
            let rainThread = setInterval( () => {
                let {width, height,top, left, opacity, borderWidth, borderRadius} = 
                    $rain.css(['width', 'height','top', 'left', 'opacity', 'borderWidth', 'borderRadius']);
                $rain.css({
                    width: this._parseStr(width) + settings.widthOffset,
                    height: this._parseStr(height) + settings.widthOffset,
                    top: y - this._parseStr(height) / 2,
                    left: x - this._parseStr(width) / 2,
                    opacity: this._parseStr(opacity) - settings.opacityOffset,
                    borderWidth: this._parseStr(borderWidth) + settings.borderOffset,
                    borderRadius: this._parseStr(borderRadius) + settings.radiusOffset,
                });
                if (this._parseStr(width) > settings.maxWidth) {
                    clearInterval(rainThread);
                    $rain.remove();
                }
            }, 10);
        }

        _initRain($rain, x, y) {
            let settings = this.settings;
            $rain.css({
                width: settings.width,
                height: settings.height,
                borderColor: settings.borderColor,
                opacity: settings.opacity,
                borderRadius: settings.borderRadius,
                borderWidth: settings.borderWidth,
                top: y - this._parseStr(settings.height) / 2,
                left: x - this._parseStr(settings.width) / 2,
            });
        }

        _parseStr(str){
            if(typeof str !== 'string'){
                str += ''; 
            }
            return Number(str.split('px')[0]);
        }

    }

    return Rain;
});