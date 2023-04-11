export const LoginSite = () => {
  return (
    <div className="LoginSite">
      <div className="LoginSite__container">
        <h2 className="LoginSite__title">Login</h2>

        <form
          action="/"
          method="post"
          className="LoginSite__form Form"
        >
          <input
            type="email"
            className="LoginSite__email Form__input"
            placeholder="E-mail"
          />

          <input
            type="password"
            className="LoginSite__password Form__input"
            placeholder="Password"
          />

          <button
            type="submit"
            className="LoginSite__submit Form__button"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
