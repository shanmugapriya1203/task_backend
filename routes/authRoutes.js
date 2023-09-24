const express= require('express')
const router= express.Router();
const {register,login, updateProfile} = require('../controllers/authController')
const authMiddleware= require('../middleware/authMiddleware')

router.post('/register',register)
router.post('/login',login)
router.put('/update',updateProfile)

router.get('/protected', authMiddleware, (req, res) => {

    res.status(200).json({ message: 'You have access to this protected route!', userId: req.userId });
  });

  module.exports= router