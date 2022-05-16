/*
* Copyright 2021 ALE International
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this 
* software and associated documentation files (the "Software"), to deal in the Software 
* without restriction, including without limitation the rights to use, copy, modify, merge, 
* publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
* to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or 
* substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const LogLevels = {
    'DEBUG': 'DEBUG',
    'INFO': 'INFO',
    'WARN': 'WARN',
    'ERROR': 'ERROR',
    'NONE': 'NONE',
};

// Global log level
let GlobalLogLevel = LogLevels.DEBUG;

// ANSI colors
let Colors = {
    'Black': 0,
    'Red': 1,
    'Green': 2,
    'Yellow': 3,
    'Blue': 4,
    'Magenta': 5,
    'Cyan': 6,
    'Grey': 7,
    'White': 9,
    'Default': 9,
};

const loglevelColors = [Colors.Cyan, Colors.Green, Colors.Yellow, Colors.Red, Colors.Default];

const defaultOptions = {
    useColors: true,
    color: Colors.Default,
    showTimestamp: true,
    useLocalTime: false,
    showLevel: true,
};

class Logger {
    constructor(category, options) {
        this.category = category;
        let opts = {};
        Object.assign(opts, defaultOptions);
        Object.assign(opts, options);
        this.options = opts;
        this.debug = this.debug.bind(this);
        this.log = this.log.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
    }

    debug(format, ...args) {
        if (this._shouldLog(LogLevels.DEBUG))
            this._write(LogLevels.DEBUG, this._formatText(format, Array.from(args)));
    }

    log(format, ...args) {
        if (this._shouldLog(LogLevels.DEBUG))
            this.debug.apply(this, this._formatText(format, Array.from(args)));
    }

    info(format, ...args) {
        if (this._shouldLog(LogLevels.INFO))
            this._write(LogLevels.INFO, this._formatText(format, Array.from(args)));
    }

    warn(format, ...args) {
        if (this._shouldLog(LogLevels.WARN))
            this._write(LogLevels.WARN, this._formatText(format, Array.from(args)));
    }

    error(format, ...args) {
        if (this._shouldLog(LogLevels.ERROR))
            this._write(LogLevels.ERROR, this._formatText(format, Array.from(args)));
    }

    _write(level, text) {
        let format = this._format(level, text);
        let formattedText = this._createLogMessage(level, text, format.timestamp, format.level, format.category, format.text);

        if (!this.options.useColors) {
            console.log(formattedText)
        } 
        else {
            // TODO: clean this up
            if (level === LogLevels.ERROR) {
                if (this.options.showTimestamp && this.options.showLevel) {
                    console.error(formattedText, format.timestamp, format.level, format.category, format.text)
                } 
                else if (this.options.showTimestamp && !this.options.showLevel) {
                    console.error(formattedText, format.timestamp, format.category, format.text)
                } 
                else if (!this.options.showTimestamp && this.options.showLevel) {
                    console.error(formattedText, format.level, format.category, format.text)
                } 
                else {
                    console.error(formattedText, format.category, format.text)
                }
            }
            else {
                if (this.options.showTimestamp && this.options.showLevel) {
                    console.log(formattedText, format.timestamp, format.level, format.category, format.text)
                } 
                else if (this.options.showTimestamp && !this.options.showLevel) {
                    console.log(formattedText, format.timestamp, format.category, format.text)
                } 
                else if (!this.options.showTimestamp && this.options.showLevel) {
                    console.log(formattedText, format.level, format.category, format.text)
                } 
                else {
                    console.log(formattedText, format.category, format.text)
                }
            }
        }
    }

    _formatText(format, args) {

        var indexVar = 0;
        return format.replace(/\{\w+\}/g, (correspondance, decalage, chaine) => {
            if (indexVar < args.length) {
                return args[indexVar++];
            }
            else {
                return "";
            }
        });
    }


    _format(level, text) {
        let timestampFormat = '';
        let levelFormat = '';
        let categoryFormat = '';
        let textFormat = ': ';

        if (this.options.useColors) {
            const levelColor = Object.keys(LogLevels).map((f) => LogLevels[f]).indexOf(level);
            const categoryColor = this.options.color;

            if (this.options.showTimestamp)
                timestampFormat = 'color:' + Colors.Grey;

            if (this.options.showLevel)
                levelFormat = 'color:' + loglevelColors[levelColor];

            categoryFormat = 'color:' + categoryColor + '; font-weight: bold';
        }

        return {
            timestamp: timestampFormat,
            level: levelFormat,
            category: categoryFormat,
            text: textFormat
        };
    }

    _createLogMessage(level, text, timestampFormat, levelFormat, categoryFormat, textFormat) {
        timestampFormat = timestampFormat || '';
        levelFormat = levelFormat || '';
        categoryFormat = categoryFormat || '';
        textFormat = textFormat || ': ';

        if (this.options.useColors) {
            if (this.options.showTimestamp)
                timestampFormat = '%c';

            if (this.options.showLevel)
                levelFormat = '%c';

            categoryFormat = '%c';
            textFormat = ': %c';
        }

        let result = '';

        if (this.options.showTimestamp && !this.options.useLocalTime)
            result += '' + new Date().toISOString() + ' ';

        if (this.options.showTimestamp && this.options.useLocalTime)
            result += '' + new Date().toLocaleString() + ' ';

        result = timestampFormat + result;

        if (this.options.showLevel)
            result += levelFormat + '[' + level + ']' + (level === LogLevels.INFO || level === LogLevels.WARN ? ' ' : '') + ' ';

        result += categoryFormat + this.category;
        result += textFormat + text;
        return result;
    }

    _shouldLog(level) {
        let envLogLevel = (typeof window !== "undefined" && window.LOG) ? window.LOG.toUpperCase() : null;

        const logLevel = envLogLevel || GlobalLogLevel;
        const levels = Object.keys(LogLevels).map((f) => LogLevels[f]);
        const index = levels.indexOf(level);
        const levelIdx = levels.indexOf(logLevel);
        return index >= levelIdx;
    }
};

/* Public API */
export default {
    Colors: Colors,
    LogLevels: LogLevels,
    setLogLevel: (level) => {
        GlobalLogLevel = level;
    },
    create: (category, options) => {
        const logger = new Logger(category, options);
        return logger;
    }
};