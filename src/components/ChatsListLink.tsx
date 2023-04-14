import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  onChatChange: (name: string) => void;
};

export const ChatsListLink: FC<Props> = ({ to, text, onChatChange }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'ChatsList__button',
        { 'ChatsList__button--active': isActive },
      )}
      onClick={() => onChatChange(text)}
    >
      {text}
    </NavLink>
  );
};
