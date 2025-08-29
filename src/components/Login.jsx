import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const handleLogIn = async data => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.message);
      console.log(response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigateTo('/');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div>
        <form
          className="auth-form"
          onSubmit={handleSubmit(data => handleLogIn(data))}
        >
          <h2 className="mb-2 ">Login</h2>
          <div className="mt-2 ">
            <input
              type="text"
              placeholder="Email"
              required
              {...register('email')}
            />
            <input
              type="password"
              placeholder="Password"
              required
              {...register('password')}
            />
          </div>
          <p className="forgot-password">
            <Link to={'/password/forgot'}>Forgot Password?</Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
