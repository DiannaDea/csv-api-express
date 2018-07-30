import Mongoose from 'mongoose';
import config from '../config';

Mongoose.set('debug', true);

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        const {
            USER, DB_HOST, DB_NAME, DB_PORT, PASSWORD
        } = config;

        const connString = `mongodb://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

        await Mongoose.connect(connString, { useNewUrlParser: true });

        console.log('Successfully connected to DB');
    } catch (err) {
        console.log('Could not connect to MongoDB');
    }
};

export default connectToDb;
