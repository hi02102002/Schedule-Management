import { userSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{
   children?: React.ReactNode;
}> = ({ children }) => {
   const user = useAppSelector(userSelector);
   let location = useLocation();
   if (!user?.accessToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return <>{children}</>;
};

export default RequireAuth;
