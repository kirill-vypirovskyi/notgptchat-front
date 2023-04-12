import { ChangeEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import {
  EmailErrors,
  PasswordErrors,
  RepeatErrors,
  UsernameErrors,
} from '../../types/FieldErrors';
import { isEmailValid, isUsernameValid } from '../../functions/validateForm';
import { authService } from '../../services/authService';

export const SignupPage = () => {
  const [
    emailQuery, setEmailQuery,
  ] = useState('');
  const [
    emailQueryError, setEmailQueryError,
  ] = useState(EmailErrors.NONE);
  const [
    usernameQuery, setUsernameQuery,
  ] = useState('');
  const [
    usernameQueryError, setUsernameQueryError,
  ] = useState(UsernameErrors.NONE);
  const [
    passwordQuery, setPasswordQuery,
  ] = useState('');
  const [
    passwordQueryError, setPasswordQueryError,
  ] = useState(PasswordErrors.NONE);
  const [
    repeatQuery, setRepeatQuery,
  ] = useState('');
  const [
    repeatQueryError, setRepeatQueryError,
  ] = useState(RepeatErrors.NONE);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailQueryError(EmailErrors.NONE);
    setEmailQuery(event.target.value);
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameQueryError(UsernameErrors.NONE);
    setUsernameQuery(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordQueryError(PasswordErrors.NONE);
    setPasswordQuery(event.target.value);
  };

  const handleRepeat = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatQueryError(RepeatErrors.NONE);
    setRepeatQuery(event.target.value);
  };

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

  const validateUsername = () => {
    let valid = true;

    if (!usernameQuery) {
      setUsernameQueryError(UsernameErrors.EMPTY);
      valid = false;
    }

    if (!isUsernameValid(usernameQuery)) {
      setUsernameQueryError(UsernameErrors.INVALID);
      valid = false;
    }

    return valid;
  };

  const validatePassword = () => {
    let valid = true;

    if (!passwordQuery) {
      setPasswordQueryError(PasswordErrors.EMPTY);
      valid = false;
    }

    if (passwordQuery.length < 8) {
      setPasswordQueryError(PasswordErrors.SHORT);
      valid = false;
    }

    return valid;
  };

  const validateRepeat = () => {
    let valid = true;

    if (repeatQuery !== passwordQuery) {
      setRepeatQueryError(RepeatErrors.DIFFERENT);
      valid = false;
    }

    if (!repeatQuery) {
      setRepeatQueryError(RepeatErrors.EMPTY);
      valid = false;
    }

    return valid;
  };

  const submitForm = async () => {
    const user = {
      email: emailQuery,
      username: usernameQuery,
      password: passwordQuery,
    };

    setIsLoading(true);

    try {
      await authService.register(user);
      setIsRegistered(true);
    } catch (error) {
      window.console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailQueryError(EmailErrors.NONE);
    setUsernameQueryError(UsernameErrors.NONE);
    setPasswordQueryError(PasswordErrors.NONE);
    setRepeatQueryError(RepeatErrors.NONE);

    const emailValid = validateEmail();
    const usernameValid = validateUsername();
    const passwordValid = validatePassword();
    const repeatValid = validateRepeat();

    if (
      emailValid
      && usernameValid
      && passwordValid
      && repeatValid
    ) {
      submitForm();
    }
  };

  if (isRegistered) {
    return (
      <h2>Check your mail for activation link</h2>
    );
  }

  return (
    <div className="SignupSite">
      <div className="SignupSite__container">
        <h2 className="SignupSite__title">Signup</h2>

        <form
          action="/"
          method="post"
          className="SignupSite__form Form"
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
              type="text"
              className={classNames(
                'SignupSite__username Form__input',
                {
                  'Form__input--error':
                    usernameQueryError !== UsernameErrors.NONE,
                },
              )}
              placeholder="Username"
              value={usernameQuery}
              onChange={handleUsername}
              onBlur={validateUsername}
            />

            <p className={classNames(
              'Form__input-error-text',
              {
                'Form__input-error-text--invisible':
                  usernameQueryError === UsernameErrors.NONE,
              },
            )}
            >
              {usernameQueryError}
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
              onBlur={validatePassword}
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

          <div className="From__input-container">
            <input
              type="password"
              className={classNames(
                'SignupSite__password Form__input',
                {
                  'Form__input--error':
                    repeatQueryError !== RepeatErrors.NONE,
                },
              )}
              placeholder="Repeat password"
              value={repeatQuery}
              onChange={handleRepeat}
              onBlur={validateRepeat}
            />

            <p className={classNames(
              'Form__input-error-text',
              {
                'Form__input-error-text--invisible':
                  repeatQueryError === RepeatErrors.NONE,
              },
            )}
            >
              {repeatQueryError}
            </p>
          </div>

          <button
            type="submit"
            className={classNames(
              'SignupPage__submit Form__button',
              { 'Form__button--loading': isLoading },
            )}
            disabled={isLoading}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
