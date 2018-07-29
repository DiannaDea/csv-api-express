import express from 'express';
import logger from 'morgan';
import formidable from 'express-formidable';


import connectToDb from './services/dbConnection';

import userRouter from './routes/user';
import csvRouter from './routes/csv';


const app = express();

connectToDb();

app.use(logger('dev'));
app.use(formidable());


app.use('/users', userRouter);
app.use('/csv', csvRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

app.use((req, res) => res
    .status(404)
    .send({ message: 'Not found' }));
