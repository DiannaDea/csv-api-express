import path from 'path';

const devConfig = {
    DB_HOST: 'ds259001.mlab.com',
    DB_PORT: '59001',
    USER: 'admin',
    PASSWORD: 'admin123',
    DB_NAME: 'csv-users',
    LOGS_DIR: path.join(__dirname, '../logs'),
    ERROR_LOG_FILE: 'errors.log',
    INFO_LOG_FILE: 'info.log'
};

export default devConfig;
