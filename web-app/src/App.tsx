import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';
import DashboardUser from './Pages/DashboardUser.tsx';
import DashboardCompany from './Pages/DashboardCompany.tsx';
import Employeesinfo from './Pages/employeesinfo.jsx';
import Addemployee from './Pages/addemployee.jsx';
import './App.css';
import Home from './Pages/Home.jsx';
import ManagementLanding from './Pages/ManagementLanding.jsx';
import CreateListingPage from './Pages/CreateListingPage.tsx';
import OpenRequestManagementPage from './Pages/OpenRequestManagementPage.tsx';

import RequestManagement from './Pages/RequestManagement.tsx';
import CreateRequestPage from './Pages/CreateRequestPage.tsx';
import NewManagementLanding from './Pages/NewManagementLanding.tsx';


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
