import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated, user, setUser] =
    useContext(Context);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  return <>
    <div className='auth-form'>
      
    </div>
  </>;
};

export default Login;
