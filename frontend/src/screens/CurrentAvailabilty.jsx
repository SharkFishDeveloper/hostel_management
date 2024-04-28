import axios from 'axios';
import React, { useState } from 'react'
import BACKEND_URL from '../assets/BACKEND_URL';
import PropTypes from 'prop-types';

const CurrentAvailabilty = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedValue, setSelectedValue] = useState();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState();

    const options = [
      { value: 'Hostel J', label: 'Hostel J' },
      { value: 'Hostel E', label: 'Hostel E' },
      { value: 'Hostel B', label: 'Hostel B' },
      { value: 'Hostel O', label: 'Hostel O' }
    ];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelectOption = (option) => {
      setSelectedOption(option.label);
      setIsOpen(false);
    };
    const handleClick = (value) => {
        setSelectedValue(value);
      };
      

    const showRooms =async ()=>{
      setLoading(true);
        try {
          const val = selectedOption.split(" ")[1];

          console.log(val,selectedValue)
            const resp = await axios.post(`${BACKEND_URL}/hostel-rooms`,{
                hostelName:val,occupied:selectedValue
            })
            const respo = resp.data.message;
            respo.map((item, index) => (
              console.log(item)
            ))
            // console.log(resp.data.message);
            setData(resp.data.message);
        } catch (error) {
            console.log(error);
        }finally{
          setLoading(false)
        }
    }

  return (
    <div className="bg-gray-700 h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex-col justify-center items-center h-[90%] bg-gray-100 w-[40%] rouded-md ">
        <h2 className=" text-3xl font-bold underline text-pink-950 ml-6 m-3 hover:scale-105 transition items-start mb-20" >HOSTEL MANAGEMENT ROOMS</h2>



        <div className=" text-center flex justify-center items-center">
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          onClick={toggleDropdown}
        >
          {selectedOption || 'Select a hostel'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-center absolute left-1/2 -translate-x-1/2 right-0 mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        
      )}
      <div
        className={` h-[3rem] w-[7rem]  mx-2 flex justify-center items-center rounded-md cursor-pointer ${
          selectedValue === 0 ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => handleClick(0)}
      >
        Not-occupied
      </div>
      <div
        className={` h-[3rem]  w-[7rem] mx-2 flex justify-center items-center rounded-md cursor-pointer ${
          selectedValue === 1 ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => handleClick(1)}
      >
        Occupied
      </div>
      <div
        className={`h-[3rem]  w-[7rem] mx-2 flex justify-center items-center rounded-md cursor-pointer ${
          selectedValue === null ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => handleClick(null)}
      >
        Show all rooms
      </div>
    </div>
      <div className="p-6 flex items-center justify-center bg-gray-400 h-[4rem] w-[9rem] mx-auto m-9 rounded-xl hover:scale-105 hover:bg-gray-800 text-white transition cursor-pointer" onClick={showRooms}>Show rooms</div>


      <div className="flex items-center justify-center mt-10">
  {loading && (
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
  )}
  </div>

  <div className="flex flex-row-reverse flex-wrap">
  {data && data.map((item, index) => (
    <Card item={item} key={index}/>
  ))}
</div>
        </div>
        </div>
  )
}

export default CurrentAvailabilty;


function Card({item}){
  return (  
    <div className="bg-white shadow-md rounded-md w-[10rem] text-center m-3 ">
    <p className="text-gray-600 text-sm">Student - {item.student1}</p>
    <p className="text-gray-600 text-sm">Student - {item.student2 ? item.student2 : "NULL"}</p>
    <p className="text-gray-600 text-sm">Room No: {item.roomno}</p>
  </div>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    student1: PropTypes.string.isRequired,
    student2: PropTypes.string.isRequired,
    roomno: PropTypes.number.isRequired,
  }).isRequired,
};
