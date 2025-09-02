import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // 1. State untuk menyimpan pesan error
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Bersihkan error sebelumnya
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      // 3. Tangkap dan tampilkan pesan error dari backend
      const message = err.response?.data?.message || 'Terjadi kesalahan saat login';
      setError(message);
      console.error(err.response?.data);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl">Login</h2>

        {/* 2. Tampilkan pesan error di sini */}
        {error && (
          <div role="alert" className="alert alert-error text-white text-sm mt-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={onChange} 
              required 
              className="input input-bordered" 
            />
          </div>
          <div className="form-control mt-4">
            <label className="label"><span className="label-text">Password</span></label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={onChange} 
              required 
              className="input input-bordered" 
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>Belum punya akun? <Link to="/register" className="link link-primary">Daftar di sini</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;