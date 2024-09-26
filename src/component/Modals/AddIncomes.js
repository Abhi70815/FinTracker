import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const AddIncomes = ({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={(value) => {
          console.log(value);
          onFinish(value, "Income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type='text' className='custom-input' />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the income amount!",
            },
          ]}
        >
          <Input type='number' className='custom-input' />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the income date!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className='custom-input' />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag!",
            },
          ]}
        >
          <Select className='select-input-2'>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">FreeLance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Add Income</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncomes;