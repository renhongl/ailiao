
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {
            
        }

        _handleEvents() {
            $.subscribe('infor-loaded', (o, args) => {
                this._fillForm(args.result.infor);
            });
        }

        _fillForm(infor){
            let all = true;
            // for(let key of Object.keys(infor)){
            //     debugger;
            // }
            $('.information #email').val(infor.email);
            $('.information #gender').val(infor.gender);
            $('.information #age').val(infor.age);
            $('.information #birthday').val(infor.birthday);
            $('.information #constellation').val(infor.constellation);
            $('.information #location').val(infor.location);
        }
    }

    return controller;
});