import dayjs from 'dayjs';

const convertDateFormat = (date: Date | string) => {
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    throw new Error('변환할 수 없는 데이터 형식입니다.');
  }
  return parsedDate.format('YYYY-MM-DD HH:mm');
};

export default convertDateFormat;
