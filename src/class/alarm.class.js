'use strict'

const PythonShell = require('python-shell');

class Alarm {
    constructor() {
        this._alarmScript = new PythonShell('./resources/scripts/alarm.py');

    }

    singletonMethod() {
        return 'singletonMethod';
    }

    static staticMethod() {
        return 'staticMethod';
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}

export default new Alarm();
