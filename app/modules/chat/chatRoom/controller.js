define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue() {
            let that = this;
            let config = {
                el: '.chatRoom',
                data: {
                    chattings: [],
                    current: {},
                    records: {
                        you: "",
                        notYou: "",
                        records: [],
                    },
                    you: {

                    },
                    openVioce: true,
                    msgView: true,
                    msgVoiceSource: ['/musics/msg.mp3', '/musics/shake.mp3'],
                    faces: [],
                },
                methods: {
                    selectChatting: that._selectChatting.bind(that),
                    removeChatting: that._removeChatting.bind(that),
                    sendTo: that._sendTo.bind(that),
                    toggleFaceChoose: that._toggleFaceChoose.bind(that),
                    chooseOneFace: that._chooseOneFace.bind(that),
                    shakeOnce: that._shakeOnce.bind(that),
                    enterOneChatting: that._enterOneChatting.bind(that),
                    leaveOneChatting: that._leaveOneChatting.bind(that),
                    leaveFaceChoose: that._leaveFaceChoose.bind(that),
                    toggleUploadStore: that._toggleUploadStore.bind(that),
                },
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            this._initFaces();
        }

        _handleEvents() {
            $('#upload').dropzone({
                url: '/uploadImg'
            });
            Dropzone.options.upload = {
                paramName: 'file',
                maxFilesize: 2,
                accept: function(file, done) {
                    debugger;
                }
            }

            this._refreshYourInfor();
            this._refreshCurrentInfor();

            setInterval(() => {
                this._refreshYourInfor();
                this._refreshCurrentInfor();
            }, 30000);

            $.subscribe('switchVoice', () => {
                if (this.vue.openVioce) {
                    this.vue.openVioce = false;
                } else {
                    this.vue.openVioce = true;
                }
            });

            $.subscribe('switchMsgView', () => {
                if (this.vue.msgView) {
                    this.vue.msgView = false;
                } else {
                    this.vue.msgView = true;
                }
            });

            $.subscribe('addChatting', (o, args) => {
                this._addChatting(args);
            });

            $('#ChatRoom .glyphicon-remove').on('click', (e) => {
                this.vue.chattings = [];
            });

            $(document).on('keyup', (e) => {
                if (e.keyCode === 13 && this.vue.current.status !== '/images/offline.jpg' && this.vue.current.status !== '') {
                    this._sendTo();
                }
            });

            AP.socket.on(localStorage.name, (msg) => {
                this._receivedMsg(msg);
            });

            // Dropzone


            var dropzone = new Dropzone('#upload', {
                previewTemplate: document.querySelector('#preview-template').innerHTML,
                parallelUploads: 2,
                thumbnailHeight: 120,
                thumbnailWidth: 120,
                maxFilesize: 3,
                filesizeBase: 1000,
                thumbnail: function(file, dataUrl) {
                    if (file.previewElement) {
                        file.previewElement.classList.remove("dz-file-preview");
                        var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                        for (var i = 0; i < images.length; i++) {
                            var thumbnailElement = images[i];
                            thumbnailElement.alt = file.name;
                            thumbnailElement.src = dataUrl;
                        }
                        setTimeout(function() {
                            file.previewElement.classList.add("dz-image-preview");
                        }, 1);
                    }
                }

            });


            // Now fake the file upload, since GitHub does not handle file uploads
            // and returns a 404

            var minSteps = 6,
                maxSteps = 60,
                timeBetweenSteps = 100,
                bytesPerStep = 100000;

            dropzone.uploadFiles = function(files) {
                var self = this;

                for (var i = 0; i < files.length; i++) {

                    var file = files[i];
                    totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

                    for (var step = 0; step < totalSteps; step++) {
                        var duration = timeBetweenSteps * (step + 1);
                        setTimeout(function(file, totalSteps, step) {
                            return function() {
                                file.upload = {
                                    progress: 100 * (step + 1) / totalSteps,
                                    total: file.size,
                                    bytesSent: (step + 1) * file.size / totalSteps
                                };

                                self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                                if (file.upload.progress == 100) {
                                    file.status = Dropzone.SUCCESS;
                                    self.emit("success", file, 'success', null);
                                    self.emit("complete", file);
                                    self.processQueue();
                                }
                            };
                        }(file, totalSteps, step), duration);
                    }
                }
            }
        }



        _toggleUploadStore() {
            $('.uploadStore').toggle();
        }

        _leaveFaceChoose(e) {
            $(e.target).hide();
        }

        _leaveOneChatting(e) {
            $(e.target).find('.removeChatting').hide();
        }

        _enterOneChatting(e) {
            $(e.target).find('.removeChatting').show();
        }

        _shakeOnce() {
            if (this.vue.current.status === '/images/offline.jpg' || this.vue.current.status === '') {
                return;
            }
            $('.editContent').html('抖了你一下');
            this._sendTo();
        }

        _chooseOneFace(e) {
            let url = $(e.target).attr('src');
            $('.editContent').html($('.editContent').html() + `<img src='${ url }'>`);
            $('.faceChoose').hide();
        }

        _initFaces() {
            let url = AP.Constant.BASE_SERVER;
            for (let i = 1; i < 133; i++) {
                this.vue.faces.push(`${ url }/images/qqFace/${ i }.gif`);
            }
        }

        _toggleFaceChoose() {
            $('.faceChoose').toggle();
        }

        _playVoice(msg) {
            let audio = document.querySelector('.msgVoice');
            if (msg.content === '抖了你一下') {
                audio.setAttribute("src", this.vue.msgVoiceSource[1]);
            } else {
                audio.setAttribute("src", this.vue.msgVoiceSource[0]);
            }
            audio.play();
        }

        _shake() {
            let {
                top,
                left
            } = $('#ChatRoom').css(['top', 'left']);
            let count = 0;
            let shakeThread = setInterval(function() {
                if (count % 2 === 0) {
                    $('#ChatRoom').css({
                        top: parseInt(top.split('px')[0]) - 5,
                        left: parseInt(left.split('px')[0]) - 5
                    });
                } else {
                    $('#ChatRoom').css({
                        top: top,
                        left: left
                    });
                }
                count++;
                if (count >= 150) {
                    clearInterval(shakeThread);
                }
            }, 10);
        }


        /**
         * 1:如果是窗口没打开，说明没有一个正在聊天的。那么，显示窗口，并添加这个人，保存聊天记录，并且当前变成他。
         * 2：如果窗口打开的，而正在聊天中，没这个人，并且这个人不是自己。那么，添加这个人。当前人变成他。保存聊天记录。
         * 3：如果窗口打开的，并且这个人在聊天中，那么只保存聊天记录。
         * 4: 如果窗口打开的，这个人在聊天中，还是当前人，那么保存聊天记录。更新窗口信息。
         */
        _receivedMsg(msg) {
            let windowShowing = $('#ChatRoom').css('display') === 'block';
            let itsMe = msg.from === this.vue.you.name;
            let chattingUsers = [];
            for (let one of this.vue.chattings) {
                chattingUsers.push(one.name);
            }
            let inChattings = chattingUsers.indexOf(msg.from) !== -1;
            let isCurrent = msg.from === this.vue.current.name;

            if (!itsMe) {
                if (!windowShowing) {
                    this._openChatRoom();
                    this._addChatting({
                        name: msg.from
                    });
                    this._updateContent(msg);
                } else if (windowShowing && !inChattings) {
                    this._addChatting({
                        name: msg.from
                    });
                    this._updateContent(msg);

                } else if (windowShowing && inChattings && !isCurrent) {
                    this._selectChatting('event', msg.from);
                    this._updateContent(msg);
                } else if (windowShowing && inChattings && isCurrent) {
                    this._updateContent(msg);
                }

                if (this.vue.msgView) {
                    let url = AP.Constant.QUERY_BY_NAME + '?name=' + msg.from;
                    let callback = (result) => {
                        new AP.Message('message', {
                            fromUser: msg.from,
                            content: msg.content,
                            face: result.result.face
                        });
                    };
                    AP.Ajax.get(url, callback)
                }
                if (this.vue.openVioce) {
                    this._playVoice(msg);
                }
                if (msg.content === '抖了你一下') {
                    this._shake();
                }
            } else {
                this._updateContent(msg);
            }
        }

        _updateContent(msg) {
            setTimeout(() => {
                let record = {
                    name: msg.from,
                    time: new Date().toISOString().split('.')[0].replace(/T/g, ' '),
                    content: msg.content,
                };
                this.vue.records.records.push(record);
                this._saveRecords(this.vue.records);
                setTimeout(function() {
                    $('.chatContent').scrollTop($('.chatContent')[0].scrollHeight);
                }, 100);
            }, 500);
        }

        _queryOtherInfor(name) {
            let url = AP.Constant.QUERY_BY_NAME + '?name=' + name;
            let callback = (result) => {
                $.publish('other-infor-loaded', result);
            };
            AP.Ajax.get(url, callback)
        }

        _refreshChatContent(msg) {
            let record = {
                name: msg.from,
                time: new Date().toISOString().split('.')[0].replace(/T/g, ' '),
                face: msg.from === this.vue.you.name ? this.vue.you.face : this.vue.current.face,
                content: msg.content,
            };
            let newRecords = this.vue.records.records.push(record);
            this.vue.records = {
                you: this.vue.you.name,
                notYou: msg.from === this.vue.you.name ? msg.to : msg.from,
                records: newRecords
            };
        }

        _saveRecords(records) {
            let url = AP.Constant.SAVERECORDS;
            let postData = {
                records: records,
            };
            let callback = (result) => {

            };
            AP.Ajax.post(url, postData, callback);
        }

        _refreshCurrentInfor() {
            if (!this.vue.current.name) {
                return;
            }
            let name = this.vue.current.name;
            let url = AP.Constant.GET_INFOR + '?name=' + name;
            let callback = (result) => {
                this.vue.current = result.result.infor;
                this.vue.current.current = true;
            };
            AP.Ajax.get(url, callback);
        }

        _refreshYourInfor() {
            let name = localStorage.name;
            let url = AP.Constant.GET_INFOR + '?name=' + name;
            let callback = (result) => {
                this.vue.you = result.result.infor;
            };
            AP.Ajax.get(url, callback);
        }

        _sendTo() {
            let content = $('.editContent').html().replace(/<div><br><\/div>/g, '').replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/&nbsp;/g, ' ').replace(/<br>/g, '').trim();
            if (content !== '') {
                AP.socket.emit('forward', this.vue.you.name, this.vue.current.name, content);
                $('.editContent').html('');
            }
        }

        _getRecordsFromDB(other) {
            let url = AP.Constant.GETRECORDS;
            let postData = {
                you: this.vue.records.you,
                notYou: other || this.vue.records.notYou,
            };
            let callback = (result) => {
                if (result.result) {
                    this.vue.records.records = result.result.records;
                } else {
                    this.vue.records.records = [];
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _removeChatting(e) {
            let tempChattings = [];
            let name = $(e.target).parent().find('.chattingName').text() || this.vue.current.name;

            if (this.vue.chattings[0].name === name && name === this.vue.current.name && this.vue.chattings.length !== 1) {
                this._selectChatting('event', this.vue.chattings[1].name);
            } else if (name === this.vue.current.name) {
                this._selectChatting('event', this.vue.chattings[0].name);
            } else if ($(e.target).parent().find('.chattingName').text() === '') {
                let current = this.vue.chattings[this.vue.chattings.length - 1].name;
                this._selectChatting('event', current);
            }

            for (let one of this.vue.chattings) {
                if (one.name !== name) {
                    tempChattings.push(one);
                }
            }
            this.vue.chattings = tempChattings;

            if (this.vue.chattings.length === 0) {
                this._hideChatRoom();
            }
        }

        _selectChatting(e, current) {
            let name = '';
            if (current !== undefined) {
                name = current;
            } else {
                name = $(e.target).find('.chattingName').text() || $(e.target).parent().find('.chattingName').text();
            }

            for (let one of this.vue.chattings) {
                if (one.name === name) {
                    one.current = true;
                    this.vue.current = one;
                    this.vue.records.you = this.vue.you.name;
                    this.vue.records.notYou = this.vue.current.name;
                } else {
                    one.current = false;
                }
            }

            setTimeout(() => {
                $('.chatContent').scrollTop($('.chatContent')[0].scrollHeight);
            }, 100);

            this._refreshCurrentInfor();
            this._getRecordsFromDB();
        }

        _hideChatRoom() {
            $('#ChatRoom').animate({
                left: 　450,
                top: 200,
                width: 0,
                height: 0,
            }, 500);
            setTimeout(function() {
                $('#ChatRoom').hide();
            }, 500);
        }

        _openChatRoom() {
            $('#ChatRoom').css({
                left: 350,
                top: 20,
                width: 550,
                height: 550,
            });
            $('#ChatRoom').show();
        }

        _addChatting(args) {
            this._openChatRoom();
            let url = AP.Constant.QUERY_BY_NAME + '?name=' + args.name;
            let callback = (result) => {
                let chatting = result.result;
                let allUsers = [];
                for (let one of this.vue.chattings) {
                    if (one.name === chatting.name) {
                        one.current = true;
                    } else {
                        one.current = false;
                    }
                    allUsers.push(one.name);
                }
                chatting.current = true;
                this.vue.current = chatting;
                this.vue.records.you = this.vue.you.name;
                this.vue.records.notYou = this.vue.current.name;
                if (allUsers.indexOf(chatting.name) === -1) {
                    this.vue.chattings.push(chatting);
                }

                setTimeout(() => {
                    $('.chatContent').scrollTop($('.chatContent')[0].scrollHeight);
                }, 100);

                this._refreshCurrentInfor();
                this._getRecordsFromDB();
            };
            AP.Ajax.get(url, callback);
        }
    }

    return controller;
});