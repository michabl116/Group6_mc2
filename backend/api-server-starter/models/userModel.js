const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    membership_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false  }
);


// static signup method
userSchema.statics.signup = async function(name, email, password, phone_number, gender, date_of_birth, membership_status ) {

  // validation
  if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
    throw Error('All fields must be filled')
  }

  // Name validation 
  if (!validator.isAlpha(name.replace(/\s/g, '')) || name.length < 2) {
    throw Error('Name must contain only letters and be at least 2 characters long');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  // Phone number validation 
  if (!validator.isNumeric(phone_number)) {
    throw Error('Invalid phone number');
  }

  // // Gender validation 
  // const allowedGenders = ["Male", "Female", "Other"];
  // if (!allowedGenders.includes(gender)) {
  //   throw Error('Invalid gender value');
  // }

  // Date of birth validation (ensure it's a valid date and not in the future) //"YYYY-MM-DD"
  if (!validator.isDate(date_of_birth.toString()) || new Date(date_of_birth) > new Date()) {
    throw Error('Invalid date of birth');
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({name, email, password: hash, phone_number, gender, date_of_birth, membership_status })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}





module.exports = mongoose.model("User", userSchema);
