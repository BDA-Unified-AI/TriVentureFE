import React, { useState } from "react";
import { Layout, Card, Button, Tag, List } from "antd";
import { useTranslation } from "react-i18next";
import {
  RobotOutlined,
  CompassOutlined,
  FireOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import VisualSearchModal from "../VisualSearchModal";
import { motion } from "framer-motion";
const { Content } = Layout;

interface PostLayoutProps {
  children: React.ReactNode;
}

const PostLayout: React.FC<PostLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisualSearchModalOpen, setIsVisualSearchModalOpen] = useState(false);

  const suggestedDestinations = [
    {
      name: "Kỳ Co",
      description: "Du lịch biển",
      icon: (
        <EnvironmentOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
      ),
      tags: ["Culture", "History"],
    },
    {
      name: "Vịnh Hạ Long",
      description: "Kỳ quan thiên nhiên thế giới",
      icon: <GlobalOutlined style={{ fontSize: "24px", color: "#52c41a" }} />,
      tags: ["Nature", "Adventure"],
    },
    {
      name: "Phú Quốc",
      description: "Thiên đường biển đảo",
      icon: <BankOutlined style={{ fontSize: "24px", color: "#fa8c16" }} />,
      tags: ["Beach", "Relaxation"],
    },
  ];

  const trendingTopics = [
    "Ẩm thực đường phố",
    "Du lịch sinh thái",
    "Khám phá văn hóa",
    "Địa điểm check-in",
    "Lễ hội truyền thống",
  ];

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content>
        <div className="px-4 py-6 relative">
          <div className="flex justify-between gap-6">
            {/* Left Sidebar */}
            <div className="w-80 hidden lg:block space-y-6 sticky top-[120px] self-start">
              {/* AI Travel Assistant */}
              <Card
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
                title={
                  <div className="flex items-center space-x-2">
                    <RobotOutlined className="text-blue-500" />
                    {/* <span className="font-medium">
                      {t("post.AI Travel Assistant")}
                    </span> */}
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      {t("post.Let AI help plan your perfect trip!")}
                    </p>
                    <Button
                      type="primary"
                      className="w-full rounded-lg"
                      icon={<ThunderboltOutlined />}
                      onClick={() => navigate("/planner")}
                    >
                      {t("post.Start Planning")}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      {t("post.Quick Actions")}:
                    </p>
                    <div className="space-y-2">
                      <Button
                        className="w-full text-left flex items-center space-x-2"
                        type="text"
                        onClick={() => navigate("/destination")}
                      >
                        <CompassOutlined className="text-green-500" />
                        <span>{t("post.Find Destinations")}</span>
                      </Button>
                      <Button
                        className="w-full text-left flex items-center space-x-2"
                        type="text"
                      >
                        <FireOutlined className="text-orange-500" />
                        <span>{t("post.Popular Routes")}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Trending Topics */}
              <Card
                className="rounded-xl shadow-sm"
                title={
                  <div className="flex items-center space-x-2">
                    <FireOutlined className="text-orange-500" />
                    <span className="font-medium">
                      {t("post.Trending Topics")}
                    </span>
                  </div>
                }
              >
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, index) => (
                    <Tag
                      key={index}
                      className="px-3 py-1 rounded-full cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      #{topic}
                    </Tag>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">{children}</div>

            {/* Right Sidebar */}
            <div className="w-80 hidden lg:block space-y-6 sticky top-[120px] self-start">
              {/* Suggested Destinations */}
              <Card
                className="rounded-xl shadow-sm"
                title={
                  <div className="flex items-center space-x-2">
                    <CompassOutlined className="text-green-500" />
                    <span className="font-medium">
                      {t("post.Suggested Destinations")}
                    </span>
                  </div>
                }
              >
                <List
                  itemLayout="horizontal"
                  dataSource={suggestedDestinations}
                  renderItem={(item) => (
                    <List.Item className="cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                      <List.Item.Meta
                        avatar={
                          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                            {item.icon}
                          </div>
                        }
                        title={<span className="font-medium">{item.name}</span>}
                        description={
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              {item.description}
                            </p>
                            <div className="flex gap-1">
                              {item.tags.map((tag, index) => (
                                <Tag key={index} className="text-xs">
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* Advertisement Space */}
              <Card
                className="rounded-xl shadow-sm overflow-hidden"
                styles={{ body: { padding: 0 } }}
              >
                <div className="aspect-[4/3] bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white p-6 text-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("post.Image Search")}
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      {t("post.Upload an image to find similar destinations")}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg bg-white text-black border border-gray-300 px-4 py-2 font-medium"
                      onClick={() => setIsVisualSearchModalOpen(true)}
                    >
                      {t("post.Try Image Search")}
                    </motion.button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <VisualSearchModal
          isOpen={isVisualSearchModalOpen}
          onClose={() => setIsVisualSearchModalOpen(false)}
        />
      </Content>
    </Layout>
  );
};

export default PostLayout;
