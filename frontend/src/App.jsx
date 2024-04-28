
import { Routes,BrowserRouter,Route } from 'react-router-dom'
import Home from './screens/Home';
import Viewhostels from './screens/Viewhostels';
import CurrentAvailabilty from './screens/CurrentAvailabilty';
import Allocations from './screens/Allocations';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/view-hostels" element={<Viewhostels />}></Route>
        <Route path="/current-availability" element={<CurrentAvailabilty />}></Route>
        <Route path="/allocate" element={<Allocations />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App


