'use strict';

const winston = require('winston');

const logger = new winston.Logger({ // TODO: Get config from file
    level: 'debug',
    transports: [
        new (winston.transports.Console)()
    ]
});

class Logger {
    constructor(logger) {
        this._logger = logger;
    }
    log(...args) {
        this._logger.log.call(this._logger, ...args);
    }
    emerg(...args) {
        this.log('emerg', ...args);
    }
    alert(...args) {
        this.log('alert', ...args);
    }
    crit(...args) {
        this.log('crit', ...args);
    }
    error(...args) {
        this.log('error', ...args);
    }
    warn(...args) {
        this.log('warning', ...args);
    }
    notice(...args) {
        this.log('notice', ...args);
    }
    info(...args) {
        this.log('info', ...args);
    }
    debug(...args) {
        this.log('debug', ...args);
    }
    stream() {
        return {
            write: (message) => {
                this.info(message);
            }
        };
    }
}
module.exports = new Logger(logger);