const winston = require('winston');
const logger = winston.createLogger({
    // level: 'debug',
    level: 'debug', // you can use silent keyword 'silent' to stop printing of logs
    format: winston.format.json(),
    transports: [
      
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'app.log' })
    ]
  });
  module.exports = logger;