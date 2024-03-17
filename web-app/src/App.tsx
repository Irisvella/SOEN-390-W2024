import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp.tsx";
import Login from "./components/Authentication/Login.tsx";
import MinApp from "./components/EditProfile/src/container/MinApp.tsx";
import DashboardUser from "./pages/DashboardUser.tsx";
import DashboardCompany from "./pages/DashboardCompany.tsx";
import Employeesinfo from "./pages/employeesinfo.jsx";

import "./App.css";
import Home from "./pages/Home.jsx";
import ManagementLanding from "./pages/ManagementLanding.jsx";
import CreateListingPage from "./pages/CreateListingPage.tsx";

import OpenRequestManagementPage from "./pages/OpenRequestManagementPage.tsx";
import RequestManagement from "./pages/RequestManagement.tsx";
import CreateRequestPage from "./pages/CreateRequestPage.tsx";
import NewManagementLanding from "./pages/NewManagementLanding.tsx";
import Addemployee from "./pages/addemployee.jsx";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

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
            <Route
              path="/OpenRequestManagementPage"
              element={<OpenRequestManagementPage />}
            />
            <Route path="/RequestManagement" element={<RequestManagement />} />
            <Route path="/CreateRequestPage" element={<CreateRequestPage />} />
            <Route
              path="/new-management-landing"
              element={<NewManagementLanding />}
            />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
