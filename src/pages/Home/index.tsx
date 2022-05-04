import { Typography } from 'antd';
import { scheduleApis } from 'api';
import { userSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import {
   AiOutlineApartment,
   AiOutlineCarryOut,
   AiOutlineFileSync,
   AiOutlineTable,
} from 'react-icons/ai';

const Home = () => {
   const user = useAppSelector(userSelector);
   const [home, setHome] = useState<any | null>(null);
   useEffect(() => {
      if (user?.accessToken) {
         scheduleApis.getHome(user.accessToken).then((value) => {
            console.log(value.data.data);
            setHome(value.data.data);
         });
      }
   }, [user?.accessToken]);

   console.log(home);

   return (
      <div className="h-full flex flex-col">
         <div className="mb-4">
            <Typography.Title level={3}>
               Welcome {user?.fullName}!
            </Typography.Title>
         </div>
         <div className="flex flex-1 ">
            <div className="flex gap-x-4 w-full items-start justify-center">
               <div className="rounded-lg p-4 w-full bg-[#ff9b44] text-white h-full max-h-64 flex items-center justify-center ">
                  <div className="w-full">
                     <Typography.Title
                        level={4}
                        className="!mb-4 text-center !text-white"
                     >
                        Course
                     </Typography.Title>
                     <div className="flex items-center gap-x-4">
                        <div className="flex flex-col gap-y-2 items-center text-center w-full         ">
                           <AiOutlineApartment className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Total: {home?.totalCourse}
                           </Typography.Text>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineFileSync className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Planing: {home?.planing}
                           </Typography.Text>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineCarryOut className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Planed: {home?.planed}
                           </Typography.Text>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="rounded-lg p-4 w-full bg-[#ff9b44] text-white h-full max-h-64 flex items-center justify-center ">
                  <div className="w-full">
                     <Typography.Title
                        level={4}
                        className="!mb-4 text-center !text-white"
                     >
                        Room
                     </Typography.Title>
                     <div className="flex items-center gap-x-4">
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineTable className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Total: {home?.totalRoom}
                           </Typography.Text>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineTable className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Room 20: {home?.room20}
                           </Typography.Text>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineTable className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Room 30: {home?.room30}
                           </Typography.Text>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center text-center w-full">
                           <AiOutlineTable className="w-6 h-6" />
                           <Typography.Text className="!text-inherit">
                              Room 40: {home?.room40}
                           </Typography.Text>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
