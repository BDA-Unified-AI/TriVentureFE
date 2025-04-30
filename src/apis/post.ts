import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";
import { Post } from "../components/Post/types";

export const createPost = async (payload: {
  content: string;
  destination_id: string;
}): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}post/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error creating post:", error);
    return { status: 500, data: { message: "Error creating post" } };
  }
};

export const getPost = async (
  post_id: string
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.get(
      `${API_DOMAIN}post/get/${post_id}`,
      {
        headers: {},
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error getting post:", error);
    return { status: 500, data: { message: "Error getting post" } };
  }
};

export const updatePost = async (payload: {}): Promise<{
  status: number;
  data: unknown;
}> => {
  try {
    const { status, data } = await axios.patch(
      `${API_DOMAIN}post/update/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      status: 500,
      data: { message: "Error updating post" },
    };
  }
};

export const deletePost = async (
  post_id: string
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.delete(
      `${API_DOMAIN}post/delete/${post_id}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { status: 500, data: { message: "Error deleting post" } };
  }
};

interface PaginatedResponse {
  data: Post[];
  page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
}

export interface PostResponse {
  status: string;
  message: PaginatedResponse;
}

export const listPosts = async (
  userId?: string,
  page: number = 1
): Promise<{
  status: number;
  data: PostResponse | { status: string; message: string };
}> => {
  try {
    const url = userId
      ? `${API_DOMAIN}post/list?user_id=${userId}&page=${page}`
      : `${API_DOMAIN}post/list?page=${page}`;

    const { status, data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return { status, data };
  } catch (error) {
    console.error("Error listing posts:", error);
    return {
      status: 500,
      data: {
        status: "error",
        message: "Error listing posts",
      },
    };
  }
};

export const listPostsByDestination = async (
  destinationId: string,
  userId?: string,
  page: number = 1
): Promise<{
  status: number;
  data: {
    status: string;
    message: {
      data: Post[];
      page: number;
      total_pages: number;
      total_items: number;
      page_size: number;
    };
  };
}> => {
  try {
    // Create URL with query string
    const url = `${API_DOMAIN}post/list_post_destination?destination_id=${destinationId}${
      userId ? `&user_id=${userId}` : ""
    }&page=${page}`;

    // Send GET request
    const { status, data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
    return { status, data };
  } catch (error) {
    console.error("Error listing posts by destination:", error);
    return {
      status: 500,
      data: {
        status: "error",
        message: {
          data: [],
          page: 1,
          total_pages: 1,
          total_items: 0,
          page_size: 5
        }
      },
    };
  }
};
