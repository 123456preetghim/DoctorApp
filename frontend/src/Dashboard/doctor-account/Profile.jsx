import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({doctorData}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password :"",
    phone: "",
    bio:"",
    gender:"",
    specialization: "",
    ticketPrice: 0,
    qualifications:[],
    experiences:[],
    timeSlots:[],
    about:"",
    photo:null


  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => {
  const file = event.target.files[0];
  const data = await uploadImageToCloudinary(file);

  console.log(data);
  setFormData({ ... formData, photo: data ?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
        console.log(token);
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  // Reusable function for adding an item to an array in formData
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

   // Reusable function for deleting item
   const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem('qualifications', {
      startingDate: '',
      endingDate: '',
      degree: 'PHD',
      university: 'Tezpur Medical college',
    });
  };

  // Function to handle erperience changes
const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };
  
  // Function to handle  TimeSlot changes

  const addExperience = (e) => {
    e.preventDefault();
    addItem('experiences', {
        startingDate:"", endingDate:"", position:"Senior Surgeon", hospital: "Tezpur Medical ",
    });
  };

  
const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  // Function to handle TimeSlot changes

   const addTimeSlot = (e) => {
    e.preventDefault();
    addItem('timeSlots',{ day: "Sunday" , startingTime:"10:00", endingTime:"04:30", });
  };


const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };
  

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
            <label className="form_label" htmlFor="name">Name*</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="form__input"
            />
            </div>
            <div className="mb-5">
            <label className="form_label" htmlFor="email">Email*</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="form__input"
                readOnly
                aria-readonly
                disabled="true"
            />
            </div>
            <div className="mb-5">
            <label className="form_label" htmlFor="phone">Phone*</label>
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
            <label className="form_label" htmlFor="phone">Phone*</label>
            <p className="fprm__label">Bio*</p>
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
                <div className="grid grid-cols-3 gap-5 mb-[30px]">

                    <div>
                    <p className="form_label">Gender*</p>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form_input py-3.5"
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    </div>

                    <div>
                        <p className="form_label">Specialization*</p>
                        <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="form_input py-3.5"
                        >
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="pediatrician">Pediatrician</option>
                            <option value="psychiatrist">Psychiatrist</option>
                            {/* Add more options here as needed */}
                        </select>
                    </div>

                    <div>
                        <p className="form_label">Ticket Price*</p>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={formData.bio}
                            placeholder="100"
                            className="form__input"
                            onClick={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <p className="form_label">Qualifications* </p>
                {formData.qualifications ?.map((item, index) => (
                    <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="form_label">Starting Date*</p>
                            <input
                            type="date"
                            name="startingDate"
                            value={item.startingDate}
                            className="form__input"
                            onChange={e=> handleQualificationChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        <div>
                            <p className="form_label"> Ending Date*</p>
                            <input
                            type="date"
                            name= "endingData"
                            value={item. endingDate}
                            className="form__input"
                            onChange={e=> handleQualificationChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="form_label">Degree*</p>
                            <input
                            type="text"
                            name="degree"
                            value={item.degree}
                            className="form__input"
                            onChange={e=> handleQualificationChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        <div>
                            <p className="form_label"> University*</p>
                            <input
                            type="text"
                            name= "university"
                            value={item.university}
                            className="form__input"
                            onChange={e=> handleQualificationChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        </div>

                        <button onClick={e=>deleteQualification(e, index)} 
                        className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                            <AiOutlineDelete />
                        </button>
                    </div>
                    </div>
                ))}
                <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                Add Qualification
                </button>
            </div>
             

            <div className="mb-5">
                <p className="form_label">Experiences* </p>
                {formData.experiences ?.map((item, index) => (
                    <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="form_label">Starting Date*</p>
                            <input
                            type="date"
                            name="startingDate"
                            value={item.startingDate}
                            className="form__input"
                            onChange={e=> handleExperienceChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        <div>
                            <p className="form_label"> Ending Date*</p>
                            <input
                            type="date"
                            name= "endingData"
                            value={item. endingDate}
                            className="form__input"
                            onChange={e=> handleExperienceChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="form_label">Position*</p>
                            <input
                            type="text"
                            name="position"
                            value={item.position}
                            className="form__input"
                            onChange={e=> handleExperienceChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        <div>
                            <p className="form_label"> Hospital*</p>
                            <input
                            type="text"
                            name= "hospital"
                            value={item.hospital}
                            className="form__input"
                            onChange={e=> handleExperienceChange(e, index)}
                            // Ensure you close the input tag properly
                            />
                        </div>
                        </div>

                        <button onClick={e => deleteExperience(e, index)} 
                        className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                            <AiOutlineDelete />
                        </button>
                    </div>
                    </div>
                ))}
                <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                Add Experience
                </button>
            </div>

            <div className="mb-5">
                <p className="form_label">Time Slots* </p>
                {formData.timeSlots ?.map((item, index) => (
                <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                        <div>
                                <p className="form_label">Day*</p>
                                <select name="day" 
                                value={item.day}
                                className="form_input py-3.5">
                                    onChange={e=> handleTimeSlotChange(e, index)}
                                <option value="">Select</option>
                                <option value="saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                </select>
                            </div>
                            <div>
                                <p className="form_label">Starting Time*</p>
                                <input
                                type="time"
                                name="startingTime"
                                value={item.startingTime}
                                className="form_input"
                                onChange={e=> handleTimeSlotChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form_label">Ending Time*</p>
                                <input
                                type="time"
                                name="endingTime"
                                value={item.endingTime}
                                className="form_input"
                                onChange={e=> handleTimeSlotChange(e, index)}
                                />
                            </div>
                            <div onClick={e=> deleteTimeSlot(e,index)} className="flex items-center">
                                <button  className="bg-red-600 p-2 rounded-full text-white text-[18px]   cursor-pointer mt-6">
                                <AiOutlineDelete />
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                Add TimeSlot
                </button>
            </div>

            <div className="mb-5">
            <p className="form_label">About*</p>
            <textarea
                name="about"
                rows={5}
                value={formData.about}
                placeholder="Write about you"
                onChange={handleInputChange}
                className="form_input"
            ></textarea>
            </div>


            <div className="mb-5 flex items-center gap-3">
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img src={formData.photo} alt="" className="w-full rounded-full" />
                        </figure>
                        )}
                        <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-15px leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                        >
                            Upload Photo
                        </label>
                        </div>
            </div>

            <div className="mt-7">
                <button
                type="submit"
                onClick={updateProfileHandler}
                className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
                >
                Update Profile
                </button>
            </div>

        </form>
     </div>
  );
};

export default Profile;
