import Layout from 'components/Layout';
import { Course, Home, Login, Room, Signup } from 'pages';
import ForgotPassword from 'pages/FogotPassword';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
               path="/"
               element={
                  <Layout>
                     <Home />
                  </Layout>
               }
            />
            <Route
               path="/room"
               element={
                  <Layout>
                     <Room />
                  </Layout>
               }
            />
            <Route
               path="/course"
               element={
                  <Layout>
                     <Course />
                  </Layout>
               }
            />
         </Routes>
      </>
   );
}

export default App;
