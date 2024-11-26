import React, { useState } from "react";
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Select,
  Input,
  Button,
  Form,
  List,
  Avatar,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, updateStatus } from "../../store/tasksSlice";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TaskDetails = () => {
  const { id } = useParams(); // Fetch task ID from URL params
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const task = tasks.find((t) => t.number === id || t.title === id); // Find task by ID or title

  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(task.status || "Open");

  if (!task) {
    return <div>Task not found!</div>;
  }

  const handlePostUpdate = () => {
    if (comment.trim()) {
      dispatch(
        addComment({
          taskId: task.key,
          comment: {
            author: "Current User", // Replace with actual user data
            timestamp: new Date().toLocaleString(),
            content: comment,
          },
        })
      );
    }

    if (status !== task.status) {
      dispatch(updateStatus({ taskId: task.key, status }));
    }

    setComment("");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Content style={{ padding: "20px" }}>
        <Card style={{ marginBottom: 20 }}>
          <Title level={4}>{`Task #${task.number}`}</Title>
          <Text>{task.title}</Text>
          <Row
            gutter={[16, 16]}
            style={{
              marginTop: 20,
              backgroundColor: "#f5f8fc",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
            }}
          >
            {/* Left Column */}
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                <Text strong>Status:</Text> <Text>{task.status || "Open"}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Created:</Text> <Text>{task.dateCreated}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Due Date:</Text>{" "}
                  <Text>{task.dueDate || " "}</Text>
                </Col>
              </Row>
            </Col>

            {/* Right Column */}
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text strong>Department:</Text> <Text>{task.department}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Assigned To:</Text> <Text>{task.agent}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Collaborators:</Text>{" "}
                  <Text>{task.collaborators || "None"}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* Updates Section */}
        <Card title="Updates" style={{ marginBottom: 20 }}>
          <List
            dataSource={task.comments || []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.author[0]}</Avatar>}
                  title={`${item.author} - ${item.timestamp}`}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Add Update Section */}
        <Card title="Add Update">
          <Form layout="vertical">
            <Form.Item label="Write an Update">
              <TextArea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                value={status}
                onChange={(value) => setStatus(value)}
                style={{ width: 120 }}
              >
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handlePostUpdate}>
                Post Update
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => setComment("")}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default TaskDetails;
