import { useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const NewTask = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add New Task"
      okText="Create Task"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="new_task_form">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please input the title of the task!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of the task!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please select the department!" }]}
        >
          <Select>
            <Option value="IT">Information Technology Department</Option>
            <Option value="HR">Human Resources Department</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: "Please select the assignee!" }]}
        >
          <Select>
            <Option value="dev">Software Dev - External Web Team</Option>
            <Option value="qa">QA Team</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTask;
