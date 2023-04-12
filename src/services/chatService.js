import { httpClient } from '../http/httpClient';

function getAll() {
  return httpClient.get('/chats');
}

export const chatService = { getAll };
