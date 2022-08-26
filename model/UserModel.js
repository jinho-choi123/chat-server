import mongoose from './db.js';
import findOrCreatePlugin from 'mongoose-findorcreate';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    googleId: {type: String},
    joinedRoom: [{type: String}]
})

UserSchema.plugin(findOrCreatePlugin);
UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema);

export default User 