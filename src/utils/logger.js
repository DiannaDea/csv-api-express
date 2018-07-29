import { createLogger, format, transports } from 'winston';

import devConfig from '../config/dev';

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
            filename: devConfig.errorLogFile,
            dirname: devConfig.logsDir,
            level: 'error'
        }),
        new transports.File({
            filename: devConfig.infoLogFile,
            dirname: devConfig.logsDir,
            level: 'info'
        })
    ]
});

export default logger;
