import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

export const createComment = async (payload: {
  content: string;
  post_id: string;
}) => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}comment/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
        },
      }
    );
    return { status, data };
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Error creating comment",
      },
    };
  }
};

export const getComments = async (post_id: string) => {
  try {
    const { status, data } = await axios.get(
      `${API_DOMAIN}comment/get/${post_id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { status, data };
  } catch (error: any) {
    console.error("Error getting comments:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Error getting comments",
      },
    };
  }
};

export const updateComment = async (
  comment_id: string,
  payload: { content: string }
) => {
  try {
    const { status, data } = await axios.patch(
      `${API_DOMAIN}comment/update/`,
      { comment_id, ...payload },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return { status, data };
  } catch (error: any) {
    console.error("Error updating comment:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Error updating comment",
      },
    };
  }
};

export const deleteComment = async (comment_id: string) => {
  try {
    const { status, data } = await axios.delete(
      `${API_DOMAIN}comment/delete/${comment_id}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
        },
      }
    );
    return { status, data };
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Error deleting comment",
      },
    };
  }
};
