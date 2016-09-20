/**
 * 拖动功能的实现。
 * 构造时，接收一个用于拖动的元素，那么这个元素的直接子元素都可以拖动。
 * 为什么不直接让这个元素可拖动：content覆盖了整个dialog，还没找到原因。
 * 如果这个拖动的对象有button这样的class，将不被拖动。
 * 属于工具类，放在AP中。
 */
define([], function () {
    'use strict';
    class Draggable {
        constructor($container) {
            this.$container = $container;
            for (let subContainer of $container.children()) {
                this._handleEvents($(subContainer));
            }
        }

        _handleEvents($subContainer) {
            if (AP.PC) {
                $subContainer.on('mousedown', (e) => {
                    if (!$(e.target).hasClass('button')) {
                        this._handleMousedown(e);
                    }
                });

                $(document).on('mousemove', (e) => {
                    if (!$(e.target).hasClass('button')) {
                        this._handleMousemove(e);
                    }
                });

                $(document).on('mouseup', (e) => {
                    if (!$(e.target).hasClass('button')) {
                        this._handleMouseup(e);
                    }
                });
            } else {
                //TODO 加手机触摸事件。
            }
        }

        _handleMousedown(e) {
            let {left, top} = this.$container.css(['left', 'top']);
            this.offsetX = this._parseStr(left) - e.clientX;
            this.offsetY = this._parseStr(top) - e.clientY;
            this.mouseDown = true;
        }

        _handleMousemove(e) {
            $(e.target).css('cursor', 'default');
            if (this.mouseDown) {
                let x = e.clientX;
                let y = e.clientY;
                let positionX = x + this.offsetX;
                let positionY = y + this.offsetY;
                this.$container.css({
                    left: positionX,
                    top: positionY,
                });
            }
        }

        _handleMouseup(e) {
            $(e.target).css('cursor', 'default');
            this.mouseDown = false;
        }

        _parseStr(str) {
            return Number(str.split('px')[0]);
        }
    }

    return Draggable;
});