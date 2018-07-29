import path from 'path';

const devConfig = {
    dbHost: 'ds259001.mlab.com',
    dbPort: '59001',
    user: 'admin',
    password: 'admin123',
    dbName: 'csv-users',
    logsDir: path.join(__dirname, '../../logs'),
    errorLogFile: 'errors.log',
    infoLogFile: 'info.log'
};

export default devConfig;
