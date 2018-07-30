import fs from 'fs';
import csv from 'fast-csv';

import isEqual from 'lodash.isequal';
import pick from 'lodash.pick';

import User from '../models/User';
import logger from './logger';
import { DB_FIELD_NAMES } from '../constants';


export default class CSVLoader {
    static readFile(file, delimiter) {
        return new Promise((resove, reject) => {
            const cvsStream = csv.fromPath(file, {
                headers: DB_FIELD_NAMES,
                delimiter
            });

            let firstLine = true;

            cvsStream
                .on('data', async (user) => {
                    logger.info(`Received data ${JSON.stringify(user)}`);
                    cvsStream.pause();

                    if (firstLine) {
                        const sameHeaders = isEqual(DB_FIELD_NAMES, Object.values(user));

                        firstLine = false;

                        if (!sameHeaders) {
                            cvsStream.destroy();
                            reject(new Error('Invalid CSV header format'));
                        }
                    }

                    try {
                        if (!isEqual(DB_FIELD_NAMES, Object.values(user))) {
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
                headers: DB_FIELD_NAMES,
                delimiter
            });

            const fileStream = fs.createWriteStream(file)
                .on('finish', () => resolve())
                .on('error', error => reject(error));

            csvStream.pipe(fileStream);

            const users = await User.find();

            if (!users.length) {
                csvStream.write(DB_FIELD_NAMES);
            } else {
                users.map((user) => {
                    csvStream.write({
                        ...pick(user, DB_FIELD_NAMES)
                    });
                });
            }
            logger.info(`Successfully created file ${file}`);

            csvStream.end();
        });
    }
}
