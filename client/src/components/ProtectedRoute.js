import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { GetUser } from '../services/userService';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  // this function will be used to validate token
  const getUser = async () => {
    try {
      const response = await GetUser();

      if (response.success) {

        // set user state to user profile data
        setUser(response.data);

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

  useEffect(() => {
    // call getUser if there's a token in local storage
    if (localStorage.getItem('token')) {
      getUser();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user && <div>
    {user.name}<br />{user.email}
    {children}
  </div>;
};

export default ProtectedRoute;
