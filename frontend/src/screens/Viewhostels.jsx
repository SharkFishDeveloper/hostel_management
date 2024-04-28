
import url1 from "../assets/hostelJ.jpg"
import url2 from "../assets/hostelE.jpg"
import url3 from "../assets/hostelB.jpg"
import url4 from "../assets/hostelO.jpg"

const Viewhostels = () => {
  return (
    <div className="bg-gray-700 h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex-col justify-center items-center h-[90%] bg-gray-100 w-[40%] rouded-md ">
        <h2 className=" text-3xl font-bold underline text-pink-950 ml-6 m-3 hover:scale-105 transition items-start mb-20" >HOSTEL MANAGEMENT</h2>
        <span className="p-6 text-pink-800">Available hostels</span>
        <div className="grid grid-cols-2 gap-4 mt-8 p-3">
        <div>
        <img src={url1} alt="Image 1" className="rounded-lg shadow-lg hover:scale-105 transition" />
        <p className="font-bold">Hostel J</p>
        </div>


         <div>
        <img src={url2} alt="Image 1" className="rounded-lg shadow-lg hover:scale-105 transition" />
        <p className="font-bold">Hostel B</p>
        </div>


         <div>
        <img src={url3} alt="Image 1" className="rounded-lg shadow-lg hover:scale-105 transition" />
        <p className="font-bold">Hostel E</p>
        </div>


         <div>
        <img src={url4} alt="Image 1" className="rounded-lg shadow-lg hover:scale-105 transition" />
        <p className="font-bold">Hostel O</p>
        </div>

      </div>
    </div>
   
    </div>
  )
}

export default Viewhostels