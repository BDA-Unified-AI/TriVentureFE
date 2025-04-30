import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

export const getLocationDetail = async (
  lat: number,
  long: number
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}location/details`,
      {
        long: long,
        lat: lat,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return { status: 500, data: { message: "Error sending chat message" } };
  }
};
export const getNearLocations = async (
  lat: number,
  long: number,
  radius: number
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}location/nearby`,
      {
        long: long,
        lat: lat,
        radius: radius,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return { status: 500, data: { message: "Error sending chat message" } };
  }
};
