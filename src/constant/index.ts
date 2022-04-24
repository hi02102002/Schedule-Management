import {
   AiOutlineAppstore,
   AiOutlineBook,
   AiOutlineCalendar,
   AiOutlineSlack,
} from 'react-icons/ai';

export const SIDEBAR: {
   icon: any;
   path: string;
   name: string;
}[] = [
   {
      icon: AiOutlineAppstore,
      path: '/',
      name: 'Home',
   },
   {
      icon: AiOutlineSlack,
      path: '/room',
      name: 'Room',
   },
   {
      icon: AiOutlineBook,
      path: '/course',
      name: 'Course',
   },
   {
      icon: AiOutlineCalendar,
      path: '/calendar',
      name: 'Calendar',
   },
];

export const BASE_API_URL = 'https://lichhoc-app.herokuapp.com/api/';
