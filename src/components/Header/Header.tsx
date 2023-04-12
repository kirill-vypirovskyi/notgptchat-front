import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Loader } from '../Loader';

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

  // const navigate = useNavigate();

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
      </div>
    </header>
  );
};
