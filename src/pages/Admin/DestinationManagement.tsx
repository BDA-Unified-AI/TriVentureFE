import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Image,
  Pagination,
  Popconfirm,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { destinationApi } from "../../apis/destinationApi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Destination, DestinationResponse } from "../../types/destination";

const DestinationManagement: React.FC = () => {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const fetchDestinations = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await destinationApi.getAllDestinations(page);
      const data = response as DestinationResponse;
      setDestinations(data.data);
      setTotalItems(data.total_items);
      setPageSize(data.page_size);
    } catch (error) {
      message.error(t("Failed to fetch destinations"));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table after page change
    document
      .getElementById("destinations-table-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchDestinations(currentPage);
  }, [currentPage]);

  const handleAdd = () => {
    setEditingDestination(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Destination) => {
    setEditingDestination(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(id);
      await destinationApi.deleteDestination(id);
      message.success(t("Destination deleted successfully"));
      fetchDestinations(currentPage);
    } catch (error) {
      message.error(t("Failed to delete destination"));
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDestination) {
        await destinationApi.updateDestination(editingDestination.id, values);
        message.success(t("Destination updated successfully"));
      } else {
        await destinationApi.createDestination(values);
        message.success(t("Destination created successfully"));
      }
      setIsModalVisible(false);
      fetchDestinations(currentPage);
    } catch (error) {
      message.error(t("Operation failed"));
    }
  };

  // Desktop columns configuration
  const desktopColumns = [
    {
      title: t("Image"),
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <div className="relative">
          <Image
            src={image}
            alt="Destination"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
            className="rounded-md shadow-sm"
            preview={{
              mask: (
                <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40 rounded-md">
                  <div className="text-white">{t("View")}</div>
                </div>
              ),
            }}
          />
        </div>
      ),
    },
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: t("Created By"),
      dataIndex: "created_user",
      key: "created_user",
      render: (user: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{user?.name}</span>
          <span className="text-gray-500 text-sm">{user?.email}</span>
        </div>
      ),
    },
    {
      title: t("Updated By"),
      dataIndex: "updated_user",
      key: "updated_user",
      render: (user: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{user?.name}</span>
          <span className="text-gray-500 text-sm">{user?.email}</span>
        </div>
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
      render: (_: any, record: Destination) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title={t("Are you sure you want to delete this destination?")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("Yes")}
            cancelText={t("No")}
            okButtonProps={{ loading: deleteLoading === record.id }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={deleteLoading === record.id}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Mobile columns configuration
  const mobileColumns = [
    {
      title: t("Destination"),
      key: "destination",
      render: (record: Destination) => (
        <div className="flex flex-col space-y-3">
          <div className="flex items-start space-x-3">
            <div className="relative min-w-[80px]">
              <Image
                src={record.image}
                alt={record.name}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
                className="rounded-md shadow-sm"
                preview={{
                  mask: (
                    <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40 rounded-md">
                      <div className="text-white">{t("View")}</div>
                    </div>
                  ),
                }}
              />
            </div>
            <div className="flex-1">
              <Typography.Text strong className="text-base">
                {record.name}
              </Typography.Text>
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                className="text-sm text-gray-600 mt-1 mb-0"
              >
                {record.description}
              </Typography.Paragraph>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{new Date(record.created_at).toLocaleDateString()}</span>
            <div className="flex space-x-2">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
              <Popconfirm
                title={t("Delete?")}
                onConfirm={() => handleDelete(record.id)}
                okText={t("Yes")}
                cancelText={t("No")}
              >
                <Button
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  loading={deleteLoading === record.id}
                />
              </Popconfirm>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? "p-3" : "p-6"}`}
    >
      <div
        className={`flex justify-between items-center ${
          isMobile ? "mb-4" : "mb-6"
        }`}
      >
        <h1
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold text-gray-800`}
        >
          {t("Destination Management")}
        </h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size={isMobile ? "small" : "middle"}
        >
          {isMobile ? "" : t("Add Destination")}
        </Button>
      </div>

      <div id="destinations-table-top">
        <Table
          columns={isMobile ? mobileColumns : desktopColumns}
          dataSource={destinations}
          rowKey="id"
          loading={loading}
          pagination={false}
          className="bg-white rounded-lg shadow-sm"
          size={isMobile ? "small" : "middle"}
        />
      </div>

      <div className={`mt-4 flex justify-center ${isMobile ? "text-sm" : ""}`}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={!isMobile}
          showQuickJumper={!isMobile}
          size={isMobile ? "small" : "default"}
          simple={isMobile}
          className="flex justify-center"
        />
      </div>

      <Modal
        title={
          editingDestination ? t("Edit Destination") : t("Add Destination")
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={isMobile ? "100%" : 600}
        bodyStyle={{ padding: isMobile ? "12px" : "24px" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t("Name")}
            rules={[{ required: true, message: t("Please input the name!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={t("Description")}
            rules={[
              { required: true, message: t("Please input the description!") },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label={t("Image URL")}
            rules={[
              { required: true, message: t("Please input the image URL!") },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default DestinationManagement;
