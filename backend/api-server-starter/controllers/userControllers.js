const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    if (!process.env.SECRET) {
        throw new Error("Missing SECRET key in environment variables");
      }
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password, phone_number, gender, date_of_birth,  membership_status} = req.body

  try {
    const user = await User.signup(name, email, password, phone_number, gender, date_of_birth,  membership_status)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }