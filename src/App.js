import 'antd/dist/antd.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import { AuthProvider } from './context/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import CreateBooking from './pages/CreateBooking';
import Business from './pages/Business';
import VerifyAccount from './pages/VerifyAccount';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SpacePartner from './pages/SpacePartner';
import WorkingSpaceDetails from './pages/WorkingSpaceDetails';
import BookingPayment from './pages/BookingPayment';
import BookingStatus from './pages/BookingStatus';
import PublicRoute from './utils/PublicRoute';
import User from './pages/User';
import LocationsMap from './pages/LocationsMap';
import Rules from './pages/Rules';
import Privacy from './pages/Privacy';
import PrivateRoute from './utils/PrivateRoute';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';
import Voucher from './pages/Voucher';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';
import AdminOrders from './pages/AdminOrders';
import ListCompany from './pages/ListCompany';
import CreateCompany from './pages/CreateCompany';
import * as Sentry from '@sentry/react';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path='locations' element={<Locations />} />
            <Route path='locations/map' element={<LocationsMap />} />
            <Route path='locations/:id' element={<LocationDetails />} />
            <Route
              path='locations/:location_id/working-space/:working_space_id'
              element={<WorkingSpaceDetails />}
            />
            <Route path='business' element={<Business />} />
            <Route path='space-partner' element={<SpacePartner />} />
            <Route
              path='/user/profile'
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/user/history'
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route
              path='/user/voucher'
              element={
                <PrivateRoute>
                  <Voucher />
                </PrivateRoute>
              }
            />
            <Route
              path='/user/security'
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
            <Route path='/rules' element={<Rules />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route
            path='/create-booking/:location_id/:working_space_id'
            element={<CreateBooking />}
          />
          <Route
            path='/create-booking/payment/:location_id/:order_id'
            element={<BookingPayment />}
          />
          <Route
            path='/create-booking/status/:location_id/:order_id'
            element={<BookingStatus />}
          />
          <Route path='/verify-account' element={<VerifyAccount />} />
          <Route
            path='sign-in'
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path='sign-up'
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path='/admin/' element={<AdminLayout />}>
            <Route
              path='orders'
              element={
                <PrivateRoute>
                  <AdminOrders />
                </PrivateRoute>
              }
            />
            <Route
              path='space/companies'
              element={
                <PrivateRoute>
                  <ListCompany />
                </PrivateRoute>
              }
            />
            <Route
              path='space/company/new'
              element={
                <PrivateRoute>
                  <CreateCompany />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Sentry.withProfiler(App);
