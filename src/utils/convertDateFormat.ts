import dayjs from 'dayjs';

const convertDateFormat = (date: Date | string) => {
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    throw new Error('날짜 형식이 아닙니다.');
  }
  return parsedDate.format('YYYY-MM-DD HH:mm');
};

export default convertDateFormat;
