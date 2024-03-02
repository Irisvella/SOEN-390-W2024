// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';
import DashboardUser from './pages/DashboardUser.tsx';
import DashboardCompany from './pages/DashboardCompany.tsx';
import Addemployee from './pages/addemployee.jsx';
import Employeesinfo from './pages/employeesinfo.jsx';
import './App.css';
import Home from './pages/Home.jsx';
import ManagementLanding from './pages/ManagementLanding.jsx';
import CreateListingPage from './pages/CreateListingPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        {/* You can add more routes here */}
        <Route path="/login" element={<Login />} /> 
         <Route path="/" element={<Home />} /> 
         <Route path="/CreateListingPage" element={<CreateListingPage />} /> 
         <Route path="/ManagementLanding" element={<ManagementLanding />} />
         <Route path="/ProfileDash" element={<MinApp />} /> 

         <Route path="/dashboard-user" element={<DashboardUser />} />
         <Route path="/dashboard-company" element={<DashboardCompany />} />

         <Route path="/Employeesinfo" element={<Employeesinfo/>} /> 
         <Route path="/Addemployee" element={<Addemployee />} /> 
          
      </Routes>
    </Router>
  );
}

export default App;