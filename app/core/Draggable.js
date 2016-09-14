/**
 * 拖动功能的实现。
 * 构造时，接收一个用于拖动的元素，那么这个元素的直接子元素都可以拖动。
 * 为什么不直接让这个元素可拖动：因为子元素，例如title和content可能覆盖父元素。目前只想到这么做。
 * 如果这个拖动的对象有button这样的class，将不被拖动。
 * 属于工具类，放在AP中。
 */
define([], function() {
    'use strict';
    class Draggable {
        constructor($container){
            this.$container = $container;
            for(let subContainer of $container.children()){
                this._handleEvents($(subContainer));
            }
        }

        _handleEvents($subContainer) {
            $subContainer.on('mousedown', (e) => {
                if ($(e.target).hasClass('button')) {
                    return;
                }
                this._handleMousedown(e);
            });

            $(document).on('mousemove', (e) => {
                if ($(e.target).hasClass('button')) {
                    return;
                }
                this._handleMousemove(e);
            });

            $(document).on('mouseup', (e) => {
                if ($(e.target).hasClass('button')) {
                    return;
                }
                this._handleMouseup(e);
            });
        }

        _handleMousedown(e) {
            let left = parseInt(this.$container.css('left').split('px')[0]);
            let top = parseInt(this.$container.css('top').split('px')[0]);
            this.offsetX = left - e.clientX;
            this.offsetY = top - e.clientY;
            this.mouseDown = true;
        }

        _handleMousemove(e) {
            if (this.mouseDown) {
                $(e.target).css('cursor', 'default');
                let x = e.clientX;
                let y = e.clientY;
                let left = parseInt(this.$container.css('left').split('px')[0]);
                let top = parseInt(this.$container.css('top').split('px')[0]);
                let positionX = x + this.offsetX;
                let positionY = y + this.offsetY;
                this.$container.css('left', positionX + 'px').css('top', positionY + 'px');
            }
        }

        _handleMouseup(e) {
            $(e.target).css('cursor', 'default');
            this.mouseDown = false;
        }
    }

    return Draggable;
});