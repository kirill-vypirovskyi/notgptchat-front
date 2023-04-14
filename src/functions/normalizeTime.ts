export const getTime = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.toLocaleTimeString('ua-UA').slice(0, 5)}`;
};
