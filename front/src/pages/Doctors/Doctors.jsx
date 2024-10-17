/* eslint-disable no-unused-vars */

import { doctors } from '../../assets/data/doctors'
import DoctorCard from '../../components/Doctors/DoctorCard'
import Testimonial from '../../components/Testimonial/Testimonial'
// import {DoctorCard} from './../../components/Doctors/DoctorCard'
import { BASE_URL } from '../../../config.js';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'
import { useEffect, useState } from 'react';
const Doctors = () => {
  const [query,setQuery]=useState('');
  const [debounceQuery, setdebounceQuery] = useState(""); 
  const handleSearch=()=>{
    setQuery(query.trim());
    console.log('handle search');
  }
  const {data:doctors,loading ,error}= useFetchData(`${BASE_URL}/doctors?query=${query}`);
 useEffect(()=>{
  const timeout= setTimeout(()=>{
setdebounceQuery(query);
  },700)
  return ()=>clearTimeout(timeout);
 },[query]);
    return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">find a doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specifiication"
              value={query}
              onChange={e=>setQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md"
            onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:grid-cols-4 lg:mt-[55px]
          "
            >
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say?</h2>

            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Doctors