import { httpClient } from '../http/httpClient';
import { ChatForChatsList } from '../types/IChat';

const getAll = (): Promise<ChatForChatsList[]> => {
  return httpClient.get('/chats');
};

export const chatService = { getAll };
