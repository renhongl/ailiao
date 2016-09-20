/**
 * 
 */
define([], function() {
    'use strict';
    class Rain {
        constructor() {
            this.settings = {
                width: AP.PC ? '10px' : '50px',
                height: AP.PC ? '10px' : '50px',
                borderColor: '#c6cac9',
                opacity: 0.7,
                borderRadius: AP.PC ? '5px' : '25px',
                borderWidth: AP.PC ? '5px' : '25px',
                maxWidth: AP.PC ? 100 : 150,
                widthOffset: 2,
                radiusOffset: AP.PC ? 1 : 2,
                opacityOffset: AP.PC ? 0.02 : 0.01,
                borderOffset: 1,
            };
            this._handleEvents();
        }

        _handleEvents() {
            $(document).on('click', (e) => {
                let $rain = $('<div>').attr('class', 'rain').css({
                    position: 'fixed',
                    zIndex: 100,
                    borderStyle: 'solid',
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
            return Number(str.split('px')[0]);
        }

    }

    return Rain;
});