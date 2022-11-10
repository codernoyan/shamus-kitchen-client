import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
      </div>
    )
  };

  if (user && user.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;