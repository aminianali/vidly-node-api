const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );

    process.on('unhandledRejection', (err) => {
        throw err;
    });

    winston.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'info'
    }));

    winston.add(new winston.transports.File({
        filename: 'logfile.log',
        format: winston.format.simple()
    }));

    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/vidly',
        level: 'error'
    }));
}