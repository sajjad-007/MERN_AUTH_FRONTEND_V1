import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  const navigateTo = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async data => {
    setIsLoading(true);
    data.phoneNumber = `+880${data.phoneNumber}`;
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/register',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response?.data?.message);
      navigateTo(
        `/otp-verification/${response.data.email}/${response?.data.phoneNumber}`
      );
      // console.log(response.data.phoneNumber);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error from user registration', error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };
  if (isAuthenticated) {
    navigateTo('/');
  }
  return (
    <>
      <form
        className="auth-form"
        onSubmit={handleSubmit(data => handleRegister(data))}
      >
        <h2>Register</h2>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="fullName"
            required
            {...register('fullName')}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            {...register('email')}
          />
          <div>
            <span>+880</span>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              {...register('phoneNumber')}
            />
          </div>
          <input
            type="text"
            name="password"
            placeholder="Password"
            required
            {...register('password')}
          />
          <div className="verification-method">
            <p>Select Verification Method</p>
            <div className="wrapper">
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={'email'}
                  {...register('verificationMethod')}
                  required
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={'phone'}
                  {...register('verificationMethod')}
                  required
                />
                Phone
              </label>
            </div>
          </div>
        </div>
        {isLoading ? (
          <button>Please wait....</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  );
};

export default Register;
