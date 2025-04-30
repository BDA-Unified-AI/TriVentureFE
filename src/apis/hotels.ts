import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";


export const searchHotels = async (
  type: string,
  topK: number,
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}hotel/search_hotels`,
      {
        hotel_type: type,
        top_k: topK,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
    );
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return { status: 500, data: { message: "Error sending chat message" } };
  }
};
