/**
 * 全局显示消息。
 * 工具类，放在AP中。
 * 1：创建时需要传入两个参数，第一个是消息头，第二个是消息内容。
 * 2：创建之后还要根据需要调用不同的方法。四个外部方法：infor(),success(),error(),warning()。
 * 可以通过单词意思理解。
 */
define([], function() {
    'use strict';
    class Message{
        constructor(type, title, content){
            this.title = title;
            this.content = content;
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

            switch(type){
                case 'infor': 
                    this._infor();
                    break;
                case 'success': 
                    this._success();
                    break;
                case 'error': 
                    this._error();
                    break;
                case 'warning': 
                    this._warning();
                    break;
                default: 
                    break;
            }
        }

        _getHeight(){
            let allHeight = 0;
            for(let one of $('body').find('.message')){
                allHeight = allHeight + $(one).height() + 4;
            }
            return allHeight;
        }

        _getInstance({ color, icon, content, title }){
            let allHeight = this._getHeight();
            this.$Message.appendTo($('body'));
            this.$Message.css({
                background: color,
                top: allHeight,
            });
            this.$icon.attr({
                class: icon,
            });
            this.$content.text(content);
            this.$title.text(title.toUpperCase() + ':');
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

        _infor(){
            let options = {
                color: '#4a5ce4',
                icon: 'fa fa-info-circle',
                title: this.title,
                content: this.content,
            };
            this._getInstance(options);
        }

        _success(){
            let options = {
                color: '#00af4f',
                icon: 'fa fa-check-circle',
                title: this.title,
                content: this.content,
            };
            this._getInstance(options);
        }

        _error(){
            let options = {
                color: '#bf4141',
                icon: 'fa fa-exclamation-circle',
                title: this.title,
                content: this.content,
            };
            this._getInstance(options);
        }

        _warning(){
            let options = {
                color: '#d6990b',
                icon: 'fa fa-bell',
                title: this.title,
                content: this.content,
            };
            this._getInstance(options);
        }
    }

    return Message;
});