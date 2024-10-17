import { useContext, useState } from "react"
import { Link ,useNavigate } from "react-router-dom"
import { BASE_URL } from "../../config"
import { toast } from "react-toastify";
import {AuthContext} from '../context/AuthContext.jsx'
import  HashLoader from 'react-spinners/HashLoader.js'
const Login = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const {dispatch}=useContext(AuthContext)
  const [formData, setformData] = useState({
    email:"",
    password:""
  })
  const handleInputChange=e=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const submitHandler =async (event)=>{
    console.log(formData);
    event.preventDefault();
    setLoading(true);
    try{
      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });
      const  result=await res.json();
      if(!res.ok){
        throw new Error(result.message)
      }
      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user:result.data,
          token:result.token,
          role:result.role
        }
        
      })
      console.log(result,"login data");
      setLoading(false);
      toast.success(result.message)
      navigate('/home')
    }catch(err){
      toast.error(err.message)
      setLoading(false)
    }

  }
  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9  font-bold mb-10'>Hello <span
        className='text-primaryColor'>Welcome</span> Back 💖
        </h3>
      <form className="py-4 md:py-0" onSubmit={submitHandler}>
        <div className="mb-5">
          <input type="email"
           placeholder="enter your email"
          name="email" 
          onChange={handleInputChange} 
          value={formData.email}
          className="w-full  py-3 border-b border-solid
          border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[16px] leading-7
          text-headingColor placeholder:text-textColor 
           cursor-pointer"
          />
        </div>
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
        <div className="mt-7">
          <button type="submit" className="w-full bg-primaryColor text-white text-[18px] 
          leading-[30px] rounded-lg">
            {loading ? <HashLoader size={25} color='#fff' />: 'Login'}
          </button>
        </div>
        <p className="mt-5 text-textColor ">
          Don't have an acount? <Link className="text-primaryColor font-medium ml-1" to='/register'>Register</Link>
        </p>
      </form>
      </div>
    </section>
  )
}

export default Login