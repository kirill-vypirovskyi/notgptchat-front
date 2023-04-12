import { useEffect, useState } from 'react';
import { chatService } from '../../services/chatService';

export const MainPage = () => {
  const [chats, setChats] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const chatsFromServer = await chatService.getAll();

      setChats(chatsFromServer);
    })();
  }, []);

  return (
    <>
      <div>Main Page</div>

      {chats.map((chat: any) => (
        <p key={chat.id}>{chat.title}</p>
      ))}
    </>
  );
};
