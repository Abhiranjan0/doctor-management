/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary.js';
import  {BASE_URL, token} from '../../../config.js';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader'
const Profile = ({user}) => {
  const handleInputChange=e=>{
    setformData({...formData,[e.target.name]:e.target.value});
  }
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)

  const [formData, setformData] = useState({
    name:'',
    email:'',
    password:'',
    photo:null,
    gender:'',
    bloodType:''
  })
  
  const navigate=useNavigate();
  useEffect(()=>
  {
   setformData({name:user.name,
    email:user.email,
    photo:user.photo,
    gender:user.gender,
    bloodType:user.bloodType
   })
  },[user])
  
  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);

    setSelectedFile(data.url);
    setformData({ ...formData, photo: data.url });
  };
    const submitHandler =async (event)=>{
      console.log(formData);
      event.preventDefault();
      setLoading(true);
      try{
        const res=await fetch(`${BASE_URL}/users/${user._id}`,{
          method:'put',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        const  {message}=await res.json();
        if(!res.ok){
          throw new Error(message)
        }
        setLoading(false);
        toast.success(message)
        navigate('/users/profile/me')
      }catch(err){
        toast.error(err.message)
        setLoading(false)
      }
  
    }
  return (
    <div className='mt-10'>
       <form onSubmit={submitHandler}>
          <div className="mb-5">
          <input type="text"
           placeholder="Full name"
          name="name" 
          onChange={handleInputChange} 
          value={formData.name}
          className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input type="email "
           placeholder="enter your email"
          name="email" 
          onChange={handleInputChange} 
          value={formData.email}
          className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer" aria-readonly
           readOnly
          /> </div> 
            <div className="mb-5">
          <input type="password"
           placeholder="enter your password"
          name="password" 
          onChange={handleInputChange} 
          value={formData.password}
          className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input type="text"
           placeholder="Blood type"
          name="bloodType" 
          onChange={handleInputChange} 
          value={formData.bloodType}
          className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer"
          />
        </div>
          <div className="mb-5 flex items-center justify-between">Gender:
            <label className='text-headingColor font-bold text-[16px] leading-7' >
            Are you a:
            <select name="gender" 
            onChange={handleInputChange} value={formData.gender}
            className='text-textColor font-semibold text-[15px] leading-7 px-4  py-3 focus:outline-none'>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">other</option>
            </select>
            </label>
          </div>
          <div  className='m-5 flex items-center gap-3'>
            {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
            flex items-center justify-center'>
              <img src={formData.photo}  alt="" className='w-full rounded-full'/>
            </figure>}
            <div className='relative w-[160px] h-[50px] '>
              <input type="file" name="photo" id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png , .jpeg"  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'/>
              <label htmlFor='customFile' className='absolute top-0 w-full left-0 h-full flex item-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
              bg-[#0066ff46] text-handlingColor font-semibold rounded-lg truncate cursor-pointer'>
                {selectedFile?selectedFile.name:"upload image"}
              </label>
            </div>
          </div>

          <div className="mt-7">
          <button type="submit"
          disabled= {loading && true}  className="w-full bg-primaryColor text-white text-[18px] 
          leading-[30px] rounded-lg">
            {loading? <HashLoader size={25} color='#ffffff'/>: 'update'} 
          </button>
        </div>
            </form>
    </div>
  )
}

export default Profile