import classNames from 'classnames';
import {
  ChangeEvent, FormEvent, useContext, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailErrors, PasswordErrors } from '../../types/FieldErrors';
import { isEmailValid } from '../../functions/validateForm';
import { AuthContext } from '../../components/AuthContext';

export const LoginPage = () => {
  const [emailQuery, setEmailQuery] = useState('');
  const [passwordQuery, setPasswordQuery] = useState('');
  const [
    emailQueryError, setEmailQueryError,
  ] = useState(EmailErrors.NONE);
  const [
    passwordQueryError, setPasswordQueryError,
  ] = useState(PasswordErrors.NONE);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login }: any = useContext(AuthContext);

  const validateEmail = () => {
    let valid = true;

    if (!isEmailValid(emailQuery)) {
      setEmailQueryError(EmailErrors.INVALID);
      valid = false;
    }

    if (!emailQuery) {
      setEmailQueryError(EmailErrors.EMPTY);
      valid = false;
    }

    return valid;
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailQueryError(EmailErrors.NONE);
    setEmailQuery(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordQueryError(PasswordErrors.NONE);
    setPasswordQuery(event.target.value);
  };

  const submitForm = async () => {
    const user = {
      email: emailQuery,
      password: passwordQuery,
    };

    setIsLoading(true);

    try {
      await login(user);
      navigate('/main');
    } catch (error) {
      window.console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailQueryError(EmailErrors.NONE);
    setPasswordQueryError(PasswordErrors.NONE);

    const emailValid = validateEmail();

    if (emailValid) {
      submitForm();
    }
  };

  return (
    <div className="LoginSite">
      <div className="LoginSite__container">
        <h2 className="LoginSite__title">Login</h2>

        <form
          action="/"
          method="post"
          className="LoginSite__form Form"
          onSubmit={handleSubmit}
        >
          <div className="From__input-container">
            <input
              type="text"
              className={classNames(
                'SignupSite__email Form__input',
                { 'Form__input--error': emailQueryError !== EmailErrors.NONE },
              )}
              placeholder="E-mail"
              value={emailQuery}
              onChange={handleEmail}
              onBlur={validateEmail}
            />

            <p
              className={classNames(
                'Form__input-error-text',
                {
                  'Form__input-error-text--invisible':
                  emailQueryError === EmailErrors.NONE,
                },
              )}
            >
              {emailQueryError}
            </p>
          </div>

          <div className="From__input-container">
            <input
              type="password"
              className={classNames(
                'SignupSite__password Form__input',
                {
                  'Form__input--error':
                    passwordQueryError !== PasswordErrors.NONE,
                },
              )}
              placeholder="Password"
              value={passwordQuery}
              onChange={handlePassword}
            />

            <p className={classNames(
              'Form__input-error-text',
              {
                'Form__input-error-text--invisible':
                  passwordQueryError === PasswordErrors.NONE,
              },
            )}
            >
              {passwordQueryError}
            </p>
          </div>

          <button
            type="submit"
            className={classNames(
              'LoginPage__submit Form__button',
              { 'Form__button--loading': isLoading },
            )}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
