import 'antd/dist/antd.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import CreateBooking from './pages/CreateBooking';
import Business from './pages/Business';
import VerifyAccount from './pages/VerifyAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path='locations' element={<Locations />} />
          <Route path='locations/details/:id' element={<LocationDetails />} />
          <Route path='business' element={<Business />} />
        </Route>
        <Route path='/create-booking/:id' element={<CreateBooking />} />
        <Route path='/verify-account' element={<VerifyAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
