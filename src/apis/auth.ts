import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  picture: string;
  contact_number: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  contact_number: string;
  role: string;
  created_at: string;
  updated_at: string;
  expire_at: string | null;
}

export const getUserInfo = async () => {
  try {
    const token = getCookie("token");
    if (!token) {
      console.error("Không tìm thấy token.");
      return { status: 401, data: { message: "Unauthorized: No token found" } };
    }

    const { status, data } = await axios.get(`${API_DOMAIN}auth/get_info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return { status, data };
  } catch (error: any) {
    console.error("Lỗi khi gọi API userInfo:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message:
          error.response?.data?.message || "Lỗi khi lấy thông tin người dùng",
      },
    };
  }
};

export const getAllUsers = async () => {
  try {
    const token = getCookie("token");
    if (!token) {
      console.error("Không tìm thấy token.");
      return { status: 401, data: { message: "Unauthorized: No token found" } };
    }

    const { status, data } = await axios.get(`${API_DOMAIN}auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return { status, data };
  } catch (error: any) {
    console.error("Lỗi khi gọi API getUsers:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message:
          error.response?.data?.message || "Lỗi khi lấy danh sách người dùng",
      },
    };
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const token = getCookie("token");
    if (!token) {
      console.error("Không tìm thấy token.");
      return { status: 401, data: { message: "Unauthorized: No token found" } };
    }

    const { status, data } = await axios.delete(
      `${API_DOMAIN}auth/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return { status, data };
  } catch (error: any) {
    console.error("Lỗi khi gọi API deleteUser:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Lỗi khi xóa người dùng",
      },
    };
  }
};
