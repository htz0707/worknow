import 'antd/dist/antd.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import { AuthProvider } from './context/auth';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Invite from './pages/Invite';
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
import ForgetPassword from './pages/ForgetPassword';
import ForgetPasswordSent from './pages/ForgetPasswordSent';
import ResetPassword from './pages/ResetPassword';
import ReactGA from 'react-ga4';
import GuideCheck from './pages/GuideCheck';
import Contact from './pages/Contact';
import SignUpByInviteLink from './pages/SignUpByInviteLink';
import Orders from './pages/Orders';
import CompanyDetails from './pages/CompanyDetails';
import Companies from './pages/Companies';
import CreateSpaceProvider from './pages/CreateSpaceProvider';
import Vouchers from './pages/Vouchers';
import VoucherDetails from './pages/VoucherDetails';
import Topups from './pages/Topups';

ReactGA.initialize(process.env.REACT_APP_GA_ID);
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/admin/' element={<AdminLayout />}>
            <Route
              path='orders'
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path='companies'
              element={
                <PrivateRoute>
                  <Companies />
                </PrivateRoute>
              }
            />
            <Route
              path='company/new'
              element={
                <PrivateRoute>
                  <CreateCompany />
                </PrivateRoute>
              }
            />
            <Route
              path='company/:id'
              element={
                <PrivateRoute>
                  <CompanyDetails />
                </PrivateRoute>
              }
            />
            <Route
              path='company/:id/space-provider/new'
              element={
                <PrivateRoute>
                  <CreateSpaceProvider />
                </PrivateRoute>
              }
            />
            <Route
              path='vouchers'
              element={
                <PrivateRoute>
                  <Vouchers />
                </PrivateRoute>
              }
            />
            <Route
              path='vouchers/:id'
              element={
                <PrivateRoute>
                  <VoucherDetails />
                </PrivateRoute>
              }
            />
            <Route
              path='vouchers/:id'
              element={
                <PrivateRoute>
                  <VoucherDetails />
                </PrivateRoute>
              }
            />
            <Route
              path='topups'
              element={
                <PrivateRoute>
                  <Topups />
                </PrivateRoute>
              }
            />
          </Route>
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
              path='/user/invite'
              element={
                <PrivateRoute>
                  <Invite />
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
            <Route path='/faq' element={<GuideCheck />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route
            path='/create-booking/:location_id/:working_space_id'
            element={<CreateBooking />}
          />
          <Route
            path='/create-booking/payment/:location_id/:order_id'
            element={<BookingPayment />}
          />
          <Route path='/create-booking/status' element={<BookingStatus />} />
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
          <Route
            path='/:id'
            element={
              <PublicRoute>
                <SignUpByInviteLink />
              </PublicRoute>
            }
          />
          <Route
            path='forget-password'
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path='forget-password-sent'
            element={
              <PublicRoute>
                <ForgetPasswordSent />
              </PublicRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <PrivateRoute>
                <AdminOrders />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Sentry.withProfiler(App);
