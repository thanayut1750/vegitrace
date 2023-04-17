/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return (props) => {
    const router = useRouter();

    // write authentication logic here

    const isAuthenticated = () => {
      // Return true if the user is authenticated, false otherwise
      // For example, you can check for a valid JWT token, a session cookie, etc.
      return true;
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/');
      }
    }, []);

    return isAuthenticated() ? <Component {...props} /> : null;
  };
}
