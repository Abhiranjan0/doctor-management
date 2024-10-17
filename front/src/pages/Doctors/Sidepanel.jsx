/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import convertTime from '../../../utils/convertTime'
import {BASE_URL, token} from '../../../config.js'
import { toast } from 'react-toastify'
 const Sidepanel = ({doctorId,ticketPrice,timeSlots}) => {

    const bookinghandler= async(req,res)=>{
        console.log("booking handler called")
        try {
            const res=await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`
                    }
            })
            const data=await res.json()
            if(!res.ok){
                throw new Error(data.message+ "Pleasetry again")
            }
            if(data.session.url){
                window.location.href=data.session.url;
            }
        } catch (error) {
            toast.error(error,message)
        }
    }
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 
    rounded-md">
        <div className="flex items-center justify-between" >
            <p className="text__para mt-0 font-semibold">Ticket Price</p>
            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                {ticketPrice}INR</span>
        </div>
        <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
                Available Time slots:
            </p>
            <ul className="mt-3">
                {timeSlots?.map((item,index)=>(
                     <li  key={index} className="flex items-center justify-between mb-2">
                     <p className="text-[15px] leading-6  text-textColor font-semibold">
                             {item.day.charAt(0).toUpperCase()+item.day.slice(1)}
                         </p>
                         <p className="text-[15px] leading-6  text-textColor font-semibold">
                             {convertTime(item.startingTime)}-{convertTime(item.endingTime)}
                         </p>
                     </li>
                )
                )}
{/*                
                // <li className="flex items-center justify-between mb-2">
                // <p className="text-[15px] leading-6  text-textColor font-semibold">
                //         Tuesday
                //     </p>
                //     <p className="text-[15px] leading-6  text-textColor font-semibold">
                //         4:00PM -9:30PM
                //     </p>
                // </li>
                // <li className="flex items-center justify-between mb-2">
                // <p className="text-[15px] leading-6  text-textColor font-semibold">
                //        Wednesday
                //     </p>
                //     <p className="text-[15px] leading-6  text-textColor font-semibold">
                //         4:00PM -9:30PM
                //     </p>
                // </li> */}
            </ul>
        </div>
        <button className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  )
}

export default Sidepanel
