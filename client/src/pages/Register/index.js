import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { RegisterUser } from '../../services/userService';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await RegisterUser(user);

      if (response.success) {
        toast.success(response.message, {
          style: {
            background: 'green',
            color: '#fff',
          },
        });

        // clear form fields
        setUser({ name: '', email: '', password: '' });

        // navigate the user to the login screen
        navigate('/login');
      } else {
        toast.error(response.message, {
          style: {
            background: '#990000',
            color: '#fff',
          },
        });
      }

    } catch (error) {
      toast.success(error.message, {
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
            TREBLOGS - Register
          </h1>
          <input
            type='text'
            value={user.name}
            placeholder='Full Name'
            onChange={(evt) => setUser({ ...user, name: evt.target.value })}
          />
          <input
            type='email'
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
            title='Register'
            onClick={handleRegister}
            className='primary-contained-btn'
            disabled={
              user.name.length < 3 ||
              user.email.length < 3 ||
              user.password.length < 3
            }
          />

          <Link to='/login' className='text-primary text-center underline'>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
