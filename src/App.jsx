import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import background from './assets/background.png'; // Import background image
import Garden from './pages/Garden';
import Disease from './pages/Disease';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';import RegisterPage from './pages/Register';
;

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cover bg-center "
        style={{
          backgroundImage: `url(${background})`, 
          backgroundAttachment: 'fixed',
        }}>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/garden" element={<Garden/>} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/disease-detection" element={<Disease/>} />
          <Route path="/community" element={<Community/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
