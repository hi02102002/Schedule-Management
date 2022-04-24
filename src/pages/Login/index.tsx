import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

const Login = () => {
   return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-100 shadow-sm">
         <div className="bg-white p-8 rounded-lg">
            <Typography.Title className="!font-bold">
               Quản lí khóa học
            </Typography.Title>
            <Form layout="vertical">
               <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[
                     {
                        required: true,
                        message: 'Tên đăng nhập không được để trống.',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Mật khẩu không được để trống.',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Button type="primary" htmlType="submit">
                  Đăng nhập
               </Button>
            </Form>
         </div>
      </div>
   );
};

export default Login;
