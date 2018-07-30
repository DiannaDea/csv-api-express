import { Router } from 'express';

import CSVController from '../controllers/csvController';

const csvRouter = Router();

csvRouter.post('/upload', CSVController.upload);

csvRouter.get('/download', CSVController.download);

export default csvRouter;
