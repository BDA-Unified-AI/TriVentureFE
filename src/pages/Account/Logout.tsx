import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { eraseCookie } from "../../helpers/Cookies";
import useAppState from "../../components/Context/state";
import { openNotification } from "../../helpers/notification";
import { notification } from "antd";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const setIslogin = useAppState((state) => state.setIslogin);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    eraseCookie("token");
    setIslogin(false);
    openNotification(api, "success", "Logout Success", "", "topRight", 3);
    navigate("/login");
  }, []);
  return <>{contextHolder}</>;
};

export default Logout;
