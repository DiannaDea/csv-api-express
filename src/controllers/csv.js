import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import CSVLoader from '../utils/CSVLoader';

import { tempCSVFileName, defaultDelimiter } from '../constants';

import logger from '../utils/logger';


export default class CSVController {
    static async upload(req, res) {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(404).send({
                    message: 'No such file'
                });
            }

            try {
                if (files.data.name.match(/\.csv$/)[0] !== '.csv') {
                    throw new Error('Incorrect file format');
                }
                if (files.data.size > 20000) {
                    throw new Error('Too large document, max size 20000 bytes');
                }

                await CSVLoader.readFile(files.data.path, defaultDelimiter);

                return res.status(200).send({
                    message: 'Successfully uploaded file'
                });
            } catch (error) {
                return res.status(404).send({
                    message: error.message
                });
            }
        });
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
