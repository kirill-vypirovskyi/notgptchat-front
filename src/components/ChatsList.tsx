import { useEffect, useState, FC } from 'react';
import { chatService } from '../services/chatService';
import { ChatForChatsList } from '../types/IChat';
import { ChatsListLink } from './ChatsListLink';

type Props = {
  onChatChange: (name: string) => void;
};

export const ChatsList:FC<Props> = ({ onChatChange }) => {
  const [chats, setChats] = useState<ChatForChatsList[]>([]);

  useEffect(() => {
    (async () => {
      const chatsFromServer = await chatService.getAll();

      setChats(chatsFromServer);
    })();
  }, []);

  return (
    <div className="ChatsList">
      {chats.map((chat) => (
        <ChatsListLink
          to={`/chats/${chat.id}`}
          key={chat.id}
          text={chat.title}
          onChatChange={onChatChange}
        />
      ))}
    </div>
  );
};
