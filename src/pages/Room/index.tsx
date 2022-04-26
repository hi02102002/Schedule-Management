import { Button, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { userSelector } from 'features/auth';
import { getRooms, roomsSelector } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { IRoom } from 'shared/types';
import ModalRoom from './ModalRoom';

const Room = () => {
   const { rooms } = useAppSelector(roomsSelector);
   const user = useAppSelector(userSelector);
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const [isModalVisible, setIsModalVisible] = useState(false);

   const columns: ColumnsType<IRoom> = [
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Name',
         dataIndex: 'roomName',
         key: 'roomName',
      },
      {
         title: 'Capacity',
         dataIndex: 'capacity',
         key: 'capacity',
      },
      {
         title: 'Action',
         dataIndex: 'action',
         render: () => {
            return (
               <div className="flex items-center gap-4">
                  <Button>Edit</Button>
                  <Button className="!bg-red-500 !border-0 !text-white">
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
         const handleGetRooms = async () => {
            setLoading(true);
            const action = await dispatch(getRooms(user.accessToken));
            if (getRooms.fulfilled.match(action)) {
               setLoading(false);
            }
            if (getRooms.rejected.match(action)) {
               setLoading(false);
            }
         };

         handleGetRooms();
      }
   }, [dispatch, user]);

   return (
      <div>
         <div className="mb-4 flex items-center justify-between">
            <Typography.Title level={3}>Room</Typography.Title>
            <Button
               className="!bg-[#ff9b44] !border-0 !text-white"
               onClick={() => {
                  setIsModalVisible(true);
               }}
            >
               Add room
            </Button>
         </div>
         <div>
            <Table
               dataSource={rooms}
               columns={columns}
               loading={loading}
               pagination={false}
            />
         </div>
         <ModalRoom
            onCancel={() => {
               setIsModalVisible(false);
            }}
            type="ADD"
            isModalVisible={isModalVisible}
         />
      </div>
   );
};

export default Room;
