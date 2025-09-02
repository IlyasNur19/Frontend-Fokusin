import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Data yang dikirim:", formData);

      await register(formData);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
      console.error(err.response?.data);
    }
  };

  return (
    <div className="card w-full max-w-sm sm:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <img src="/logo.png" className=" m-10" alt="" />
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4">
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
              minLength="6"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="link link-primary">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
