import React from 'react';
import Logout from './Logout';

function requireAuth(Component) {
  console.log('This requires authorization');
  function RequireAuth(props) {
    const { auth } = props;
    console.log('Auth ==> ', auth);
    if (auth)
      return (
        <Component {...props} />
      );
    else {
      alert('You must be logged in to do this.');
      return (
        <Logout {...props} />
      );
    }
  }
  return RequireAuth;
}
export default requireAuth;