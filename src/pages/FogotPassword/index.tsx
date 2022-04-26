import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import { BASE_API_URL } from 'constant';
import { userSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import { IMAGES } from 'images';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
   const navigation = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);
   const user = useAppSelector(userSelector);

   useEffect(() => {
      if (user) {
         navigation('/', {
            replace: true,
         });
      }
   }, [user, navigation]);

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
               onFinish={async (values) => {
                  setLoading(true);
                  try {
                     await axios.post(
                        `${BASE_API_URL}auth/forgot-password`,
                        {
                           newPassword: values.newPassword,
                           confirmPassword: values.confirmPassword,
                        },
                        {
                           params: {
                              username: values.username,
                           },
                        }
                     );
                     setLoading(false);
                     message.success('Change password successfully');
                     navigation('/login');
                  } catch (error: any) {
                     setLoading(false);
                     console.dir(error.response.data.message);
                     message.error(error.response.data.message);
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
                  label="New password"
                  name="newPassword"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter password',
                     },
                     {
                        min: 8,
                        message: 'Password at least 8 letter',
                     },
                  ]}
                  className="mb-0"
               >
                  <Input type="password" />
               </Form.Item>
               <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                     {
                        required: true,
                        message: 'Please enter confirm password',
                     },
                     ({ getFieldValue }) => ({
                        validator(rule, value) {
                           if (
                              !value ||
                              getFieldValue('newPassword') === value
                           ) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              'The two passwords that you entered do not match!'
                           );
                        },
                     }),
                  ]}
                  className="mb-0"
               >
                  <Input type="password" />
               </Form.Item>
               <div className="flex items-center justify-end gap-4">
                  <Button
                     onClick={() => {
                        navigation(-1);
                     }}
                  >
                     Return
                  </Button>
                  <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-[#1890ff]"
                     loading={loading}
                  >
                     Change password
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default ForgotPassword;
