/* eslint-disable no-console */
import { useParams } from 'react-router';
import {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  FC,
} from 'react';
import {
  ReactComponent as SettingsImage,
} from '../images/settings.svg';
import {
  ReactComponent as SendImage,
} from '../images/send.svg';
import { Message } from './Message';
import { IMessage } from '../types/IMessage';
import { messageService } from '../services/messageService';
import { AuthContext } from './AuthContext';

type Props = {
  chatName: string;
};

type DataLoderProps = {
  onData: (message: IMessage) => void;
};

const DataLoader: FC<DataLoderProps> = ({ onData }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:5000');

    socket.addEventListener('message', (event) => {
      console.log(event.data);

      const message = JSON.parse(event.data);

      onData(message);

      // socket.send('123');
    });

    socket.addEventListener('open', () => {
      console.log('ws connection opened');
    });

    return () => {
      socket.close();
    };
  }, []);

  return <h2>Chat name:</h2>;
};

export const Chat: FC<Props> = ({ chatName }) => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageQuery, setMessageQuery] = useState('');

  const { currentUser }: any = useContext(AuthContext);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAllMessages = async () => {
    const newMessages = await messageService.getChatMessages(Number(chatId));

    setMessages(newMessages);
  };

  const saveMessage = (message: IMessage) => {
    console.log('save message');

    setMessages(current => [message, ...current]);
  };

  useEffect(() => {
    scrollToBottomSmooth();
  }, [messages]);

  useEffect(() => {
    getAllMessages();
  }, [chatId]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage = {
      username: currentUser.username,
      chatId: Number(chatId),
      text: messageQuery,
    };

    try {
      await messageService.addMessage(Number(chatId), newMessage);

      setMessageQuery('');
    } catch (error) {
      window.console.log(error);
    } finally {
      getAllMessages();
    }
  };

  return (
    <div className="Chat">
      <div className="Chat__window">
        <div className="Chat__header">
          <DataLoader onData={saveMessage} />

          <h2 className="chat__title">
            {chatName}
          </h2>

          <button
            type="button"
            aria-label="settings"
            className="Chat__settings"
          >
            <SettingsImage />
          </button>
        </div>

        <div className="Chat__messages">
          {messages.map(message => {
            const {
              id,
              username,
              createdAt,
              text,
            } = message;

            return (
              <Message
                key={id}
                text={text}
                username={username}
                createdAt={createdAt}
              />
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <form
          action="/message"
          className="Chat__form"
          onSubmit={sendMessage}
        >
          <input
            className="Chat__form-input"
            type="text"
            placeholder="Type your message here..."
            value={messageQuery}
            onChange={(event) => setMessageQuery(event.target.value)}
          />
          <button
            className="Chat__form-button"
            type="submit"
          >
            <SendImage />
          </button>
        </form>
      </div>

      <div className="Chat__participants">
        <h3 className="Chat__participants-title">Participants</h3>

        <ul className="Chat__participants-list">
          <li>John Doe</li>
          <li>Johnathan Withverylognlastname</li>
        </ul>
      </div>
    </div>
  );
};
