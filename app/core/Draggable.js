/**
 * 构造时，接收一个用于拖动的对象
 * 如果这个拖动的对象有button这样的class，将不会执行拖动
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