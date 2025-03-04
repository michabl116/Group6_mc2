const User = require('../models/userfModel')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");


// GET /users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve users" });
    }
  };
  // add to database
  // POST /users
  //user.create(name, email, phone, address,...)
  const createUser = async (req, res) => {
    try {
      const newUser = await User.create({ ...req.body });
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to create user", error: error.message });
    }
  };
  
  // GET /users/:userId
  const getUserById = async (req, res) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      const user = await User.findById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user" });
    }
  };
  
  // PUT /users/:userId
   const updateUser = async (req, res) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      const deletedUser = await User.findOneAndDelete({ _id: userId });
      if (deletedUser) {
        res.status(204).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  };
  


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

module.exports = { getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    signupUser, loginUser }