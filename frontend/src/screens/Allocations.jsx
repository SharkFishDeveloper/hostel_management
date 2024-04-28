

import { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import { useNavigate } from "react-router-dom";

const Allocations = () => {

    const navigate = useNavigate();
    const [roomNo,setRoomNo] = useState();
  const [hostelName,setRhostelName] = useState("");
  const [username,setusername] = useState("");
    const [booked,setBooked] = useState(false);
    const [loading,setLoading] = useState(false);
    const [statusm,setStatus] = useState(false);


    const handleBook = async()=>{
            let resp;
            setStatus(false);
            setLoading(true);
            try {
               resp = await axios.post(`${BACKEND_URL}/book-room`,{roomNo,hostelName,username});
              console.log(resp.data);
            //   alert(resp.data.message);
              setBooked(true);
              setStatus(true);
            //   navigate("/");
            } catch (error) {
              alert("Room is already booked !!");
            }
            finally{
                setLoading(false);
            }
          }

  return (
    <div className="bg-gray-700 h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-white h-[90%] w-[40%] rounded-xl ">
        <h2 className=" text-3xl font-bold underline text-pink-950 ml-6 m-3 hover:scale-105 transition" >HOSTEL MANAGEMENT ALLOCATIONS</h2>


        <div className="p-5">
  <p className="font-semibold text-xl">Fill details</p>

  <div className="flex flex-col items-center justify-center mt-6">
    <input
      type="number"
      className="w-50 h-10 px-2 py-1 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter number"
      onChange={(e)=>setRoomNo(Number(e.target.value))}
    />
    <input
      type="text"
      className="w-50 h-10 px-2 py-1 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter hostel name"
      onChange={(e)=>setRhostelName(e.target.value)}
    />
    <input
      type="text"
      className="w-50 h-10 px-2 py-1 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter username"
      onChange={(e)=>setusername(e.target.value)}
    />
  </div>
  <div className="flex justify-center items-center mt-2">
    <div className="w-40 h-10 bg-gray-400 rounded-lg flex justify-center items-center hover:scale-95 transition-all hover:bg-gray-600 cursor-pointer"
    onClick={handleBook}
    >
      Book it
    </div>
  </div>



  <div className="flex items-center justify-center mt-10">
  {loading && (
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
  )}
  </div>

  <div className={`flex items-center justify-center mt-10 rounded-xl h-[3rem] font-semibold ${statusm ? 'bg-green-400' : 'bg-red-400'}`}>
   {statusm ? " Booked ":" Not-booked "}
  </div>
</div>

        </div>

        </div>
  )
}

export default Allocations