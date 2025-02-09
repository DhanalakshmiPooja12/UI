"use strict";
const winston = require("winston");
var path = require("path");

const fs = require("fs");
const env = process.env.NODE_ENV || "development";
const logDir = "./log";

const { format } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => new Date().toLocaleTimeString();
const logger = winston.createLogger({
  format: combine(
    label({
      label: "",
    }),
    timestamp(),
    myFormat
  ),
  transports: [
    // colorize the output to the console
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: "debug",
      timestamp: true,
    }),
    new (require("winston-daily-rotate-file"))({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      datePattern: "YYYY-MM-DD",
      prepend: true,
      level: "debug",
    }),
  ],
});

function getLine(offset) {
  var stack = new Error().stack.split("\n"),
    line = stack[(offset || 1) + 1].split(":");
  return parseInt(line[line.length - 2], 10);
}

global.__defineGetter__("__line", function () {
  return getLine(2);
});

logger.debug("Debugging info");

module.exports = logger;
