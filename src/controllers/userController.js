import pick from 'lodash.pick';
import User from '../models/User';

import { DB_FIELD_NAMES } from '../constants';

export default class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.find();

            const usersRes = users.map(user => pick(user, DB_FIELD_NAMES));

            return (usersRes.length)
                ? res.status(200).send(usersRes)
                : res.status(204, 'No users in DB');
        } catch (error) {
            return res.status(404).send({
                message: error.message
            });
        }
    }
}
