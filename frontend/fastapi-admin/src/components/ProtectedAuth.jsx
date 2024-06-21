import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAuth = ({ element: Element, token, user, ...rest }) => {
  return token && user?.is_superadmin ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedAuth;
