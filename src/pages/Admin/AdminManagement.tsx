import React, { useState, useEffect } from "react";
import { Tabs, Card } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import PostManagement from "./PostManagement";
import DestinationManagement from "./DestinationManagement";
import UserManagement from "./UserManagement";

const AdminManagement: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("posts");
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

  const items = [
    {
      key: "posts",
      label: t("Post Management"),
      children: <PostManagement />,
    },
    {
      key: "destinations",
      label: t("Destination Management"),
      children: <DestinationManagement />,
    },
    {
      key: "users",
      label: t("User Management"),
      children: <UserManagement />,
    },
  ];

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
          {t("Admin Management")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("Manage posts and destinations on the platform")}
        </p>
      </div>

      <Card
        className="bg-white rounded-lg shadow-sm"
        bodyStyle={{ padding: isMobile ? "12px" : "24px" }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          className="admin-tabs"
          size={isMobile ? "small" : "middle"}
          tabBarGutter={isMobile ? 16 : 24}
        />
      </Card>
    </motion.div>
  );
};

export default AdminManagement;
