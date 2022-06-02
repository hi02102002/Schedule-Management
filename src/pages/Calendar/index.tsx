import ACalendar from '@fullcalendar/react';
import Grid from '@fullcalendar/daygrid'; // a plugin!
import { scheduleApis } from 'api';
import { userSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { ICourse } from 'shared/types';

const dateOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const EVEN = '1';
const OOD = '2';
const FULL = '3';

const getEvent = (
   _course: ICourse,
   _roomName: string,
   _schedule: ICourse[]
) => {
   let events: Array<{
      title: string;
      date: string;
   }> = [];
   if (_course) {
      const dateStart = new Date(_course.startDate as string).getDate();
      const distanceDate =
         (new Date(_course.endDate).getTime() -
            new Date(_course.startDate).getTime()) /
         (1000 * 3600 * 24);
      for (let date = dateStart; date <= dateStart + distanceDate; date++) {
         const createdDate = new Date(_course?.startDate as string);
         createdDate.setDate(dateStart + (date - dateStart));
         const _date = dateOfWeek[createdDate.getDay()];
         const ev = {
            title: `Course ${_course?.courseName} || Room ${_roomName}`,
            date: createdDate.toISOString().split('T')[0],
         };
         if (_course.schedule === EVEN) {
            if (_date === 'T2' || _date === 'T4' || _date === 'T6') {
               events.push(ev);
            }
         }
         if (_course.schedule === OOD) {
            if (_date === 'T3' || _date === 'T5' || _date === 'T7') {
               events.push(ev);
            }
         }
         if (_course.schedule === FULL) {
            if (_date !== 'CN') {
               events.push(ev);
            }
         }
      }
   }

   return events;
};

const Calendar = () => {
   const user = useAppSelector(userSelector);
   const [evs, setEvs] = useState<any[]>([]);

   useEffect(() => {
      if (user) {
         scheduleApis
            .getSchedule(user.accessToken)
            .then(({ data: _schedules }) => {
               const events: any[] = [];

               for (let i = 0; i < _schedules.length; i++) {
                  const _schedule = _schedules[i];
                  if (_schedule.lichChan.length > 0) {
                     for (let _i = 0; _i < _schedule.lichChan.length; _i++) {
                        events.push(
                           getEvent(
                              _schedule.lichChan[_i],
                              _schedule.roomName,
                              _schedule.lichChan
                           )
                        );
                     }
                  }
                  if (_schedule.lichLe.length > 0) {
                     for (let _i = 0; _i < _schedule.lichLe.length; _i++) {
                        if (!(_schedule.lichLe[_i].schedule === '3')) {
                           events.push(
                              getEvent(
                                 _schedule.lichLe[_i],
                                 _schedule.roomName,
                                 _schedule.lichLe
                              )
                           );
                        }
                     }
                  }
               }

               console.log(events);

               setEvs(events.filter((_event) => _event !== undefined).flat());
            })
            .catch((error) => {
               console.log(error);
            });
      }
   }, [user]);

   return (
      <div>
         <ACalendar
            plugins={[Grid]}
            initialView="dayGridMonth"
            weekends={true}
            events={evs}
         />
      </div>
   );
};

export default React.memo(Calendar);
