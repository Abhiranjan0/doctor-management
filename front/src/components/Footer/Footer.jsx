import React from 'react'
import logo from './../../assets/Image/logo.png';
import {RiLinkedinFill} from 'react-icons/ri';
import { AiFillYoutube,AiFillGithub, AiOutlineInstagram } from 'react-icons/ai'; 
import { Link } from 'react-router-dom';
const sociallinks=[
  {
    path:'https://www.youtube.com/@warisamiransari5199',
    icon:<AiFillYoutube className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path:'https://github.com/warisamir',
    icon:<AiFillGithub className='group-hover:text-white w-4 h-5'/>,
  }
  ,{
    path:'https://www.instagram.com/aman_ansari1918/',
    icon:<AiOutlineInstagram className='group-hover:text-white w-4 h-5'/>,
  }
  ,{
    path:'https://www.linkedin.com/in/waris-amir-0387461b3/',
    icon:<RiLinkedinFill className='group-hover:text-white w-4 h-5'/>,
  }
]

const qucklinks01=[
  {
    path:'./home',
    display:'Home'
  },
  {
    path:"/",
    display:"About us",
  },
  {
    path:'/services',
    display:"Services",
  },
  {
    path:'/',
    display:"blog",
  }
]
const quickLinks02=[
{
path:"/find-a-doctor",
display:"Find a doctor",
},
{
path:"/",
display:"Request an appointment"
},
{
path:'/',
display:"find a location"
}
,{
  path:'/', 
  display:"Get a opinion"
},
]
const quickLinks03=[
  {
    path:'/',
    display:"Donate",
  },{
    path:"/contact",
    display:"Contact us",
  }
]
const Footer = () => {
  const year =new Date().getFullYear();
  return (
    <footer className='pb-16 pt-10'>
      <div className='container '>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src={logo} />
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>Copyright ©️ {year} developer by Waris Amir</p>
          <div className='flex items-center gap-3 mt-4'>
            {sociallinks.map((link,index)=> <Link to={link.path} key={index} 
                  className='w-9 h-9 rounded-full flex items-center justify-center group border border-solid border-[#181A1E] transition duration-300 ease-in-out hover:bg-primaryColor hover:border-none'
                  >
                {link.icon}</Link>)}
          </div>
      </div>
    
      <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Quick links</h2>
            <ul>
              {qucklinks01.map((item,index)=>
              (<li key={index} className='mb-4'>
                <Link to={item.path} 
                className='text-[16px] leading-7 font-[400] text-textColor'>
                  {item.display}</Link>
              </li>)
            )}
            </ul>
        </div>  
        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'> I want  to:</h2>
            <ul>
              {quickLinks02.map((item,index)=>
              (<li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
              </li>))}
            </ul>
        </div>
        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Support</h2>
            <ul>
              {quickLinks03.map((item,index)=>
              (<li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
              </li>))}
            </ul>
        </div>
    </div>
    </div>
    </footer>
  )
}

export default Footer