const todayTimestamp = new Date();

const year = todayTimestamp.getUTCFullYear();

const month = todayTimestamp.getMonth() + 1;

const formatMonth = (month: number) => {
  return month < 10 ? "0" + month : month;
};

export const date = () => `${year}-${formatMonth(month)}`;
