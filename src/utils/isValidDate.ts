import dayjs from 'dayjs';

const isValidDate = (date: string | Date) => {
  const format = 'YYYY-MM-DD HH:mm';
  if (date instanceof Date) {
    const formattedDate = dayjs(date).format(format);
    return dayjs(formattedDate, format, true).isValid();
  }

  return dayjs(date, format, true).isValid();
};

export default isValidDate;
