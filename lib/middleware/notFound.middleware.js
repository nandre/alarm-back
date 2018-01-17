'use strict';

const Boom = require('boom');

module.exports = function() {
    return (req, res, next) => {
        return next(Boom.notFound('Path not found'));
    }
};