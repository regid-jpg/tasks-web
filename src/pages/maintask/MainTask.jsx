import { useEffect } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Checkbox,
} from "antd";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import NewTask from "./NewTask";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTasks, addTask, setSearchText, toggleModal } from "../../store/tasksSlice";
import '../../styles/main.css'; // Adjust the path based on your folder structure


const { Content } = Layout;

const MainTask = () => {
  const dispatch = useDispatch();
  const { tasks, searchText, isModalVisible } = useSelector((state) => state.tasks);

  // Load initial tasks
  useEffect(() => {
    const initialTasks = [
      {
        key: "1",
        number: "5043",
        ticket: "960566",
        dateCreated: "6/4/23 1:53 PM",
        title: "HttpAttribute",
        department: "Information Technology Department",
        agent: "Software Dev - External Web Team",
        selected: false,
      },
      {
        key: "2",
        number: "5042",
        ticket: "960466",
        dateCreated: "6/4/23 1:53 PM",
        title: "SameSiteAttribute",
        department: "Information Technology Department",
        agent: "Software Dev - External Web Team",
        selected: false,
      },
    ];
    dispatch(setTasks(initialTasks));
  }, [dispatch]);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
  };

  // Handle checkbox change
  const handleCheckboxChange = (key) => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, selected: !task.selected } : task
    );
    dispatch(setTasks(updatedTasks));
  };

  // Handle export to XLSX
  const handleExportAll = () => {
    const selectedTasks = tasks.filter((task) => task.selected);
  
    if (selectedTasks.length === 0) {
      alert("Please select at least one task to export!");
      return;
    }
  
    // Remove the 'selected' property before exporting
    const exportData = selectedTasks.map(({ selected, ...rest }) => rest);
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SelectedTasks");
  
    // Generate filename with current date (YYYYMMDD format)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}`;
    const filename = `Tasks${formattedDate}.xlsx`;
  
    XLSX.writeFile(workbook, filename);
  };
  
  

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text, record) => (
        <span>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={record.selected}
            onChange={() => handleCheckboxChange(record.key)}
          />
          <Link to={`/task/${text}`}>{text}</Link>
        </span>
      ),
    },
    { title: "Ticket", dataIndex: "ticket", key: "ticket" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Link to={`/task/${text}`} style={{ color: "blue" }}>
          {text}
        </Link>
      ),
    },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Agent", dataIndex: "agent", key: "agent" },
  ];

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundImage: `url('./background.jpg')`}}>
      <HeaderComponent />
      <Content style={{ flex: 1, padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Space style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Input
            placeholder="Search tasks"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
          <Button type="primary" onClick={() => dispatch(toggleModal(true))}>
            New Task
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={tasks.filter(
            (task) =>
              task.number.includes(searchText) ||
              task.title.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
          footer={() => (
            <Button type="link" onClick={handleExportAll}>
              <DownCircleOutlined /> Export
            </Button>
          )}
        />
        <NewTask
          visible={isModalVisible}
          onCreate={(values) => {
            dispatch(addTask({ ...values, key: Date.now().toString(), selected: false }));
            dispatch(toggleModal(false));
          }}
          onCancel={() => dispatch(toggleModal(false))}
        />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainTask;
