import { Button, Form, Input, message, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { login, userSelector } from 'features/auth';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IMAGES } from 'images';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const [form] = useForm();
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const navigate = useNavigate();
   const user = useAppSelector(userSelector);

   useEffect(() => {
      if (user?.accessToken) {
         navigate('/', {
            replace: true,
         });
      }
   }, [user?.accessToken, navigate]);

   return (
      <div className="h-screen  flex items-center justify-center bg-slate-100 flex-col gap-6 ">
         <img src={IMAGES.Logo} alt="" />
         <div className="bg-white p-8 rounded-lg w-full max-w-xl shadow">
            <Typography.Title className="!font-bold text-center">
               Login
            </Typography.Title>
            <Form
               layout="vertical"
               className="flex flex-col gap-4"
               form={form}
               onFinish={async (values) => {
                  setLoading(true);
                  const action = await dispatch(
                     login({
                        userName: values.username,
                        password: values.password,
                     })
                  );
                  if (login.fulfilled.match(action)) {
                     setLoading(false);
                     message.success('Login successfully!');
                     form.resetFields();
                  }

                  if (login.rejected.match(action)) {
                     setLoading(false);
                     message.error(action.payload);
                  }
               }}
            >
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
               <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full cursor-pointer !bg-gradient-to-r border-0 border-transparent from-[#ff9b44] to-[#fc6075] hover:bg-gradient-to-r flex items-center justify-center h-11"
                  loading={loading}
               >
                  Login
               </Button>
            </Form>
            <Typography.Text className="mt-4 block text-center">
               Don't have an account yet? <Link to="/signup">Register</Link>
            </Typography.Text>
         </div>
      </div>
   );
};

export default Login;
