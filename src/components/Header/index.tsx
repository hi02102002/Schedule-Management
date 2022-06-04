import { userSelector } from 'features/auth';
import { IMAGES } from 'images';
import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
   const user = useSelector(userSelector);
   return (
      <header className="flex items-center h-[60px] bg-white border fixed left-0 top-0 right-0 z-50">
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center ">
               <div className="w-[230px] px-4 flex items-center justify-center">
                  <div className="w-8 h-8 ">
                     <img src={IMAGES.Logo} alt="" />
                  </div>
               </div>
               <div className="text-xl font-medium px-4">
                  Schedule management
               </div>
            </div>
            <div className="px-4 text-base font-medium">{user?.fullName}</div>
         </div>
      </header>
   );
};

export default Header;
