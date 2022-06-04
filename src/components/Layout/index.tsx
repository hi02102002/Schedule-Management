import Header from 'components/Header';
import RequireAuth from 'components/RequireAuth';
import Sidebar from 'components/Sidebar';
import React from 'react';

interface Props {
   children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
   return (
      <RequireAuth>
         <div>
            <Header />
            <div className="flex h-[calc(100vh_-_60px)] ">
               <Sidebar />
               <main className="p-4 flex-1 ml-[230px]">{children}</main>
            </div>
         </div>
      </RequireAuth>
   );
};

export default Layout;
