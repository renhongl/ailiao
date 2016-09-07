define([
    
], function() {
    'use strict';
    class Draggable {
        constructor($container) {
            this.$container = $container;
            this._handleEvents();
        }

        _handleEvents() {
            let $container = this.$container;
            $container.on('mousedown', (e) => {
                this._handleMousedown(e);
            });

            $container.on('mousemove', (e) => {
                this._handleMousemove(e);
            });

            $container.on('mouseup', (e) => {
                this._handleMouseup(e);
            });
        }

        _handleMousedown(e) {
            let left = parseInt($(e.currentTarget).css('left').split('px')[0]);
            let top = parseInt($(e.currentTarget).css('top').split('px')[0]);
            this.offsetX = left - e.clientX;
            this.offsetY = top - e.clientY;
            this.mouseDown = true;
        }

        _handleMousemove(e) {
            if (this.mouseDown) {
                let x = e.clientX;
                let y = e.clientY;
                let left = parseInt($(e.currentTarget).css('left').split('px')[0]);
                let top = parseInt($(e.currentTarget).css('top').split('px')[0]);
                let positionX = x + this.offsetX;
                let positionY = y + this.offsetY;
                $(e.currentTarget).css('left', positionX + 'px').css('top', positionY + 'px');
            }
        }

        _handleMouseup(e) {
            this.mouseDown = false;
        }
    }

    return Draggable;
});