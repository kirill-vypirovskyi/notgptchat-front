export const SignupSite = () => {
  return (
    <div className="SignupSite">
      <div className="SignupSite__container">
        <h2 className="SignupSite__title">Signup</h2>

        <form
          action="/"
          method="post"
          className="SignupSite__form Form"
        >
          <input
            type="email"
            className="SignupSite__email Form__input"
            placeholder="E-mail"
          />

          <input
            type="text"
            className="SignupSite__username Form__input"
            placeholder="Username"
          />

          <input
            type="password"
            className="SignupSite__password Form__input"
            placeholder="Password"
          />

          <input
            type="password"
            className="SignupSite__password-repeat Form__input"
            placeholder="Repeat password"
          />

          <button
            type="submit"
            className="SignupSite__submit Form__button"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
