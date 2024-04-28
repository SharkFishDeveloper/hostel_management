
import { useNavigate } from "react-router-dom"
import url from "../assets/thapr.jpg"


const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-700 h-screen w-screen flex flex-col justify-center items-center">
    <div className="bg-white h-[90%] w-[40%] rounded-xl">
      <h2 className=" text-3xl font-bold underline text-pink-950 ml-6 m-3 hover:scale-105 transition" >HOSTEL MANAGEMENT</h2>
      <p className="text-lg p-4 items-center">Welcome to our Hostel Management System, your one-stop solution for efficiently managing hostel operations. Our system offers a seamless experience for both hostel administrators and guests, ensuring smooth bookings and hassle-free check-ins.</p>

      <div className="flex-row space-x-12 m-9 items-center justify-center">
        <button className="bg-pink-900 rounded-lg h-[2rem] w-[8rem] p-1 text-sm hover:scale-105 transition text-white" onClick={()=>navigate("view-hostels")}>View hostels</button>
        <button className="bg-pink-900 rounded-lg h-[2rem] p-1  w-[8rem] text-sm
        hover:scale-105 transition text-white"  onClick={()=>navigate("current-availability")}>Current availability</button>
        <button className="bg-pink-900 rounded-lg h-[2rem] p-1  w-[8rem] text-sm
        hover:scale-105 transition text-white"  onClick={()=>navigate("allocate")}>Allocate now</button>
      </div>
        <img src={url} alt="Thapar image" className="rounded-xl mt-12" />
    </div>

  </div> 
  )
}

export default Home