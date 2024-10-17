
import {Route,Routes} from 'react-router-dom';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Service from '../pages/Service';
import Home from '../pages/Home';
import MyAccount from '../Dashboard/user-account/MyAccount';
import DashBoard from '../Dashboard/doctor-account/DashBoard';
import ProtectedRoute from './ProtectedRoute';
// import CheckoutSuccess from '../pages/CheckoutSucces';
const Router = () => {
  return (<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="/doctors/:id" element={<DoctorDetails />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Service />} />
{/*     <Route path="/checkout-success" element={<CheckoutSuccess />} /> */}
    <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}> <MyAccount/></ProtectedRoute>}/>
    <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><DashBoard/></ProtectedRoute>}/>
  </Routes>
  )
}

export default Router
