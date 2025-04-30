import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { register } from "../../apis/account";
import { openNotification } from "../../helpers/notification";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Thêm thư viện để giải mã token Google

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleRegister = async (
    credentialResponse: CredentialResponse,
  ): Promise<void> => {
    try {
      // Giải mã token Google để lấy thông tin người dùng
      const decodedToken: any = jwtDecode(credentialResponse.credential || "");
      const { email, name } = decodedToken;

      // Gọi API register với thông tin từ Google
      const response = await register({
        name: name || "Google User", // Sử dụng tên từ Google hoặc mặc định
        email,
        contact_number: "", // Số điện thoại không có từ Google
        password: "google-auth", // Mật khẩu mặc định (có thể thay đổi)
      });

      if (response.status === 200) {
        openNotification(
          api,
          "success",
          "Registration Successful",
          "You have been registered using Google",
          "topRight",
          3,
        );
        navigate("/login");
      } else {
        openNotification(
          api,
          "error",
          "Registration Failed",
          response.data.message || "An error occurred",
          "topRight",
          3,
        );
      }
    } catch (error) {
      console.error("Error during Google registration:", error);
      openNotification(
        api,
        "error",
        "Registration Failed",
        "Please try again",
        "topRight",
        3,
      );
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !contact_number || !password || !confirmPassword) {
      openNotification(
        api,
        "warning",
        "Missing Information",
        "Please fill in all fields",
        "topRight",
        3,
      );
      return;
    }

    if (password !== confirmPassword) {
      openNotification(
        api,
        "error",
        "Password Mismatch",
        "Passwords do not match",
        "topRight",
        3,
      );
      return;
    }

    try {
      const response = await register({
        name,
        email,
        contact_number,
        password,
      });

      if (response.status === 200) {
        openNotification(
          api,
          "success",
          "Registration Successful",
          "",
          "topRight",
          3,
        );
        navigate("/login");
      } else {
        openNotification(
          api,
          "error",
          "Registration Failed",
          response.data.message || "An error occurred",
          "topRight",
          3,
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      openNotification(
        api,
        "error",
        "Registration Failed",
        "An error occurred. Please try again.",
        "topRight",
        3,
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          {/* Google Register */}
          <div className="flex justify-center mb-4">
            <GoogleLogin
              shape="pill"
              onSuccess={handleGoogleRegister}
              onError={() => {
                openNotification(
                  api,
                  "error",
                  "Registration Failed",
                  "Please try again",
                  "topRight",
                  3,
                );
              }}
            />
          </div>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Standard Register */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Phone"
              value={contact_number}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleRegister}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
