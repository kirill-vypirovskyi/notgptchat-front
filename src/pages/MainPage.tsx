import { useParams } from 'react-router';
import { useState } from 'react';
import { Chat } from '../components/Chat';
import { ChatsList } from '../components/ChatsList';

export const MainPage = () => {
  const { chatId } = useParams();
  const [currentChatName, setCurrentChatName] = useState('');

  return (
    <div className="MainPage">
      <ChatsList onChatChange={setCurrentChatName} />

      {chatId && (
        <Chat chatName={currentChatName} />
      )}

    </div>
  );
};
