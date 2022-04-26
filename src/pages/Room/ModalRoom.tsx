import { Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { userSelector } from 'features/auth';
import { addRoom } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useState } from 'react';
interface Props {
   isModalVisible: boolean;
   onCancel?: () => void;
   type: 'UPDATE' | 'ADD';
}
const ModalRoom: React.FC<Props> = (props) => {
   const [form] = useForm();
   const dispatch = useAppDispatch();
   const user = useAppSelector(userSelector);
   const [loading, setLoading] = useState<boolean>(false);
   return (
      //@ts-ignore
      <Modal
         visible={props.isModalVisible}
         onCancel={() => {
            form.resetFields();
            props.onCancel && props.onCancel();
         }}
         title={props.type === 'ADD' ? 'Add room' : 'Edit room'}
         okButtonProps={{
            htmlType: 'submit',
            loading: loading,
            className: '!bg-[#ff9b44] border-0 !text-white ',
         }}
         onOk={form.submit}
      >
         <Form
            layout="vertical"
            form={form}
            onFinish={async (values) => {
               setLoading(true);
               const action = await dispatch(
                  addRoom({
                     roomName: values.roomName,
                     capacity: +values.capacity,
                     accessToken: user?.accessToken as string,
                  })
               );
               if (addRoom.fulfilled.match(action)) {
                  setLoading(false);
                  message.success('Add room successfully');
                  form.resetFields();
                  props.onCancel && props.onCancel();
               }

               if (addRoom.rejected.match(action)) {
                  setLoading(false);
                  message.error('Error when add room. Try again!');
               }
            }}
            initialValues={{
               roomName: '',
               capacity: '20',
            }}
         >
            <Form.Item
               label="Room name"
               rules={[
                  {
                     required: true,
                     message: 'Please enter room name',
                  },
               ]}
               name="roomName"
            >
               <Input placeholder="Room name" />
            </Form.Item>
            <Form.Item
               label="Capacity"
               rules={[
                  {
                     required: true,
                     message: 'Please enter capacity',
                  },
               ]}
               name="capacity"
            >
               <Select>
                  <Select.Option value="20">20</Select.Option>
                  <Select.Option value="30">30</Select.Option>
                  <Select.Option value="40">40</Select.Option>
               </Select>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ModalRoom;
