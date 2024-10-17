import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken=user=>{
    return jwt.sign({id:user._id, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    console.log("Received data:", req.body); // Debugging line
    console.log()
    try {
      if (!email || !password || !name || !role || !gender) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      let user = null;
      if (role === "patient") {
        user = await User.findOne({ email });
      } else if (role === "doctor") {
        user = await Doctor.findOne({ email });
      } else {
        return res.status(400).json({ msg: "Invalid role" });
      }
  
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      if (role === "patient") {
        user = new User({
          name,
          email,
          password: hash,
          photo,
          gender,
          role,
        });
      } else if (role === "doctor") {
        user = new Doctor({
          name,
          email,
          password: hash,
          photo,
          gender,
          role,
        });
      }
  
      await user.save();
      res.status(200).json({ success: true, message: "User successfully created" });
    } catch (err) {
      console.error("Error creating user:", err.message); // Debugging line
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }


export const login =async(req,res)=>{
    const {email}=req.body;
    try{
        let user= null;
         const patient =await User.findOne({email});
        const  doctor=await Doctor.findOne({email});
         if(patient)
            user=patient;
        else if(doctor)
            user=doctor;
        if(!user){
            return res.status(404).json({message:"user does not exist"})
        }
        const isMatch =await bcrypt.compare(
            req.body.password,user.password);
        if(!isMatch){
            return res.status(400)
            .json({status:false,message:"Invalid credentials"})
            }
            const token=generateToken(user);
            const {password ,role ,appointments,...rest}=user._doc;
            res.status(200).
            json({
                status:true,
                message:"Login sucessful",
                token,
                data:{...rest},
                role})
}
catch(err){
    res.status(500).json({message:"failed to login"})
}
}
