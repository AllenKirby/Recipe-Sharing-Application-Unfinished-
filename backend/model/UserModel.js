const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },  
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favorites: {
        type: [String],
        default: []
    }
}, {timestamps: true})

userSchema.statics.signup = async function (firstname, lastname, email, username, password) {
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    //check email if already exist
    const checkEmail = await this.findOne({email})
    if(checkEmail){
        throw Error("Email already in use")
    }
    //check username if already exist
    const checkUsername = await this.findOne({username})
    if(checkUsername){
        throw Error("Username already in use")
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({firstname, lastname, email, username, password: hash})

    return user
}

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username})

    if(!user){
        throw Error("Incorrect Username")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)