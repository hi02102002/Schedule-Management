import { Button, Form, Input, message, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { BASE_API_URL } from 'constant';
import { IMAGES } from 'images';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [form] = useForm();
   const navigate = useNavigate();
   return (
      <div className="h-screen  flex items-center justify-center bg-slate-100 flex-col gap-6 ">
         <img src={IMAGES.Logo} alt="" />
         <div className="bg-white p-8 rounded-lg w-full max-w-xl shadow">
            <Typography.Title className="!font-bold text-center">
               Signup
            </Typography.Title>
            <Form
               layout="vertical"
               className="flex flex-col gap-4"
               form={form}
               onFinish={async (values) => {
                  if (values.password.trim().length < 8) {
                     form.setFields([
                        {
                           name: 'password',
                           errors: ['Password at least 8 letter'],
                        },
                     ]);
                     return;
                  }
                  if (values.password !== values.confirmPassword) {
                     form.setFields([
                        {
                           name: 'confirmPassword',
                           errors: ["Password don't match"],
                        },
                     ]);
                     return;
                  }
                  try {
                     setLoading(true);
                     await axios.post(`${BASE_API_URL}auth/signup`, {
                        userName: values.username,
                        password: values.password,
                        fullName: values.fullName,
                        roles: ['admin'],
                     });
                     setLoading(false);
                     message.success('Registered successfully!');
                     navigate('/login');
                  } catch (error: any) {
                     setLoading(false);
                     message.error(error.response.data.message);
                  }
               }}
            >
               <Form.Item
                  label="Full name"
                  name="fullName"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter full name',
                     },
                  ]}
                  className="mb-0"
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter username',
                     },
                  ]}
                  className="mb-0"
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter password',
                     },
                  ]}
                  className="mb-0"
               >
                  <Input type="password" />
               </Form.Item>
               <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter confirm password',
                     },
                  ]}
                  className="mb-0"
               >
                  <Input type="password" />
               </Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full cursor-pointer !bg-gradient-to-r border-0 border-transparent from-[#ff9b44] to-[#fc6075] hover:bg-gradient-to-r flex items-center justify-center h-11"
                  loading={loading}
               >
                  Register
               </Button>
            </Form>
            <Typography.Text className="mt-4 block text-center">
               Already have an account? <Link to="/login">Login</Link>
            </Typography.Text>
         </div>
      </div>
   );
};

export default Signup;
