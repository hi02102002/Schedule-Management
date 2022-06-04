import {
   DatePicker,
   Form,
   Input,
   InputNumber,
   message,
   Modal,
   Select,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { userSelector } from 'features/auth';
import { addCourse, editCourse } from 'features/course';
import { useAppDispatch, useAppSelector } from 'hooks';
import moment from 'moment';
import React, { useState } from 'react';
import { ICourse } from 'shared/types';

const covertDate = (date: Date): string => {
   const _date = date.getDate();
   const _year = date.getFullYear();
   const _month = date.getMonth() + 1;

   return `${_year}-${_month >= 10 ? _month : `0${_month}`}-${
      _date >= 10 ? _date : `0${_date}`
   }`;
};

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
   const [capacityRoom, setCapacityRoom] = useState<number>(15);

   return (
      //@ts-ignore
      <Modal
         visible={props.isModalVisible}
         onCancel={() => {
            form.resetFields();
            setCapacityRoom(1);
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
               const dateStart = moment(values.dateStart).toDate();
               const dateEnd = new Date(dateStart);
               dateEnd.setDate(
                  moment(values.dateStart).toDate().getDate() +
                     +values.duration * 7
               );
               console.log({ dateStart, dateEnd: dateEnd.toDateString() });
               if (props.type === 'ADD') {
                  setLoading(true);
                  const action = await dispatch(
                     addCourse({
                        courseName: values.courseName,
                        amount: +values.amount,
                        schedule: values.schedule,
                        accessToken: user?.accessToken as string,
                        startDate: covertDate(dateStart),
                        endDate: covertDate(dateEnd),
                     })
                  );
                  if (addCourse.fulfilled.match(action)) {
                     setLoading(false);
                     message.success('Add course successfully');
                     form.resetFields();
                     setCapacityRoom(1);
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
                     })
                  );

                  if (editCourse.fulfilled.match(action)) {
                     setLoading(false);
                     message.success('Update course successfully');
                     form.resetFields();
                     setCapacityRoom(1);
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
               duration: '2',
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
            <Form.Item label="Date start" name="dateStart">
               <DatePicker
                  className="w-full"
                  disabledDate={(current) =>
                     current.isBefore(moment().subtract(1, 'day'))
                  }
               />
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
               label={`Amount (Max: 40)`}
               rules={[
                  {
                     required: true,
                     message: 'Please enter amount',
                  },
                  {
                     type: 'number',
                     max: 40,
                     message: 'Amount must less than 40',
                  },
               ]}
               name="amount"
            >
               <InputNumber
                  placeholder="Amount"
                  min={0}
                  max={40}
                  step={1}
                  value={capacityRoom}
                  onChange={(value) => {
                     setCapacityRoom(value);
                  }}
                  className="w-full"
               />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ModalCourse;
