/**
 * Save all frontend constants
 */

'use strict';

import $ from 'jquery';

class Constant{
    constructor(){}
}

Constant.WS_SERVER = 'ws://127.0.0.1:9090';
Constant.TEST = true;
Constant.jquery = $;

export default Constant;