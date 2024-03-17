import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';
import DashboardUser from '../../web-app/src/Pages/DashboardUser.tsx';
import DashboardCompany from '../../web-app/src/Pages/DashboardCompany.tsx';
import Employeesinfo from '../../web-app/src/Pages/employeesinfo.jsx';
import Addemployee from '../../web-app/src/Pages/addemployee.jsx';
import './App.css';
import Home from '../../web-app/src/Pages/Home.jsx';
import ManagementLanding from '../../web-app/src/Pages/ManagementLanding.jsx';
import CreateListingPage from '../../web-app/src/Pages/CreateListingPage.tsx';
import OpenRequestManagementPage from '../../web-app/src/Pages/OpenRequestManagementPage.tsx';

import RequestManagement from '../../web-app/src/Pages/RequestManagement.tsx';
import CreateRequestPage from '../../web-app/src/Pages/CreateRequestPage.tsx';
import NewManagementLanding from '../../web-app/src/Pages/NewManagementLanding.tsx';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        

        {/* Use the PrivateRoute directly for the protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/CreateListingPage" element={<CreateListingPage />} />
            <Route path="/ManagementLanding" element={<ManagementLanding />} />
            <Route path="/ProfileDash" element={<MinApp />} />
            <Route path="/dashboard-user" element={<DashboardUser />} />
            <Route path="/dashboard-company" element={<DashboardCompany />} />
            <Route path="/Employeesinfo" element={<Employeesinfo />} />
            <Route path="/Addemployee" element={<Addemployee />} />
            <Route path="/OpenRequestManagementPage" element={<OpenRequestManagementPage />} />
            <Route path="/RequestManagement" element={<RequestManagement />} />
            <Route path="/CreateRequestPage" element={<CreateRequestPage />} />
            <Route path="/new-management-landing" element={<NewManagementLanding />} />
            
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
