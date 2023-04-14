import { httpClient } from '../http/httpClient';
import { IMessage } from '../types/IMessage';

const getChatMessages = (chatId: number): Promise<IMessage[]> => {
  return httpClient.get(`/messages/${chatId}`);
};

const addMessage = (chatId: number, messageData: Partial<IMessage>) => {
  return httpClient.post(`/messages/${chatId}`, messageData);
};

export const messageService = { getChatMessages, addMessage };
