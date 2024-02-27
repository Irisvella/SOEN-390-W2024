// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';

import './App.css';
import Home from './pages/Home.jsx';
import CreateListingPage from './pages/CreateListingPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        {/* You can add more routes here */}
        <Route path="/login" element={<Login />} /> 
         <Route path="/" element={<Home />} /> 
         <Route path="/ProfileDash" element={<MinApp />} /> 
         <Route path="/CreateListingPage" element={<CreateListingPage />} /> 

         
      </Routes>
    </Router>
  );
}

export default App;
