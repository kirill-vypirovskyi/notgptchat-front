import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header__logo">NotGPTChat</h1>

      <div className="Header__buttons">
        <Link className="Header__button" to="login">Login</Link>
        <Link className="Header__button" to="signup">Signup</Link>
      </div>
    </header>
  );
};
