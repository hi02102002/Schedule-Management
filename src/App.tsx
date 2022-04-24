import Layout from 'components/Layout';
import { Home, Login, Signup } from 'pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
               path="/"
               element={
                  <Layout>
                     <Home />
                  </Layout>
               }
            />
         </Routes>
      </>
   );
}

export default App;
