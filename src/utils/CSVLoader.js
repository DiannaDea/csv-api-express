import fs from 'fs';
import csv from 'fast-csv';
import pick from 'lodash.pick';
import path from 'path';
import UserModel from '../models/User';
import { dbFieldNames, tempCSVFileName } from '../constants';

export default class CSVLoader {
    static uploadFile(file, delimiter) {
        return new Promise((resove, reject) => {
            const cvsStream = csv.fromPath(file, {
                headers: true,
                delimiter
            });

            cvsStream
                .on('data', async (user) => {
                    console.log(`Received data ${JSON.stringify(user)}`);

                    cvsStream.pause();

                    try {
                        await UserModel.create({ ...user });
                    } catch (error) {
                        console.log(error.message);
                    }

                    cvsStream.resume();

                    console.log('============');
                })
                .on('end', () => {
                    console.log('We are done!');
                    resove();
                })
                .on('error', (error) => {
                    console.log('Error');
                    reject(error);
                });
        });
    }

    static downloadFile() {
        return new Promise(async (resolve, reject) => {
            const csvStream = csv.createWriteStream({ headers: true });

            const writableStream = fs.createWriteStream(path.join(__dirname, '../..', tempCSVFileName));

            writableStream.on('finish', () => {
                resolve();
                console.log('All writes are now complete.');
            });

            csvStream.pipe(writableStream);

            const users = await UserModel.find();

            await Promise.all(users.map((user) => {
                csvStream.write({
                    ...pick(user, dbFieldNames)
                });
            }));

            csvStream.end();
        });
    }
}
