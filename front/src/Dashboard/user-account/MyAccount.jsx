import userImg from '../../assets/Image/doctor-img01.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react';
import Profile from './Profile';
import MyBookings from './MyBookings';
import Loader from '../../components/Loader/Loader'; 
import {BASE_URL} from '../../../config';
import Error from '../../components/Error/Error';
import useFetchData from '../../hooks/useFetchData'
const MyAccount = () => {
    const [Tab, setTab] = useState('bookings')
    const { dispatch } = useContext(AuthContext)
    const {
        data:userData, 
        loading,
         error
        }=useFetchData(`${BASE_URL}/users/profile/me`);
    console.log(userData,'userData');
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"})
    }
  return (
   <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && <Loader/>}
        {error && <Error  errMesage={error}/>}
     { 
        !loading && !error && (
        <div className='max-w-[1170px] px-5 mx-auto'>
        <div className="grid  md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md ">
                <div className="flex items-center justify-center">
                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid'>
                    <img src={userData.photo} alt=""
                    className='w-full h-full rounded-full ' />
                </figure>
                </div>
                  <div className='text-center mt-4'>
                    <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
                    <p className='text-textColor text-[15px] leading-6 font-medium'>
                      {userData.email}
                    </p>
                    <p className='text-textColor text-[15px] leading-6 font-medium'>
                        Blood type: <span className='ml-2  text-headingColor text-[22px] leading-8'>
                            {userData.bloodType}</span>
                    </p>
                </div>
    
                <div className='mt-[50px] md:mt-[100px]'>
                    <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>logout</button>
                    <button className='w-full bg-red-600 p-3 text-[16px] mt-4 leading-7 rounded-md text-white'>Delete account</button>
                </div>
    
            
            </div>
    
            <div className="md:col-span-2 md:px-[30px]">
                <div>
                    <button onClick={()=>setTab('bookings')}  className={` ${Tab==='bookings' && 'bg-primaryColor text-white font-normal'}p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] 
                    leading-7 border border-solid border-primaryColor`}>My Booking</button>
                      <button onClick={()=>setTab('settings')} className={`${Tab==='settings' && 'bg-primaryColor text-white font-normal' }py-2  px-5 rounded-md text-headingColor font-semibold text-[16px] 
                    leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
                </div>
                {
                    Tab==='bookings' && <MyBookings/>
                }
                {
                    Tab==='settings' &&<Profile user={userData}/>
                }
            </div>
            </div>
        </div>)
     }
     </div>
   </section>
  )
}

export default MyAccount