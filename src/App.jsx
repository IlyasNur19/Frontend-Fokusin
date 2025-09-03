import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
      <div className="flex flex-col min-h-screen bg-base-100" data-theme="light">
        <Navbar />
        <main className="flex-grow container mx-auto p-4 pt-20 sm:flex sm:justify-center sm:items-center">
          <div className="flex justify-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;