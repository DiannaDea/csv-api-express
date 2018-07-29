import express from 'express';
import logger from 'morgan';

import connectToDb from './services/dbConnection';

import userRouter from './routes/user';
import csvRouter from './routes/csv';

const PORT = process.env.PORT || 5000;

const app = express();

connectToDb();

app.use(logger('dev'));

app.use('/users', userRouter);
app.use('/csv', csvRouter);


app.use(() => {
    throw new Error('Not found');
});

app.use((error, req, res, next) => {
    res.status(404).send({ message: error.message });
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
