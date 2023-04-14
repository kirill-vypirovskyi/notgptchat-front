import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const Header = () => {
  const {
    currentUser,
    checkAuth,
    isChecked,
    logout,
  } : any = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="Header">
      <h1 className="Header__logo">NotGPTChat</h1>

      <div className="Header__buttons">
        {isChecked && (
          <>
            {!currentUser
              ? (
                <>
                  <Link className="Header__button" to="login">Login</Link>
                  <Link className="Header__button" to="signup">Signup</Link>
                </>
              ) : (
                <button
                  className="Header__dropdown"
                  type="button"
                  onClick={() => {
                    logout();
                  }}
                  aria-label="profile menu"
                >
                  {currentUser.username}
                </button>
              )}
          </>
        )}
      </div>
    </header>
  );
};
