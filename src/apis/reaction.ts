import axios, { AxiosError } from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";


interface InteractReactionResponse {
  status: number;
  data: {
    reaction_id?: string;
    message?: string;
  };
}

/ */;
const handleAxiosError = (error: unknown): InteractReactionResponse => {
  const axiosError = error as AxiosError;
  console.error(
    "Error interacting with reaction",
    axiosError.response?.data || axiosError.message
  );
  return { status: 500, data: { message: "Error interacting with reaction" } };
};

/**
 * Gửi request để tương tác với một bài post (thích, yêu thích, haha, không thích)
 * @param {number} current_type - Loại reaction hiện tại (0 nếu chưa có reaction)
 * @param {string} post_id - ID của bài viết
 * @param {string | null} reaction_id - ID của reaction (null nếu chưa có)
 * @param {number} type - Loại reaction mới (1 = Like, 2 = Yêu thích, 3 = Haha, ...)
 * @returns {Promise<InteractReactionResponse>}
 */
export const interactReaction = async (
  current_type: number,
  post_id: string,
  reaction_id: string | null = null,
  type: number
): Promise<InteractReactionResponse> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}reaction/interact/`,
      { current_type, post_id, reaction_id, type },
      {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      }
    );
    return { status, data };
  } catch (error) {
    return handleAxiosError(error);
  }
};
