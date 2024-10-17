import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js'

export const updatedDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
        const updateDoctor=await Doctor.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true})
        res.status(200)
        .json({
            success:true,
         message:"succesfully update",
        data: updateDoctor})
    }
    catch(error){
        res.status(500).json({success:false,
            message:error})
    }
}

export const deleteDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
      await Doctor.findByIdAndDelete(id);
      res.status(200).json({success:true,
        message:"succesfully delete"})
    }
    catch(error){
        res.status(500).json({success:false,
            message:"failed to delete"})
    }
}

export const getSingleDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
        const doctor=await Doctor.findById(id)
        .populate('reviews')
        .select('-password');
        res.status(200).json({
            success:true,
            message:"succesfully Doctor found",
            data: doctor,
        });
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"Doctor not found"})
    }
}

export const getAllDoctor=async(req,res)=>{
    try{
    let doctors;
    const {query} =req.query;
    if(query){
        doctors=await Doctor.find({
            isApproved:'approved',
            $or: [
            {name:{$regex:query ,$options:"i"}},
            {specialization:{$regex:query ,$options:"i"}},
        ]})
    }
    else{
     doctors=await Doctor.find({isApproved:'approved'}).select('-password')
    }  
     res.status(200).json({success:true,
         message:"list of Doctors",
        data: doctors})
    }
    catch(error){
        res.status(404).json({success:true,
            message:"no Doctor found "})
    }
}
export const getDoctorProfile=async(req,res)=>{
    const doctorId=req.userId;
    console.log(doctorId)
    try{
        const doctor=await Doctor.findById(doctorId)
        console.log(doctor)
        if(!doctor){
            return res.status(404).json({success:false,message:"doctor not found"})
        }
        const {password, ...rest}=doctor._doc;
        const appointments=await Booking.find({doctor:doctorId});
        res.status(200).json({
            success:true,
            message:"profile info is  getting",
            data:{...rest,
            appointments
        }})
    }
    catch(err){
        res.status(404).json({success:false,message:"something went wrong"});
    }
}