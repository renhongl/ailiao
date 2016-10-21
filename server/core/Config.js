/**
 * 存储后端所有的静态数据。
 */
'use strict';

class Config{}

Config.WS_PORT = 9090;
Config.SERVER_PORT = 8080;
Config.TEST = false;
Config.EMAIL_SERVER = 'liang_renhong@126.com',
Config.EMAIL_PWD = 'lrh1116';

module.exports = Config;