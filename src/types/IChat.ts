export interface IChat {
  id: number,
  title: string,
  participants: number[],
}

export type ChatForChatsList = Pick<IChat, 'id' | 'title'>;
