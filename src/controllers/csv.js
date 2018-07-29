import path from 'path';
import CSVLoader from '../utils/CSVLoader';

import { tempCSVFileName, defaultDelimiter } from '../constants';


export default class CSVController {
    static async upload(req, res) {
        try {
            if (!req.files.data) {
                throw new Error('No file provided');
            }
            if (req.files.data.name.match(/\.csv$/)[0] !== '.csv') {
                throw new Error('Incorrect file format');
            }

            await CSVLoader.uploadFile(req.files.data.path, defaultDelimiter);

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
            await CSVLoader.downloadFile();

            const filename = path.join(__dirname, '../..', tempCSVFileName);

            res.attachment(filename).sendFile(filename, {}, (err) => {
                if (err) {
                    console.log('Unable to send file', err.message);
                } else {
                    console.log('Sent:', filename);
                }
            });
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }
}
