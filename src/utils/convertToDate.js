import { format } from 'date-fns';

export const convertToDate = (dateObj) => {
    const { year, month, day } = dateObj;
    const date = new Date(year, month - 1, day);
    return format(date, 'yyyy-MM-dd'); 
  };