import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { AuthContext } from '../components/AuthContext';

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { activate }: any = useContext(AuthContext);
  const { activationToken } = useParams();

  useEffect(() => {
    (() => {
      try {
        activate(activationToken);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Wrong activation link');
      } finally {
        setDone(true);
      }
    })();
  }, []);

  if (!done) {
    return <Loader />;
  }

  return (
    <div className="AccountActivationPage">
      <h2 className="AccountActivationPage__title">Account activation</h2>

      {error ? (
        <p className="AccountActivationPage__error">
          {error}
        </p>
      ) : (
        <>
          <p className="AccountActivationPage__success">
            Your account is now active
          </p>

          <Link to="/chats">Go to chats</Link>
        </>
      )}
    </div>
  );
};
