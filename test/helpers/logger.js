'use strict'

import winston from 'winston';
//import { format  } from 'logform';
import { logger_settings } from '../config/envconfig.js'

const options = {
  file: {
    level: logger_settings.file.loglevel,
    filename: logger_settings.file.filename,
    handleExceptions: true,
    json: logger_settings.file.json,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: logger_settings.file.timestamp,
  },
  console: {
    level: logger_settings.console.loglevel,
    handleExceptions: true,
    json: logger_settings.console.json,
    colorize: true,
    timestamp: logger_settings.console.timestamp,
  },
};
  
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

export default logger;