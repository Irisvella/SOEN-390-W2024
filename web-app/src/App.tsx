// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';

import './App.css';
import Home from './pages/Home.jsx';
import Employeesinfo from './pages/employeesinfo.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        {/* You can add more routes here */}
        <Route path="/login" element={<Login />} /> 
         <Route path="/" element={<Home />} /> 
         <Route path="/ProfileDash" element={<MinApp />} /> 
         <Route path="/Employeesinfo" element={<Employeesinfo/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
