import 'antd/dist/antd.min.css';
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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BusinessRegisterFinalStep from './pages/BusinessRegisterFinalStep';
import SpacePartner from './pages/SpacePartner';
import WorkingSpaceDetails from './pages/WorkingSpaceDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path='locations' element={<Locations />} />
          <Route path='locations/:id' element={<LocationDetails />} />
          <Route
            path='locations/:location_id/working-space/:working_space_id'
            element={<WorkingSpaceDetails />}
          />
          <Route path='business' element={<Business />} />
          <Route
            path='business/register'
            element={<BusinessRegisterFinalStep />}
          />
          <Route path='space-partner' element={<SpacePartner />} />
        </Route>
        <Route path='/create-booking/:id' element={<CreateBooking />} />
        <Route path='/verify-account' element={<VerifyAccount />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
