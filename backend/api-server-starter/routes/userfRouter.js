const express = require('express')
const router = express.Router();
// controller functions
const { getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser, loginUser, signupUser } = require('../controllers/userfControllers')



// login route
router.post('/login', loginUser)

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

// signup route
router.post('/signup', signupUser)

module.exports = router