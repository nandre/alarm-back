'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const cfgManager = require('node-config-manager');

cfgManager.init({
    configDir: process.env.NODE_CONFIG_DIR || './config',
    env: process.env.NODE_ENV || 'dev',
    camelCase: true
});

cfgManager
    .addConfig('app')

const cfgApp = cfgManager.method.App();

cfgApp.port = process.env.PORT || cfgApp.port;

const logger = require('./lib/shared/logger.service');
const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const request = require('superagent');
const { spawn } = require('child_process');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var alarmScript;

const headers = {
        'Access-Control-Allow-Origin': '*'
    }

app.get('/alarm/start', (req, res, next) => {

    res.set(headers);

    console.log("cwd" ,process.cwd());

    alarmScript = spawn('python3', ['alarm.py'], [{cwd:'./resources/script/'}]);

    /**
     * USE THIS INSTEAD TO KILL PROCESS
     * const { spawn } = require('child_process');
     const child = spawn('python3', ['script.py']);

     child.on('close', (code, signal) => {
      console.log(
        `child process terminated due to receipt of signal ${signal}`);
    });

     // Send SIGTERM to process
     child.kill('SIGTERM');
     */

    //console.log(alarmScript);

    /*alarmScript.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });*/

    // end the input stream and allow the process to exit
    /*alarmScript.end(function (err) {
        if (err){
            throw err;
        }

        console.log('finished');
    });*/

    return res.status(200).json({message : 'Alarm Started'});

});


app.get('/alarm/stop', (req, res, next) => {

    res.set(headers);

    const {code} = req.query;

    if(code !== cfgApp.alarmcode) {
        console.log('FAILED - Alarm stopped failed, wrong code')

        return res.status(500).json({message: 'Denied. Wrong Alarm Code.'});

    } else {

        alarmScript.on('close', (code, signal) => {
            console.log(
                `child process terminated due to receipt of signal ${signal}`);
        });

        // Send SIGTERM to process
        alarmScript.kill('SIGTERM');


        //alarmScript.send("STOP")

        /*alarmScript.end(function (err) {
            if (err) {
                console.log('FAILED - Alarm stopped failed : ' + err.toString())
            }

            console.log('Alarm stopped')

        });*/

        return res.status(200).json({message: 'Alarm Stopped'});

    }

});


app.use(require('./lib/middleware/notFound.middleware'));
app.use(require('./lib/middleware/errorHandler.middleware'));

app.listen(cfgApp.port, () => {
    logger.info(`Server run on ${cfgApp.port}`);
});

module.exports = app;
