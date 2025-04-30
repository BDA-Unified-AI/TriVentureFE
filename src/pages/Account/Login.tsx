import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useState, useEffect } from "react";
import useAppState from "../../components/Context/state";
import { login } from "../../apis/account";
import { setCookie } from "../../helpers/Cookies";
import { openNotification } from "../../helpers/notification";
import { useTranslation } from "react-i18next";
// import UserInfoModal from "./CollectInfo";
import { motion } from "framer-motion";
import logo2 from "../../assets/logo2.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const setUserInfo = useAppState((state) => state.setUserInfo);
  const setIslogin = useAppState((state) => state.setIslogin);
  const [isLoading, setIsLoading] = useState(false);

  const loginFunction = (credentialResponse: CredentialResponse): void => {
    setIsLoading(true); // Move setIsLoading here
    const apiLogin = async () => {
      try {
        const response = await login({
          credential: credentialResponse.credential,
        });
        if (response.status === 200) {
          openNotification(api, "success", "Login Success", "", "topRight", 3);
          setIslogin(true);
          setCookie("token", response.data.token, 30);
          if (response.data.user_data === null) {
            openNotification(
              api,
              "error",
              "Login Failed",
              "Please try again",
              "topRight",
              3
            );
          }
          if (response.data.user_data) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.user_data)
            );
            setUserInfo(response.data.user_data);
            navigate("/");
          }
        } else {
          openNotification(
            api,
            "error",
            "Login Failed",
            "Please try again",
            "topRight",
            3
          );
        }
      } catch (error) {
        openNotification(
          api,
          "error",
          "Login Failed",
          "An error occurred. Please try again.",
          "topRight",
          3
        );
      } finally {
        setIsLoading(false);
      }
    };
    apiLogin();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {contextHolder}
      {/* <UserInfoModal /> */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <img
                  src={logo2}
                  alt="TriVenture Logo"
                  className="h-20 w-auto"
                />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3">
                {t("Welcome to TriVenture")}
              </h2>
              <p className="text-blue-100 text-lg">
                {t("Plan your perfect trip with us")}
              </p>
            </div>

            {/* Login Section */}
            <div className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <p className="text-gray-600 text-lg">
                  {t("Sign in with your Google account to continue")}
                </p>
                <div className="flex justify-center">
                  <GoogleLogin
                    shape="pill"
                    onSuccess={loginFunction}
                    onError={() => {
                      openNotification(
                        api,
                        "error",
                        "Login Failed",
                        "Please try again",
                        "topRight",
                        3
                      );
                    }}
                  />
                </div>
                {isLoading && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
