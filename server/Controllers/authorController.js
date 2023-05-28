
const authorModel=require("../Models/authorModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv=require('dotenv')
dotenv.config()


const registerAuthor= async (req, res)=>{
try {
  const {fullName, email, password}  =req.body;
  const user = await authorModel.findOne({email})

  if (!user) {
    const hashpaword = await bcrypt.hash(password, 8);
    const newUser = await authorModel.create({ fullName, email, password:hashpaword })
       await newUser.save()
    return res.status(200).json({message:"Successfull Registered"});
  } else {
    res.json({ message: "Your are  already registered " });
    

} }
catch (error) {
    return res.status(400).json({ message: error.message });
  
}
}

const loginAuthor = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authorModel.findOne({email})
      if (user) {
        const confirmpassword = await bcrypt.compare( password, user.password );

        if (confirmpassword) {
          const token = jwt.sign({ fullName:user.fullName, email: user.email,author: user._id}, process.env.JWT_KEY, { expiresIn: "24h" });
          res.status(200).json({ token,message:"Successfull Login" });
        } else {
          return res.status(400).json({ message: "Wrong Credentials" });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };



  module.exports={
    registerAuthor, loginAuthor
  }