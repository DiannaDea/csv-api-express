import CSVLoader from '../utils/CSVLoader';

const delimiter = ',';


export default class CSVController {
    static async upload(req, res) {
        try {
            console.log('HEREEEEE');
            if (!req.files.data) {
                throw new Error('No file provided');
            }
            if (req.files.data.name.match(/\.csv$/)[0] !== '.csv') {
                throw new Error('Incorrect file format');
            }

            await CSVLoader.uploadFile(req.files.data.path, delimiter);

            return res.status(200).send({
                message: 'Successfully uploaded file'
            });
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }
}
