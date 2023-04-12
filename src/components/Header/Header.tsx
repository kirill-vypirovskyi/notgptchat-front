import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Loader } from '../Loader';

export const Header = () => {
  const { currentUser, checkAuth, isChecked }: any = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  const navigate = useNavigate();

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <header className="Header">
      <h1 className="Header__logo">NotGPTChat</h1>

      <div className="Header__buttons">
        {!currentUser
          ? (
            <>
              <Link className="Header__button" to="login">Login</Link>
              <Link className="Header__button" to="signup">Signup</Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate('123')}
              aria-label="log out"
            >
              LOGGED IN
            </button>
          )}
      </div>
    </header>
  );
};
