import { SIDEBAR } from 'constant';
import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
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
                           className={(isActive) =>
                              `flex items-center gap-x-4 w-full py-2 px-4 ${
                                 isActive
                                    ? 'bg-slate-50 text-[#ff9b44] hover:text-[#ff9b44]'
                                    : ''
                              }`
                           }
                        >
                           <item.icon className="w-6 h-6" />
                           <p className="leading-[1] text-lg font-medium">
                              {item.name}
                           </p>
                        </NavLink>
                     </li>
                  );
               })}
            </ul>
         </div>
      </aside>
   );
};

export default Sidebar;
