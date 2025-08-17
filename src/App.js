import './App.css';
import {Navbar, NavbarV2, Footer} from './components'
import {Home,Profile,Item, Create,Login,Register, Settings, Forgot, Level, UserDashboardPage, MLMTree} from './pages'
import { Routes, Route, useLocation } from "react-router-dom";
import ItemList from './pages/demo/ItemList';
import Stake from './pages/stakes/Stake';
import BottomNav from './components/bottomnav/BottomNav';
import Earn from './pages/earn/Earn';
import UserDetails from './pages/user/UserDetails';
import Reservation from './pages/reservation/Reservation';
import DepositPage from './pages/deposit/DepositPage';
import NotificationList from './pages/notifications/NotificationList';
import ProtectedRoute from './components/ProtectedRoute';
import Members from './pages/user/members/Members';
import MemberContribution from './pages/user/contributiors/MemberContribution';
import Orders from './pages/user/orders/Orders';
import ReferralScreen from './pages/referral/ReferralScreen';
import WithdrawRequest from './pages/withdraw/WithdrawRequest';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot', '/tree'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <NavbarV2/>}

      {/* Apply top margin only if Navbar is visible */}
       <div style={{ marginTop: showNavbar ? '60px' : '0' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/tree" element={<MLMTree />} />

          
          <Route path="/members" element={<Members />} />
          <Route path="/contributions" element={<MemberContribution />} />          
          <Route path="/orders" element={<Orders />} />      
          <Route path="/referral" element={<ReferralScreen />} />
          <Route path="/withdraw" element={<WithdrawRequest />} />




          {/* Protected routes grouped under ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/stakes" element={<Stake />} />
            <Route path="/earn" element={<Earn />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/userDetails" element={<UserDetails />} />

            <Route path="/reservation" element={<Reservation />} />
            
            <Route path="/create" element={<Create /> } />
            {/* <Route path="/profile/:id" element={<Profile />} /> */}
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/forgot" element={ <Forgot />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/deposit" element={<DepositPage />} />

            <Route path="/level" element={<Level />} />
            {/* <Route path="/dashboard" element={<UserDashboardPage />} /> */}
            <Route path="/tree" element={<MLMTree />} />
            
            <Route path="/alerts" element={<NotificationList />} />
            

          </Route>         
        </Routes>
       </div>
       {/* <Footer/> */}
        {showNavbar && <BottomNav/>}
    </div>
  );
}

export default App;
