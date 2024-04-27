import { useState } from 'react'
import axios from "axios";
// import './App.css'
import BACKEND_URL from './assets/BACKEND_URL';

function App() {
  //roomNo,hostelName,username
  const [roomNo,setRoomNo] = useState();
  const [hostelName,setRhostelName] = useState("");
  const [hostelfind,sethostelfind] = useState("");
  const [username,setusername] = useState("");
  const [occupancyStatus,setOccupancyStatus] = useState(0)
  const handleBook = async()=>{
    var resp;
    try {
       resp = await axios.post(`${BACKEND_URL}/book-room`,{roomNo,hostelName,username});
      console.log(resp.data);
      alert(resp.data.message);
    } catch (error) {
      alert(resp.data.message);
    }
  }
  console.log(occupancyStatus);
  return (
    <>
    <div>
    <input type="number" placeholder='Enter room no .' onChange={(e)=>setRoomNo(Number(e.target.value))}/>
    <input type="text" placeholder='Enter hostel name ' onChange={(e)=>setRhostelName(e.target.value)}/>
    <input type="text" placeholder='Enter username .' onChange={(e)=>setusername(e.target.value)}/>
    <button onClick={handleBook}>Book room</button>
    </div>
    <div><p>
      Check availabilty
      </p>
      <input type="text" placeholder='Enter hostel name' onChange={(e)=>sethostelfind(e.target.value)}/>
      <div>
    <label>
        <input
            type="radio"
            name="occupied"
            // value={1}
            checked={occupancyStatus === 1}
            onChange={(e) => setOccupancyStatus(e.target.value)}
            style={{ backgroundColor: occupancyStatus === 1 ? '#007bff' : 'transparent' }}
        />
        Occupied
    </label>
    <label>
        <input
            type="radio"
            name="occupied"
            // value={0}
            checked={occupancyStatus === 0}
            onChange={(e) => setOccupancyStatus(e.target.value)}
            style={{ backgroundColor: occupancyStatus === 0 ? '#007bff' : 'transparent' }}
        />
        Not Occupied
        <input
            type="radio"
            name="occupied"
            // value="s"
            checked={occupancyStatus !==0 ||occupancyStatus !==1}
            onChange={(e) => setOccupancyStatus(e.target.value)}
            style={{ backgroundColor: occupancyStatus === 0 ? '#007bff' : 'transparent' }}
        />
        Show all rooms
    </label>
</div>
      </div>
    </>
  )
}

export default App
