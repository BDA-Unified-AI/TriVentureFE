import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAppState from "../Context/state";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { motion } from "framer-motion";
import ChatContent from "../../pages/Chat/ChatContent";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";

const LayoutDefault: React.FC = () => {
  const setLocation = useAppState((state) => state.setLocation);
  const setUserInfo = useAppState((state) => state.setUserInfo);
  const [visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const isChatRoute = location.pathname === "/chat";

  type Placement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

  const remindLoginNotification = (placement: Placement) => {
    api.info({
      message: `Khuyến nghị`,
      description: (
        <>
          <div>
            Đăng nhập để trải nghiệm đầy đủ tính năng của trang web!{" "}
            <NavLink
              className="text-primary-300 font-bold"
              to="/login"
              onClick={() => api.destroy()}
            >
              Đăng nhập
            </NavLink>
          </div>
        </>
      ),
      placement,
      icon: <UserOutlined style={{ color: "#4C86E4" }} />,
      duration: 3,
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      remindLoginNotification("topRight");
    }
  }, [setUserInfo]);
  return (
    <div className="">
      {contextHolder}
      {visible && (
        <div
          className="fixed bottom-20 right-5 w-72 h-96 bg-white shadow-lg rounded-lg z-50 overflow-x-hidden"
          style={{ width: "24rem", height: "30rem" }}
        >
          <ChatContent
            sessionId={"6d16c975e8b74d979d6d680e6ff536eb"}
            setVisible={setVisible}
          />
        </div>
      )}
      {!isChatRoute && (
        <div
          className={`fixed transition hover:scale-125 flex items-center gap-2 md:gap-4 bottom-5 right-5 mr-7 md:mr-0 bg-blue-600 hover:bg-blue-500 md:px-4 md:py-2 p-3 rounded-full cursor-pointer shadow-lg z-50 ${
            !visible && "animate-pulse hover:animate-none"
          }`}
          onClick={() => setVisible(!visible)}
        >
          <motion.span
            className="hidden md:inline text-white cursor-pointer font-roboto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 0.9, rotate: 10 }}
            drag
          >
            AI Assistant
          </motion.span>
          <MessageOutlined className="text-white text-xl" />
        </div>
      )}
      {!isChatRoute && <Header />}
      <Outlet />
      <Analytics />

      {!isChatRoute && <Footer />}
    </div>
  );
};

export default LayoutDefault;
