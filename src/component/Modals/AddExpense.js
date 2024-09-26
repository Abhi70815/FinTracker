import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import React from 'react'

const AddExpense = ({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,
})=>{

    const [form] = Form.useForm()
    
  return (
     <Modal
      style={{fontWeight: 600}}
      title="add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
     >
        <Form
          form={form}
          layout='vertical'
          onFinish={(value)=>{
            onFinish(value,"expense");
            form.resetFields();
          }}
        >
            <Form.Item
              style={{fontWeight:600}}
              label="Name"
              name="name"
              rules={[
                {
                    required:true,
                    message: "Please input the name of the transaction!"
                },
              ]}>

                <Input type='text' className='custom-input'/>
              </Form.Item>
              <Form.Item
              style={{fontWeight:600}}
              label="Amount"
              name="amount"
              rules={[
                {
                    required:true,
                    message: "Please input the expense amount!"
                },
              ]}>

                <Input type='number' className='custom-input'/>
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
              <Button type='primary' htmlType='submit'>Add Expense</Button>

        </Form>

     </Modal>
  )
}

export default AddExpense