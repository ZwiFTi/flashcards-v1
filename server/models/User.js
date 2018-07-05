const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema; 
const UserSchema = new Schema({ 
    name: String, 
    email: String, 
    password: String, 
}); 

const User = mongoose.model('User', UserSchema); 
module.exports = User;

// method to add users to database, as we want to encrypt their passwords
module.exports.createUser = (newUser, callback) => {
    // takes userobject newUser
    bcryptjs.genSalt(10, (err, salt) => { 
        bcryptjs.hash(newUser.password, salt, (error, hash) => { 
            // converts user-provided password into bcrypted password            
            const newUserResource = newUser; 
            newUserResource.password = hash; 
            // store the hashed password 
            newUserResource.save(callback); 
        }); 
    }); 
};