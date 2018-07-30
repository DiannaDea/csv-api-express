import { createLogger, format, transports } from 'winston';

import devConfig from '../config';

const {
    combine, timestamp, printf
} = format;

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({
            filename: devConfig.ERROR_LOG_FILE,
            dirname: devConfig.LOGS_DIR,
            level: 'error'
        }),
        new transports.File({
            filename: devConfig.INFO_LOG_FILE,
            dirname: devConfig.LOGS_DIR,
            level: 'info'
        })
    ]
});

export default logger;
