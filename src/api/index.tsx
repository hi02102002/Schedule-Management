import axios from 'axios';
import { BASE_API_URL } from 'constant';
import { ICourse, IRes, IRoom } from 'shared/types';

export const scheduleApis = {
   getRooms: (accessToken: string) => {
      return axios.get<IRoom[]>(`${BASE_API_URL}room`, {
         headers: {
            authorization: `Bearer ${accessToken}`,
         },
      });
   },
   addRoom: (roomName: string, capacity: number, accessToken: string) => {
      return axios.post<IRes<IRoom>>(
         `${BASE_API_URL}room/insert`,
         {
            roomName,
            capacity,
         },
         {
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         }
      );
   },
   getCourses: (accessToken: string) => {
      return axios.get<ICourse[]>(`${BASE_API_URL}course`, {
         headers: {
            authorization: `Bearer ${accessToken}`,
         },
      });
   },
   addCourse: (
      courseName: string,
      schedule: '1' | '2' | '3',
      amount: number,
      roomid: number,
      accessToken: string
   ) => {
      return axios.post<IRes<ICourse>>(
         `${BASE_API_URL}course/insert`,
         {
            courseName,
            schedule,
            amount,
            roomid,
         },
         {
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         }
      );
   },
   updateCourse: (
      courseId: number,
      accessToken: string,
      courseName?: string,
      schedule?: string,
      amount?: number,
      roomid?: number
   ) => {
      return axios.patch<IRes<ICourse>>(
         `${BASE_API_URL}course/${courseId}`,
         {
            courseName,
            schedule,
            amount,
            roomid,
         },
         {
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         }
      );
   },
   removeCourse: (id: number, accessToken: string) => {
      return axios.delete(`${BASE_API_URL}course/${id}`, {
         headers: {
            authorization: `Bearer ${accessToken}`,
         },
      });
   },
};