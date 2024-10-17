import signupImg from '../assets/Image/signup.gif'
// import avatar from './../assets/Image/doctor-img01.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import  {BASE_URL} from '../../config.js';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader'
const Signup = () => {
  const [loading, setLoading] = useState(false);
const [selectedFile, setSelectedFile] = useState(null)
const [previewURL, setPreviewURL] = useState("");
  const [formData, setformData] = useState({
    name:'',
    email:'',
    password:'',
    photo:"",
    gender:'',
    role:'patient'
  })
const handleInputChange=e=>{
  setformData({...formData,[e.target.name]:e.target.value});
}

const navigate=useNavigate();


const handleFileInputChange = async event => {
  const file = event.target.files[0];
  const data = await uploadImageToCloudinary(file);
  console.log(data);
  setPreviewURL(data.url);
  setSelectedFile(data.url);
  setformData({ ...formData, photo: data.url });
};
  const submitHandler =async (event)=>{
    event.preventDefault();
    console.log(formData);
    
    setLoading(true);
    try{
      const res=await fetch(`${BASE_URL}/auth/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });
      const  {message}=await res.json();
      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false);
      toast.success(message)
      navigate('/login')
    }catch(err){
      toast.error(err.message)
      setLoading(false)
    }

  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
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
                <input
                  type="email "
                  placeholder="enter your email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer"
                />{" "}
              </div>
              <div className="mb-5">
                <input
                  type="password"
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
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    onChange={handleInputChange}
                    value={formData.role}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4  py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center justify-between">
                Gender:
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="gender"
                    onChange={handleInputChange}
                    value={formData.gender}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4  py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">other</option>
                  </select>
                </label>
              </div>
              <div className="m-5 flex items-center gap-3">
                {selectedFile && (
                  <figure
                    className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
            flex items-center justify-center"
                  >
                    <img
                      src={previewURL}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[160px] h-[50px] ">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png , .jpeg"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 w-full left-0 h-full flex item-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
              bg-[#0066ff46] text-handlingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={loading && true}
                  className="w-full bg-primaryColor text-white text-[18px] 
          leading-[30px] rounded-lg"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
              <p className="mt-5 text-textColor ">
                Already have an acount?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup