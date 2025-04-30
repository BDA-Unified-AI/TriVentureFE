import React, { useState, useEffect } from "react";
import {
  Menu,
  Modal,
  Button,
  Avatar,
  Dropdown,
  Drawer,
  notification,
  Tooltip,
} from "antd";
import {
  GlobalOutlined,
  MenuOutlined,
  SunOutlined,
  CalendarOutlined,
  FlagOutlined,
  CarryOutOutlined,
  UserOutlined,
  EditOutlined,
  HomeOutlined,
  SketchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Flag from "react-world-flags";
import useAppState from "../Context/state";
import { NavLink, useNavigate } from "react-router-dom";
import { eraseCookie } from "../../helpers/Cookies";
// import { FaBrain } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import logo2 from "../../assets/logo2.png";
import "./style.scss";

const AppHeader: React.FC = () => {
  const userInfo = useAppState((state) => state.userInfo);
  const { i18n, t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("VN");
  const [api, contextHolder] = notification.useNotification();
  const setLanguage = useAppState((state) => state.setLanguage);
  const setUserInfo = useAppState((state) => state.setUserInfo);
  const navigate = useNavigate();

  type Placement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

  const remindLoginNotification = (placement: Placement) => {
    api.info({
      message: t("Welcome to TriVenture"),
      description: (
        <>
          <div>
            {t("Sign in to experience all features of our platform!")}{" "}
            <NavLink
              className="text-primary-300 font-bold"
              to="/login"
              onClick={() => api.destroy()}
            >
              {t("login")}
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
    const storedUserInfo = localStorage.getItem("userInfo");
    if (!userInfo && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    if (!storedUserInfo && !userInfo) {
      remindLoginNotification("topRight");
    }

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedCurrency(storedLanguage === "vi" ? "VN" : "US");
      i18n.changeLanguage(storedLanguage);
    } else {
      localStorage.setItem("language", "vi");
      setSelectedCurrency("VN");
      i18n.changeLanguage("vi");
    }
  }, [userInfo, setUserInfo, i18n]);

  const handleScheduleClick = (e: React.MouseEvent) => {
    if (!userInfo) {
      e.preventDefault();
      remindLoginNotification("topRight");
    } else {
      navigate("/schedule");
    }
  };

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  // const handleSettings = () => navigate("/settings");
  const handleProfile = () => navigate("/profile");
  const handleLogout = () => {
    eraseCookie("token");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/logout");
  };
  const showCurrencyModal = () => setIsModalVisible(true);
  const handleCurrencyChange = (currency: string): void => {
    setSelectedCurrency(currency);
    const language = currency === "VN" ? "vi" : "en";
    setLanguage(language);
    setIsModalVisible(false);
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const currencyOptions = [
    { code: "VND", name: "Vietnamese", flag: "VN" },
    { code: "USD", name: "English", flag: "US" },
  ];
  const userMenu = (
    <Menu className="shadow-lg rounded-md">
      {/* <Menu.Item key="1" onClick={handleSettings} icon={<UserOutlined />}>
        {t("settings")}
      </Menu.Item> */}
      <Menu.Item key="2" onClick={handleProfile} icon={<UserOutlined />}>
        {t("profile")}
      </Menu.Item>
      {userInfo?.role === "admin" && (
        <>
          <Menu.Item
            key="3"
            onClick={() => navigate("/admin")}
            icon={<EditOutlined />}
          >
            {t("Admin Management")}
          </Menu.Item>
        </>
      )}
      <Menu.Divider />
      <Menu.Item key="5" onClick={handleLogout} className="text-red-500">
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  const mobileMenu = (
    <Menu className="shadow-lg rounded-md">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <NavLink to="/" onClick={onClose}>
          {t("home")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="destination" icon={<SunOutlined />}>
        <NavLink to="destination" onClick={onClose}>
          {t("destination")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="post" icon={<FlagOutlined />}>
        <NavLink to="post" onClick={onClose}>
          {t("post")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="schedule" icon={<CalendarOutlined />}>
        <NavLink
          to="schedule"
          onClick={(e) => {
            handleScheduleClick(e);
            onClose();
          }}
        >
          {t("schedule")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="planner" icon={<CarryOutOutlined />}>
        <NavLink to="planner" onClick={onClose}>
          {t("planning")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="about" icon={<InfoCircleOutlined />}>
        <NavLink to="about" onClick={onClose}>
          {t("about")}
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item key="ai" icon={<FaBrain />}>
        <NavLink to="chat" onClick={onClose}>
          {t("AI Travel Assistant")}
        </NavLink>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <>
      {contextHolder}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-full overflow-x-hidden">
        <div className="top-0 z-50">
          <div className="hidden lg:block container mx-auto px-4 py-2">
            <div className="hidden md:grid md:grid-cols-3 justify-between items-center space-x-4">
              <div className="col-span-1 text-white font-normal text-xl font-roboto">
                Intelligent Travel Platform
              </div>
              <div className="col-span-1 flex justify-center items-center gap-2">
                <Tooltip title={t("Select Language")}>
                  <button
                    className="flex gap-2 items-center hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200"
                    onClick={showCurrencyModal}
                  >
                    <Flag
                      code={selectedCurrency}
                      className="h-8 w-8 rounded-full cursor-pointer"
                    />
                    <span className="text-white">
                      {selectedCurrency === "VN" ? "Tiếng Việt" : "English"}
                    </span>
                  </button>
                </Tooltip>
              </div>

              <div className="col-span-1 flex justify-end items-center">
                {userInfo && userInfo.picture ? (
                  <Dropdown
                    placement="bottomRight"
                    overlay={userMenu}
                    trigger={["click"]}
                  >
                    <div className="flex items-center space-x-2 cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full transition-all duration-200">
                      <span className="text-white flex items-center gap-1">
                        {userInfo.role === "admin" && (
                          <SketchOutlined className="text-yellow-400" />
                        )}
                        {userInfo.role === "admin"
                          ? "Admin"
                          : userInfo.name || t("User")}
                      </span>
                      <Avatar
                        src={userInfo.picture}
                        size="default"
                        className="border-2 border-white"
                      />
                    </div>
                  </Dropdown>
                ) : (
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="px-4 py-2 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-200 shadow-md"
                    >
                      {t("login")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Button
              icon={<MenuOutlined />}
              type="primary"
              className="md:hidden text-white border-none bg-transparent absolute top-4 right-4"
              onClick={showDrawer}
            />
          </div>

          <Modal
            title={t("Select Language")}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            className="language-modal"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currencyOptions.map((currency) => (
                <Button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.flag)}
                  className="w-full flex items-center justify-center space-x-2 hover:bg-blue-50 transition-all duration-200 py-3"
                >
                  <Flag code={currency.flag} className="h-6 w-6" />
                  <span>{currency.name}</span>
                </Button>
              ))}
            </div>
          </Modal>

          <Drawer
            title={
              <div className="flex items-center">
                <img src={logo2} alt="Logo" className="h-8 mr-2" /> TriVenture
              </div>
            }
            placement="left"
            onClose={onClose}
            open={drawerVisible}
            width={280}
          >
            {userInfo && userInfo.picture && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg flex flex-col items-center space-y-3">
                <Avatar
                  src={userInfo.picture}
                  size={64}
                  className="border-2 border-white shadow-md"
                />
                <div className="text-center">
                  <div className="font-medium text-base flex items-center justify-center gap-1">
                    {userInfo.role === "admin" && (
                      <SketchOutlined className="text-yellow-400" />
                    )}
                    {userInfo.role === "admin"
                      ? "Admin"
                      : userInfo.name || t("User")}
                  </div>
                  <div className="text-sm text-gray-500">{userInfo.email}</div>
                  {userInfo.role === "admin" && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">
                      {t("Administrator")}
                    </div>
                  )}
                </div>
              </div>
            )}
            <Menu mode="vertical" className="border-none">
              <Menu.Item key="1" icon={<GlobalOutlined />}>
                <span
                  onClick={() => {
                    showCurrencyModal();
                    onClose();
                  }}
                >
                  {t("Select Language")}
                </span>
              </Menu.Item>

              <Menu.Divider />
              {mobileMenu}
            </Menu>
          </Drawer>
        </div>
      </div>
      <div className="bg-white shadow-md w-full sticky top-0 z-50 overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-12 py-2">
          <div className="flex justify-between items-center w-full relative">
            {/* Hamburger Menu - Absolute positioned */}
            <div className="lg:hidden absolute left-0">
              <Button
                icon={<MenuOutlined />}
                onClick={showDrawer}
                className="border-blue-200 hover:border-blue-300 hover:text-blue-600 transition-all"
              />
            </div>

            {/* Logo Section - Centered on mobile, left-aligned on desktop */}
            <div className="flex-1 flex lg:justify-start justify-center items-center">
              <NavLink to="/" className="flex items-center">
                <img
                  src={logo2}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
                <span className="text-xl font-bold text-blue-600 ml-2 hidden sm:block">
                  TriVenture
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1 font-roboto">
              <NavLink
                to="destination"
                className={({ isActive }) =>
                  `mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
              >
                <SunOutlined className="mr-1" />
                {t("destination")}
              </NavLink>

              <NavLink
                to="post"
                className={({ isActive }) =>
                  `mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
              >
                <FlagOutlined className="mr-1" />
                {t("post")}
              </NavLink>

              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
                onClick={handleScheduleClick}
              >
                <CalendarOutlined className="mr-1" />
                {t("schedule")}
              </NavLink>

              <NavLink
                to="planner"
                className={({ isActive }) =>
                  `mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
              >
                <CarryOutOutlined className="mr-1" />
                {t("planning")}
              </NavLink>

              <NavLink
                to="about"
                className={({ isActive }) =>
                  `mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
              >
                <InfoCircleOutlined className="mr-1" />
                {t("about")}
              </NavLink>
              {/* <NavLink
                to="chat"
                className={({ isActive }) =>
                  `flex items-center mr-1 rounded-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 ${
                    isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`
                }
              >
                <FaBrain className="mr-1" />
                {t("AI Travel Assistant")}
              </NavLink> */}
            </div>

            {/* Mobile User Menu - Absolute positioned */}
            <div className="lg:hidden absolute right-0">
              {userInfo && userInfo.picture ? (
                <Dropdown
                  overlay={userMenu}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Avatar
                    src={userInfo.picture}
                    size={40}
                    className="cursor-pointer border-2 border-blue-100 hover:border-blue-200 transition-all"
                  />
                </Dropdown>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                  {t("login")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
