import { Button, message, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { userSelector } from 'features/auth';
import { coursesSelector, getCourses, removeCourse } from 'features/course';
import { getRooms, roomsSelector } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { ICourse } from 'shared/types';
import ModalCourse from './ModalCourse';

const Course = () => {
   const { courses } = useAppSelector(coursesSelector);
   const { rooms } = useAppSelector(roomsSelector);
   const user = useAppSelector(userSelector);
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
   const [valueUpdate, setValueUpdate] = useState<ICourse | null>(null);

   const columns: ColumnsType<ICourse> = [
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Name',
         dataIndex: 'courseName',
         key: 'courseName',
      },
      {
         title: 'Amount',
         dataIndex: 'amount',
         key: 'amount',
      },
      {
         title: 'Room name',
         dataIndex: 'roomName',
         key: 'roomName',
         render: (_, record) => {
            const roomName = rooms.find((_room) => _room.id === record.roomid);
            return roomName?.roomName;
         },
      },
      {
         title: 'Action',
         dataIndex: 'action',
         key: 'action',
         render: (_, record) => {
            return (
               <div className="flex items-center gap-4">
                  <Button
                     onClick={() => {
                        setIsModalVisibleUpdate(true);
                        setValueUpdate(record);
                     }}
                  >
                     Edit
                  </Button>
                  <Button
                     className="!bg-red-500 !border-0 !text-white"
                     onClick={async () => {
                        const action = await dispatch(
                           removeCourse({
                              id: record.id,
                              accessToken: user?.accessToken as string,
                           })
                        );

                        if (removeCourse.fulfilled.match(action)) {
                           message.success('Remove successfully');
                        }

                        if (removeCourse.rejected.match(action)) {
                           message.error('Have error when remove');
                        }
                     }}
                  >
                     Remove
                  </Button>
               </div>
            );
         },
         width: 240,
      },
   ];

   useEffect(() => {
      if (user) {
         const handleGetCourses = async () => {
            setLoading(true);
            const action = await dispatch(getCourses(user.accessToken));
            dispatch(getRooms(user.accessToken));
            if (getCourses.fulfilled.match(action)) {
               setLoading(false);
            }
            if (getCourses.rejected.match(action)) {
               setLoading(false);
            }
         };

         handleGetCourses();
      }
   }, [dispatch, user]);

   return (
      <div>
         <div className="mb-4 flex items-center justify-between">
            <Typography.Title level={3}>Course</Typography.Title>
            <Button
               className="!bg-[#ff9b44] !border-0 !text-white"
               onClick={() => {
                  setIsModalVisible(true);
               }}
            >
               Add course
            </Button>
         </div>
         <div>
            <Table
               dataSource={courses}
               columns={columns}
               loading={loading}
               pagination={false}
            />
         </div>
         {isModalVisible && (
            <ModalCourse
               isModalVisible={isModalVisible}
               onCancel={() => {
                  setIsModalVisible(false);
               }}
               type="ADD"
            />
         )}
         {isModalVisibleUpdate && (
            <ModalCourse
               isModalVisible={isModalVisibleUpdate}
               onCancel={() => {
                  setIsModalVisibleUpdate(false);
               }}
               type="UPDATE"
               value={valueUpdate}
            />
         )}
      </div>
   );
};

export default Course;
