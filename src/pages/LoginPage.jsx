import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(formData);
    navigate('/');
  } catch (err) {
    const message = err.response?.data?.message || 'Terjadi kesalahan saat login';
    toast.error(message); 
  }
};

  return (
    <div className="card w-full max-w-sm sm:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <img src="/src/assets/logo.png" className=" m-10" alt="" />
        
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
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
            <label className="label">
              <span className="label-text">Password</span>
            </label>
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            Belum punya akun?{" "}
            <Link to="/register" className="link link-primary">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
