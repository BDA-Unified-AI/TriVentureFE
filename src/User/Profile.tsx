import { useState, useEffect } from "react";
import { message, Card, Avatar, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const storedUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null;

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        if (!storedUserInfo) {
          message.error(t("You need to log in first."));
          navigate("/login");
          return;
        }
        // Simulate loading time for better UX
      } catch (error) {
        message.error(t("Failed to load profile"));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [storedUserInfo, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Spin size="large" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      {storedUserInfo ? (
        <Card
          className="w-full max-w-2xl rounded-2xl shadow-xl border-none bg-white/90 backdrop-blur-sm"
          title={
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent py-4"
            >
              {t("User Profile")}
            </motion.h2>
          }
        >
          <div className="flex flex-col items-center space-y-8">
            {/* Avatar Section */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="relative group"
            >
              <Avatar
                src={storedUserInfo.picture}
                size={120}
                className="ring-4 ring-blue-100 shadow-lg group-hover:ring-blue-200 transition-all duration-300"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {storedUserInfo.name}
              </div>
            </motion.div>

            {/* User Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <UserOutlined className="text-xl text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500">{t("Name")}</div>
                      <div className="font-medium">
                        {storedUserInfo.name || "Not Provided"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <MailOutlined className="text-xl text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{storedUserInfo.email}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <PhoneOutlined className="text-xl text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {t("contact")}
                      </div>
                      <div className="font-medium">
                        {storedUserInfo.contact_number || "Not Provided"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full pt-4"
            >
              <Button
                type="primary"
                size="large"
                icon={<EditOutlined />}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-none rounded-xl h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/edit-profile")}
              >
                {t("Edit Profile")}
              </Button>
            </motion.div>
          </div>
        </Card>
      ) : (
        <div className="text-center text-lg text-gray-600">
          No user data available
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
