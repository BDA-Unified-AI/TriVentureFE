import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  message,
  Tag,
  Popconfirm,
  Avatar,
  Typography,
  Result,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  UserOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getAllUsers, deleteUserById } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
  status: string;
  created_at: string;
}

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      const userInfoStr = localStorage.getItem("userInfo");
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo && userInfo.role === "admin") {
            setIsAdmin(true);
            return;
          }
        } catch (error) {
          console.error("Error parsing userInfo from localStorage:", error);
        }
      }

      setIsAdmin(false);
      message.error(t("You don't have permission to access this page"));
    };

    checkAdminStatus();
  }, [t]);

  const fetchUsers = async () => {
    if (!isAdmin) return;

    try {
      setLoading(true);
      const response = await getAllUsers();

      if (response.status === 200) {
        const userData = response.data.data || [];
        setUsers(userData);
        setPagination((prev) => ({
          ...prev,
          total: userData.length,
        }));
      } else {
        message.error(t(response.data.message || "Failed to fetch users"));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error(t("Failed to fetch users"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    // Scroll to the top of the users table
    document
      .getElementById("users-table-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const response = await deleteUserById(userId);

      if (response.status === 200) {
        message.success(t("User deleted successfully"));
        fetchUsers();
      } else {
        message.error(t(response.data.message || "Failed to delete user"));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(t("Failed to delete user"));
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const desktopColumns = [
    {
      title: t("User"),
      key: "user",
      render: (record: User) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.picture} size={40} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: t("Role"),
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "gold" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "success" : "error"}>{status}</Tag>
      ),
    },
    {
      title: t("Created At"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: User) =>
        record.role !== "admin" && (
          <Popconfirm
            title={t("Are you sure you want to delete this user?")}
            onConfirm={() => handleDeleteUser(record._id)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button danger icon={<DeleteOutlined />}>
              {t("Delete")}
            </Button>
          </Popconfirm>
        ),
    },
  ];

  // Mobile view columns
  const mobileColumns = [
    {
      title: t("User Information"),
      key: "userInfo",
      render: (record: User) => (
        <div className="flex flex-col space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar src={record.picture} size={50} icon={<UserOutlined />} />
            <div className="flex-1">
              <Typography.Text strong className="text-base">
                {record.name}
              </Typography.Text>
              <div className="text-gray-500 text-sm">{record.email}</div>
              <div className="mt-1 flex items-center space-x-2">
                <Tag color={record.role === "admin" ? "gold" : "blue"}>
                  {record.role}
                </Tag>
                <Tag color={record.status === "active" ? "success" : "error"}>
                  {record.status}
                </Tag>
                <span className="text-xs text-gray-400">
                  {new Date(record.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {record.role !== "admin" && (
            <div className="flex justify-end">
              <Popconfirm
                title={t("Delete this user?")}
                onConfirm={() => handleDeleteUser(record._id)}
                okText={t("Yes")}
                cancelText={t("No")}
              >
                <Button danger size="small" icon={<DeleteOutlined />}>
                  {t("Delete")}
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
      ),
    },
  ];

  if (!isAdmin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle={t("Sorry, you don't have access to this page.")}
        icon={<StopOutlined />}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {t("Back to Home")}
          </Button>
        }
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? "p-3" : "p-6"}`}
    >
      <div className={`${isMobile ? "mb-4" : "mb-6"}`}>
        <h1
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold text-gray-800`}
        >
          {t("User Management")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("View and manage user accounts")}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <Input
          placeholder={t("Search by name or email")}
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div id="users-table-top">
        <Table
          columns={isMobile ? mobileColumns : desktopColumns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          className="bg-white rounded-lg shadow-sm"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: !isMobile,
            showQuickJumper: !isMobile,
            size: isMobile ? "small" : "default",
            showTotal: (total) =>
              isMobile
                ? `${total} ${t("items")}`
                : `${t("Total")} ${total} ${t("items")}`,
            className: "flex justify-center",
            position: ["bottomCenter"],
          }}
          onChange={handleTableChange}
          size={isMobile ? "small" : "middle"}
          scroll={isMobile ? { x: "100%" } : undefined}
        />
      </div>
    </motion.div>
  );
};

export default UserManagement;
