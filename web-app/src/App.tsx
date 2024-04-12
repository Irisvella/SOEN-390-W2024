import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';
import DashboardUser from './pages/DashboardUser.tsx';
import DashboardCompany from './pages/DashboardCompany.tsx';
import Employeesinfo from './pages/employeesinfo.jsx';
import Addemployee from './pages/addemployee.jsx';
import './App.css';
import Home from './pages/Home.jsx';
import ManagementLanding from './pages/ManagementLanding.jsx';
import CreateListingForm from './components/CreateListingForm.tsx';
import EditListingForm from './components/EditListingForm.tsx';
import CreateRequestPage from './pages/CreateRequestPage.tsx';
import RequestManagement from './pages/RequestManagement.tsx';
import OpenRequestManagementPage from './pages/OpenRequestManagementPage.tsx';
import AddUnit from './pages/AddUnit.jsx';
import CreateBillRequest from './pages/CreateBillRequest.jsx';
import ManagementFinancialOverview from './pages/ManagementFinancialOverview.jsx';
import AddOperationalCost from './pages/AddOperationalCost.jsx';
import ReservationUser from './pages/ReservationUser.tsx';
import ReservationCompany from './pages/ReservationCompany.tsx';

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
            <Route path="/CreateListing" element={<CreateListingForm />} />
            <Route path="/EditListing/:propertyId" element={<EditListingForm />} />
            <Route path="/ManagementLanding" element={<ManagementLanding />} />
            <Route path="/ProfileDash" element={<MinApp />} />
            <Route path="/dashboard-user" element={<DashboardUser />} />
            <Route path="/dashboard-company" element={<DashboardCompany />} />
            <Route path="/Employeesinfo" element={<Employeesinfo />} />
            <Route path="/Addemployee" element={<Addemployee />} />
            <Route path="/CreateRequestPage" element={<CreateRequestPage />} />
            <Route path="/RequestManagement" element={<RequestManagement />} />
            <Route path="/OpenRequestManagementPage" element={<OpenRequestManagementPage />} />
            <Route path="/new-management-landing" element={<OpenRequestManagementPage />} />
            
            <Route path="/AddUnit" element={<AddUnit />} />
            <Route path="/createbillrequest" element={<CreateBillRequest/>} />
            <Route path="/ManagementFinancialOverview" element={<ManagementFinancialOverview/>} />
            <Route path="/AddOperationalCost" element={<AddOperationalCost/>} />
            <Route path="/ReservationUser" element={<ReservationUser/>} />
            <Route path="/ReservationCompany" element={<ReservationCompany/>} />

          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
