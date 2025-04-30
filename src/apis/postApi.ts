import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

interface Post {
  id: string;
  content: string;
  destination_id: string;
  destination_name: string;
  comment_count: number;
  reaction_count: number;
  current_user_reaction: any;
  picture: string[];
  created_at: string;
  updated_at: string;
  user_info: {
    user_id: string;
    name: string;
    picture: string;
  };
}

interface PaginationResponse {
  data: Post[];
  page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
}

interface ApiResponse {
  status: string;
  message: PaginationResponse;
}

const postApi = {
  getAllPosts: async (page: number = 1, pageSize: number = 5) => {
    const response = await axios.get(`${API_DOMAIN}post/list`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      params: {
        page,
        page_size: pageSize,
      },
    });
    return response.data as ApiResponse;
  },

  deletePost: async (postId: string) => {
    const response = await axios.delete(
      `${API_DOMAIN}admin/post/delete/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response.data;
  },
};

export { postApi };
