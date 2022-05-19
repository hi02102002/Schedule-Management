import { createAsyncThunk } from '@reduxjs/toolkit';
import { scheduleApis } from 'api';
import { ICourse } from 'shared/types';

export const getCourses = createAsyncThunk<ICourse[], string>(
   'room/getCourses',
   async (accessToken) => {
      const { data } = await scheduleApis.getCourses(accessToken);
      return data;
   }
);

export const addCourse = createAsyncThunk<
   ICourse,
   {
      courseName: string;
      schedule: '1' | '2' | '3';
      amount: number;
      accessToken: string;
      duration: number;
   },
   {
      rejectValue: string;
   }
>(
   'course/addCourse',
   async (
      { amount, courseName, schedule, accessToken, duration },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await scheduleApis.addCourse(
            courseName,
            schedule,
            amount,
            duration,
            accessToken
         );
         return data.data;
      } catch (error: any) {
         return rejectWithValue('');
      }
   }
);

export const editCourse = createAsyncThunk<
   ICourse,
   {
      courseId: number;
      accessToken: string;
      courseName?: string;
      schedule?: '1' | '2' | '3';
      amount?: number;
      roomid?: number;
   },
   {
      rejectValue: string;
   }
>(
   'course/editCourse',
   async (
      { amount, courseName, roomid, schedule, accessToken, courseId },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await scheduleApis.updateCourse(
            courseId,
            accessToken,
            courseName,
            schedule,
            amount,
            roomid
         );
         return data.data;
      } catch (error: any) {
         console.log(error);
         return rejectWithValue('');
      }
   }
);

export const removeCourse = createAsyncThunk<
   { id: number },
   {
      id: number;
      accessToken: string;
   }
>('course/removeCourse', async ({ accessToken, id }) => {
   await scheduleApis.removeCourse(id, accessToken);
   return {
      id,
   };
});
