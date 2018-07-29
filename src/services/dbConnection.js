import Mongoose from 'mongoose';
import config from '../config/dev';

Mongoose.set('debug', true);

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        const {
            dbHost, dbPort, dbName, user, password
        } = config;

        const connString = `mongodb://${user}:${password}@${dbHost}:${dbPort}/${dbName}`;

        await Mongoose.connect(connString, { useNewUrlParser: true });

        console.log('Successfully connected to DB');
    } catch (err) {
        console.log('Could not connect to MongoDB');
    }
};

export default connectToDb;
