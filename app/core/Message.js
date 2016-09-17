/**
 * 
 */
define([], function() {
    'use strict';
    class Message{
        constructor(){
            this.showTime = 5000;
            this.clearTime = 2000;
            this.clearThread = null;
            this.timeThread = null;
            this.$Message = $('<div>').css({
                color: '#fff',
                borderRadius: 5,
                width: 300,
                display: 'none',
                zIndex: 110,
                margin: 2,
                clear: 'both',
                position: 'absolute',
                right: 2,
                top: 2,
                boxShadow: '4px 4px 4px rgba(0,0,0,0.5)',
            }).addClass('message');

            this.$icon = $('<i>').css({
                display: 'inline-block',
                float: 'left',
                width: '10%',
                textAlign: 'center',
                marginTop: '0%',
                fontSize: '2em',
                margin: 2,
            }).addClass('msgIcon').appendTo(this.$Message);

            this.$title = $('<div>').css({
                    height: '45%',
                    width: '88%',
                    float: 'right',
                    fontSize: '1.5em',
            }).addClass('msgTitle').appendTo(this.$Message);

            this.$time = $('<span>').css({
                position: 'absolute',
                top: 2,
                right: 2,
            }).addClass('msgTime').appendTo(this.$Message);

            this.$content = $('<div>').css({
                float: 'right',
                height: '56%',
                width: '88%',
                paddingBottom: 5,
            }).addClass('msgContent').appendTo(this.$Message);
        }

        _getHeight(){
            let allHeight = 0;
            for(let one of $('body').find('.message')){
                allHeight = allHeight + $(one).height() + 4;
            }
            return allHeight;
        }

        _getInstance({ color, icon, msg, title }){
            let allHeight = this._getHeight();
            this.$Message.appendTo($('body'));
            this.$Message.css({
                background: color,
                top: allHeight,
            });
            this.$icon.attr({
                class: icon,
            });
            this.$content.text(msg);
            this.$title.text(title + ':');
            this.$Message.fadeIn();

            this._clearMsg();
            this._handleEvents();
        }

        _clearMsg(){
            let count = parseInt(this.showTime / 1000);
            this.$time.text(count + '秒后关闭');
            this.timeThread = setInterval(() => {
                count--;
                if(count === 0){
                    clearInterval(this.timeThread);
                }
                this.$time.text(count + '秒后关闭');
            }, 1000);
            this.clearThread = setTimeout(() => {
                this.$Message.fadeOut(this.clearTime, () => {
                    this.$Message.remove();
                });
            }, this.showTime);
        }

        _handleEvents(){
            this.$Message.on('mouseover', () => {
                clearTimeout(this.clearThread);
                clearInterval(this.timeThread);
            });

            this.$Message.on('mouseout', () => {
                this._clearMsg();
            });
        }

        infor(title, msg){
            let options = {
                color: '#4a5ce4',
                icon: 'fa fa-info-circle',
                title,
                msg,
            };
            this._getInstance(options);
        }

        success(title, msg){
            let options = {
                color: '#00af4f',
                icon: 'fa fa-check-circle',
                title,
                msg,
            };
            this._getInstance(options);
        }

        error(title, msg){
            let options = {
                color: '#bf4141',
                icon: 'fa fa-exclamation-circle',
                title,
                msg,
            };
            this._getInstance(options);
        }

        warning(title, msg){
            let options = {
                color: '#d6990b',
                icon: 'fa fa-bell',
                title,
                msg,
            };
            this._getInstance(options);
        }

    }

    return Message;
});