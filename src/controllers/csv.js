import fs from 'fs';
import path from 'path';
import CSVLoader from '../utils/CSVLoader';

import { tempCSVFileName, defaultDelimiter } from '../constants';

import logger from '../utils/logger';


export default class CSVController {
    static async upload(req, res) {
        try {
            if (!req.files.data) {
                throw new Error('No file provided');
            }
            if (req.files.data.name.match(/\.csv$/)[0] !== '.csv') {
                throw new Error('Incorrect file format');
            }
            if (req.files.data.size > 20000) {
                throw new Error('Too large document, maxsize 20000 bytes');
            }

            await CSVLoader.readFile(req.files.data.path, defaultDelimiter);

            return res.status(200).send({
                message: 'Successfully uploaded file'
            });
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }

    static async download(req, res) {
        try {
            const filename = path.join(__dirname, '../..', tempCSVFileName);

            await CSVLoader.writeFile(filename, defaultDelimiter);

            res.attachment(filename).sendFile(filename, {}, (err) => {
                fs.unlink(filename);

                (err)
                    ? logger.error(`Unable to send file, error: ${err.message}`)
                    : logger.info(`Sent file: ${filename}`);
            });
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }
}
