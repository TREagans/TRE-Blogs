import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/userService';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await loginUser(user);

      if (response.success) {

        // display success toast
        toast.success(response.message, {
          style: {
            background: 'green',
            color: '#fff',
          },
        });

        // clear form fields
        setUser({ email: '', password: '' });
      } else {
        toast.error(response.message, {
          style: {
            background: '#990000',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          background: '#990000',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className='bg-primary h-screen flex justify-center items-center'>
      <div className='bg-white p-5 w-[450px]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold text-center text-primary uppercase'>
            TREBLOGS - Login
          </h1>
          <input
            type='text'
            value={user.email}
            placeholder='Email Address'
            onChange={(evt) => setUser({ ...user, email: evt.target.value })}
          />
          <input
            type='password'
            value={user.password}
            placeholder='Password'
            onChange={(evt) => setUser({ ...user, password: evt.target.value })}
          />

          <Button
            title='Login'
            onClick={handleLogin}
            className='primary-contained-btn'
            disabled={user.email.length < 3 || user.password.length < 3}
          />

          <Link to='/register' className='text-primary text-center underline'>
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
