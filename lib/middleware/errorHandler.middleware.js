'use strict';

const logger = require('../shared/logger.service.js');

module.exports = function() {
    return function(err, req, res, next) { // jshint ignore:line
        logger.error(err);
        return res.send(err.output.payload).status(err.output.statusCode);
    }
};