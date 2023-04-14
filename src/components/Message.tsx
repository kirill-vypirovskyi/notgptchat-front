import { FC, useContext } from 'react';
import classNames from 'classnames';
import { getTime } from '../functions/normalizeTime';
import { AuthContext } from './AuthContext';

type Props = {
  text: string,
  createdAt: string,
  username: string,
};

export const Message: FC<Props> = ({
  text,
  createdAt,
  username,
}) => {
  const { currentUser }: any = useContext(AuthContext);

  return (
    <div className={classNames(
      'Chat__message Message',
      { 'Message--active': currentUser.username === username },
    )}
    >
      <p className="Message__text">
        {text}
      </p>
      <span className="Message__time">{getTime(createdAt)}</span>
      <span className="Message__username">{username}</span>
    </div>
  );
};
