import csv from 'fast-csv';
import UserModel from '../models/User';


export default class CSVLoader {
    static uploadFile(file, delimiter) {
        return new Promise((resove, reject) => {
            const cvsStream = csv.fromPath(file, {
                headers: true,
                delimiter
            });

            cvsStream
                .on('data', async (user) => {
                    console.log(`Received data ${JSON.stringify(user)}`);

                    cvsStream.pause();

                    try {
                        await UserModel.create({ ...user });
                    } catch (error) {
                        console.log(error.message);
                    }

                    cvsStream.resume();

                    console.log('============');
                })
                .on('end', () => {
                    console.log('We are done!');
                    resove();
                })
                .on('error', (error) => {
                    console.log('Error');
                    reject(error);
                });
        });
    }

    static writeFile(file, data) {

    }
}
