/* eslint-disable react/prop-types */
import {useState} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
 import UploadImageToCloudinary  from '../../../utils/uploadCloudinary.js';
 import {BASE_URL,token} from '../../../config.js'
 import {toast} from 'react-toastify'
 import { useEffect } from 'react';
const Profile = ({doctorData}) => {
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        bio:"",
        gender:"",
        specialization:"",
        ticketPrice:0,
        qualifications:[],
        experiences:[],
        timeSlots:[],
        about:'',
        photo:null
    });

    useEffect(()=>{
      setFormData({
        name:doctorData?.name,
        email:doctorData?.email,
        password:doctorData?.password,
        phone:doctorData?.phone,
        bio:doctorData?.bio,
        gende:doctorData?.gender,
        specialization:doctorData?.specialization,
        ticketPrice:doctorData?.ticketPrice,
        qualifications:doctorData?.qualifications,
        experiences:doctorData?.experiences,
        timeSlots:doctorData?.timeSlots,
        about:doctorData?.about,
        photo:doctorData?.photo
      })
    },[doctorData]);
    const handleFileInputChange=async event=>{
    const file=event.target.files[0];
    const data= await UploadImageToCloudinary(file);
    console.log(data);
    setFormData({...formData,photo:data?.url})
    }
    const handleResuableInputChangeFunc=(key,index,event)=>{
        const {name,value}=event.target;
        setFormData(prevFormData=>{
            const updateItems=[...prevFormData[key]]
            updateItems[index][name]=value;
            return {
                ...prevFormData,
                [key]:updateItems,
            }
        })

    }

    const handleQualificationChange=(event,index)=>{
        handleResuableInputChangeFunc('qualifications',index,event);
    }
    const handleInputChange= e =>{
       setFormData({ ...formData ,[e.target.name]:e.target.value})
    };

    const updateProfileHandler=async e=>{
        e.preventDefault();
        try {
          const res=await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
            method:'PUT',
              headers:{
                'Content-Type': 'application/json',
              Authorization:`Bearer ${token}`
              },
              body:JSON.stringify(formData)
          })
          const result=await res.json()
          if(!res.ok){
            throw Error(result.message)
          }
          toast.success(result.message);
        } catch (error) {
          toast.error(error.message);
        }
    }
    const addItem=(key,item)=>{
        setFormData(prevFormData=>({...prevFormData,[key]:[...prevFormData[key],item]}))
    }

    const addQualification=e=>{
        e.preventDefault();
        addItem('qualifications',{
        startingDate:"",
        endingDate:"",
        degree:"PHD",
        university:"AMU medical  College"
        })
    }

    const deleteItem=(key,index)=>{
      setFormData(prevFormData=>({
        ...prevFormData,
        [key]:prevFormData[key].filter((_,i)=>i!==index)
      }));
    }
    const deleteQualification=(e,index)=>{
      e.preventDefault();
      deleteItem('qualifications',index)
    }

    const handleExperienceChange=(event,index)=>{
      handleResuableInputChangeFunc('experiences',index,event);
  }  
const deleteExperience=(e,index)=>{
  e.preventDefault();
  deleteItem('experiences',index)
}
const addExperience=e=>{
  e.preventDefault();
  addItem('experiences',{
  startingDate:"",
  endingDate:"",
  position:"Senior Surgeon",
  hospital:"AMU medical  College"
  })
}
const handleTimeSlotChange=(event,index)=>{
  handleResuableInputChangeFunc('timeSlots',index,event);
}  
const deleteTimeSlot=(e,index)=>{
e.preventDefault();
deleteItem('timeSlots',index)
}
const addTimeSlot=e=>{
e.preventDefault();
addItem('timeSlots',{
  day:'Sunday',
startingTime:"10:00",
endingTime:"4:30",
})
}


  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile information{" "}
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Email"
            readOnly
            aria-readonly
            className="form__input"
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid gird-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Neurologist">Neurologist</option>
                <option value="dermatologist">dermatologist</option>
              </select>
            </div>

            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Qualifications*</p>
              {formData.qualifications?.map((Item, index) => (
                <div key={index}>
                  <div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <p className="form__label">Starting Date*</p>
                        <input
                          type="date"
                          name="startingDate"
                          value={Item.startingDate}
                          className="form__input"
                          onChange={(e) => handleQualificationChange(e, index)}
                        />
                      </div>

                      <div>
                        <p className="form__label">Ending Date*</p>
                        <input
                          type="date"
                          name="endingDate"
                          value={Item.endingDate}
                          className="form__input"
                          onChange={(e) => handleQualificationChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                      <div>
                        <p className="form__label">Degree*</p>
                        <input
                          type="data"
                          name="degree"
                          value={Item.degree}
                          className="form__input"
                          onChange={(e) => handleQualificationChange(e, index)}
                        />
                      </div>

                      <div>
                        <p className="form__label">University*</p>
                        <input
                          type="text"
                          name="Univeristy"
                          value={Item.university}
                          className="form__input"
                          onChange={(e) => handleQualificationChange(e, index)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteQualification(e, index)}
                      className="bg-red-600 p-2 
                    rounded-full text-whitetext-[18px]
                     mt-2 mb-[30px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addQualification}
                className="bg-[#000] py-2 px-5 rounded text-white h-fit"
              >
                {" "}
                Add Qualification
              </button>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Experience*</p>
          {formData.experiences?.map((Item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={Item.startingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={Item.endingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="data"
                      name="degree"
                      value={Item.degree}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={Item.hospital}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 
                    rounded-full text-whitetext-[18px]
                     mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded
               text-white h-fit"
          >
            {" "}
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((Item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={Item.day}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                      className="form__input 
                         py-3.5"
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form__labe">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={Item.startingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__labe">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={Item.endingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 
                    rounded-full text-whitetext-[18px]
                      cursor-pointer mt-6 "
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit"
          >
            {" "}
            Add TimeSlot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
            flex items-center justify-center"
            >
              <img
                src={formData.photo}
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
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full  py-3 px-4 rounded-lg
                 "
          >
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile