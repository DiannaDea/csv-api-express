import { Router } from 'express';

import CSVController from '../controllers/csv';

const csvRouter = Router();

csvRouter.post('/upload', CSVController.upload);

csvRouter.post('/download', (req, res) => {
    console.log('HERE');
    res.status(200).send({
        message: 'download'
    });
});

export default csvRouter;
