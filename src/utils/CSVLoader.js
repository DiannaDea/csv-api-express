import fs from 'fs';
import csv from 'fast-csv';

import isEqual from 'lodash.isequal';
import pick from 'lodash.pick';

import User from '../models/User';
import logger from './logger';
import { dbFieldNames } from '../constants';


export default class CSVLoader {
    static readFile(file, delimiter) {
        return new Promise((resove, reject) => {
            const cvsStream = csv.fromPath(file, {
                headers: dbFieldNames,
                delimiter
            });

            let firstLine = true;

            cvsStream
                .on('data', async (user) => {
                    logger.info(`Received data ${JSON.stringify(user)}`);
                    cvsStream.pause();

                    if (firstLine) {
                        const sameHeaders = isEqual(dbFieldNames, Object.values(user));

                        firstLine = false;

                        if (!sameHeaders) {
                            cvsStream.destroy();
                            reject(new Error('Invalid CSV header format'));
                        }
                    }

                    try {
                        if (!isEqual(dbFieldNames, Object.values(user))) {
                            await User.create(user);
                        }
                    } catch (error) {
                        logger.error(`${error.message}, user : ${JSON.stringify(user)}`);
                    }

                    cvsStream.resume();
                })
                .on('end', () => resove())
                .on('error', error => reject(error));
        });
    }

    static writeFile(file, delimiter) {
        return new Promise(async (resolve, reject) => {
            const csvStream = csv.createWriteStream({
                headers: dbFieldNames,
                delimiter
            });

            const fileStream = fs.createWriteStream(file)
                .on('finish', () => resolve())
                .on('error', error => reject(error));

            csvStream.pipe(fileStream);

            const users = await User.find();

            users.map((user) => {
                csvStream.write({
                    ...pick(user, dbFieldNames)
                });
            });

            logger.info(`Successfully created file ${file}`);

            csvStream.end();
        });
    }
}
