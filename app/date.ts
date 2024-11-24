import dayjs  from './dayjs';
import  { ConfigType } from 'dayjs';

const defaultLocale='fr';
export type Locale = 'fr' | 'en';
export const capitalizeFirstLetter = (word?: string) => {
    if (typeof word !== 'string') {
       return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
 };

 export enum DATE_FORMAT {
    LT = 'LT',
    LTS = 'LTS',
    DATE = 'LL',
    DATETIME = 'LLLL',
 }


// import dayjs from '@/utils/dayjs';
// import { ConfigType } from 'dayjs';

export const formatDate = (
   date: ConfigType,
   locale: Locale = defaultLocale,
   withHour = true,
) => {
   // This function should be used for converting ISO formatted dates to
   // the 'DD/MM/YYYY' or 'DD/MM/YYYY hh:mm:ss' format used everywhere on the project.
   if (!date || !dayjs(date).isValid()) {
      return '-';
   }

   const formatedDate = dayjs(date)
      .locale(locale)
      .format(withHour ? DATE_FORMAT.DATETIME : DATE_FORMAT.DATE);
   return locale == defaultLocale ? capitalizeFirstLetter(formatedDate) : formatedDate;
};

export const parseDate = (date: string, locale: Locale = defaultLocale) => {
   let parsedDate = dayjs(date);
   parsedDate = parsedDate.locale(locale);

   return parsedDate.isValid() ? parsedDate : dayjs(date);
};