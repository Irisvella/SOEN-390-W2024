// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.js';
import Login from './components/Authentication/Login.js';
import ProfileDash from './components/ProfileDash.js';
import './App.css';
import Home from './pages/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        {/* You can add more routes here */}
        <Route path="/login" element={<Login />} /> 
         <Route path="/" element={<Home />} /> 
         <Route path="/ProfileDash" element={<ProfileDash />} /> 

      </Routes>
    </Router>
  );
}

export default App;
