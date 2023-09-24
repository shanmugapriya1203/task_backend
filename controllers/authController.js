const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const User= require('../models/User')

const register= async(req,res)=>{
    try{
        const {username,email,password}= req.body
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})

        }
        const hashedPassword= await bcrypt.hash(password,10)
        const newUser= new User({
            username,email,password:hashedPassword
        })
        await newUser.save();
        res.status(201).json({message:'User Registered Successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server error'})
    }
}

const login= async(req,res)=>{
    try {
        const {email,password}= req.body
      const user= await User.findOne({email});
      if(!user){
        return res.status(401).json({message:'Invalid Credentials'})
      }
      const isPasswordValid= await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
        return res.status(401).json({message:'Invalid Credentials'});
        
        
      }
      const token= jwt.sign({userId:user._id},'your-secret-key',{
        expiresIn:'5h'
      });
      res.status(200).json({token,userId:user._id})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

}
 const  updateProfile= async (req,res)=>{
  try {
 
    const { name, email, password, confirmPassword,  } = req.body;

   
    const user = await User.findOne({ email });
  

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    user.name = name;
    user.email = email;
    user.password = password; 
   

 
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
 }

module.exports= {login,register,updateProfile}