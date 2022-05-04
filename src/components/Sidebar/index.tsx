import { SIDEBAR } from 'constant';
import { logout } from 'features/auth';
import { useAppDispatch } from 'hooks';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
   const dispatch = useAppDispatch();
   return (
      <aside className="w-[230px] h-[calc(100vh_-_60px)] border border-t-0">
         <div className="py-2">
            <ul className="flex flex-col">
               {SIDEBAR.map((item) => {
                  return (
                     <li
                        key={item.name}
                        className="mb-1 last:mb-0 flex items-center w-full"
                     >
                        <NavLink
                           to={item.path}
                           className={({ isActive }) => {
                              return `flex items-center gap-x-4 w-full py-2 px-4  hover:!text-[#ff9b44] ${
                                 isActive ? 'bg-slate-50 text-[#ff9b44] ' : ''
                              }`;
                           }}
                        >
                           <item.icon className="w-6 h-6" />
                           <p className="leading-[1] text-lg font-medium">
                              {item.name}
                           </p>
                        </NavLink>
                     </li>
                  );
               })}
               <li
                  className="mb-1 last:mb-0 flex items-center w-full gap-x-4  py-2 px-4  hover:!text-[#ff9b44] cursor-pointer"
                  onClick={() => {
                     dispatch(logout());
                  }}
               >
                  <div>
                     <AiOutlineLogout className="w-6 h-6" />
                  </div>
                  <p className="leading-[1] text-lg font-medium">Logout</p>
               </li>
            </ul>
         </div>
      </aside>
   );
};

export default Sidebar;
