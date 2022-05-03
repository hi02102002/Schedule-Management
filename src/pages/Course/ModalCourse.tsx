import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { userSelector } from 'features/auth';
import { addCourse, editCourse } from 'features/course';
import { roomsSelector } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { ICourse } from 'shared/types';
interface Props {
   isModalVisible: boolean;
   onCancel?: () => void;
   type: 'UPDATE' | 'ADD';
   value?: ICourse | null;
}
const ModalCourse: React.FC<Props> = (props) => {
   const [form] = useForm();
   const dispatch = useAppDispatch();
   const user = useAppSelector(userSelector);
   const [loading, setLoading] = useState<boolean>(false);
   const { rooms } = useAppSelector(roomsSelector);
   const [roomSelect, setRoomSelect] = useState<string>(
      props.value?.roomid.toString() || ''
   );

   const [capacityRoom, setCapacityRoom] = useState<number>(1);

   useEffect(() => {
      if (roomSelect.trim().length > 0) {
         const capacity = rooms.find(
            (_room) => _room.id === +roomSelect
         )?.capacity;

         if (capacity) {
            setCapacityRoom(capacity);
         }
      }
   }, [roomSelect, rooms]);

   return (
      //@ts-ignore
      <Modal
         visible={props.isModalVisible}
         onCancel={() => {
            form.resetFields();
            setCapacityRoom(1);
            setRoomSelect('');
            props.onCancel && props.onCancel();
         }}
         title="Add course"
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
               if (props.type === 'ADD') {
                  setLoading(true);
                  const action = await dispatch(
                     addCourse({
                        courseName: values.courseName,
                        roomid: +values.roomid,
                        amount: +values.amount,
                        schedule: values.schedule,
                        accessToken: user?.accessToken as string,
                        duration: +values.duration,
                     })
                  );
                  if (addCourse.fulfilled.match(action)) {
                     setLoading(false);
                     message.success('Add course successfully');
                     form.resetFields();
                     setCapacityRoom(1);
                     setRoomSelect('');
                     props.onCancel && props.onCancel();
                  }

                  if (addCourse.rejected.match(action)) {
                     setLoading(false);
                     message.error('Error when add course. Try again!');
                  }
               }

               if (props.type === 'UPDATE') {
                  console.log(values);
                  setLoading(true);
                  const action = await dispatch(
                     editCourse({
                        courseId: props.value?.id as number,
                        accessToken: user?.accessToken as string,
                        ...values,
                        roomid: +values.roomid,
                     })
                  );

                  if (editCourse.fulfilled.match(action)) {
                     setLoading(false);
                     message.success('Update course successfully');
                     form.resetFields();
                     setCapacityRoom(1);
                     setRoomSelect('');
                     props.onCancel && props.onCancel();
                  }

                  if (editCourse.rejected.match(action)) {
                     setLoading(false);
                     message.error('Error when add course. Try again!');
                  }
               }
            }}
            initialValues={{
               courseName: props.value?.courseName || '',
               schedule: props.value?.schedule || '1',
               amount: props.value?.amount || 1,
               roomid: props.value?.roomid || '',
               duration: props.value?.duration || '2',
            }}
         >
            <Form.Item
               label="Course name"
               rules={[
                  {
                     required: true,
                     message: 'Please enter course name',
                  },
               ]}
               name="courseName"
            >
               <Input placeholder="Course name" />
            </Form.Item>

            <Form.Item
               label="Schedule"
               rules={[
                  {
                     required: true,
                     message: 'Please enter schedule',
                  },
               ]}
               name="schedule"
            >
               <Select>
                  <Select.Option value="1">2-4-6</Select.Option>
                  <Select.Option value="2">3-5-7</Select.Option>
                  <Select.Option value="3">Full week</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label="Duration"
               rules={[
                  {
                     required: true,
                     message: 'Please enter duration',
                  },
               ]}
               name="duration"
            >
               <Select>
                  <Select.Option value="2">2 week</Select.Option>
                  <Select.Option value="3">3 week</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item
               label="Room"
               rules={[
                  {
                     required: true,
                     message: 'Please enter room',
                  },
               ]}
               name="roomid"
            >
               <Select
                  onChange={(value) => {
                     setRoomSelect(value);
                  }}
                  value={roomSelect}
               >
                  {rooms.map((_room) => {
                     return (
                        <Select.Option
                           key={_room.id}
                           value={_room.id.toString()}
                        >
                           {_room.roomName}
                        </Select.Option>
                     );
                  })}
               </Select>
            </Form.Item>
            {(roomSelect.trim().length > 0 || props.value?.roomid) && (
               <Form.Item
                  label={`Amount (Max: ${capacityRoom})`}
                  rules={[
                     {
                        required: true,
                        message: 'Please enter amount',
                     },
                  ]}
                  name="amount"
               >
                  <InputNumber
                     placeholder="Amount"
                     min={1}
                     max={capacityRoom}
                     step={1}
                     className="w-full"
                  />
               </Form.Item>
            )}
         </Form>
      </Modal>
   );
};

export default ModalCourse;
