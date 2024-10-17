import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import  DoctorCard from  '../../components/Doctors/DoctorCard'
import  Loader from '../../components/Loader/Loader';
import Error from "../../components/Error/Error";
// import { authenticate } from "../../../../back/Auth/verifyToken";
const MyBookings = () => {
  const {
    data: appointments,
    loading,error
  }=useFetchData(`${BASE_URL}/appointments/my-appointments`)
  return (
    <div>
      {loading && <Loader/>}
      {!loading  && appointments.length==0 &&
         <h2 className="mt-5 text-center  leading-7 text-[20px] font-semibol d text-primaryColor"> you did not have any appointments</h2>
        }
      {error && !loading &&  <Error errMesage={error}/>}
     
      {
        !loading && !error && 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {
            appointments.map(doctor=>
              (<DoctorCard doctor={doctor} key={doctor._id}/>))
          }
        </div>
      }
     
    </div>
  )
}

export default MyBookings