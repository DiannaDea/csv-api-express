import mongoose from 'mongoose';
import handleDuplicateErr from '../middlewares/mongooseDuplicate';

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    }
}, {
    collection: 'User'
});

UserSchema.post('save', handleDuplicateErr);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
