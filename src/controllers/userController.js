import pick from 'lodash.pick';
import User from '../models/User';

import { DB_FIELD_NAMES } from '../constants';

export default class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.find();

            if (!users || !users.length) {
                return res.status(204).send({ message: 'No users in DB' });
            }

            const usersRes = users.map(user => pick(user, DB_FIELD_NAMES));

            return res.status(200).send(usersRes);
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }
}
