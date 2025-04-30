import axios from "axios";
import { getCookie } from "../helpers/Cookies";

// const API_DOMAIN = "https://triventure.azure-api.net/";
// const API_DOMAIN = "http://localhost:3002/";
const API_DOMAIN = "https://abao77-triventure-be.hf.space/";

export const get = async (path: string) => {
  try {
    const response = await axios.get(API_DOMAIN + path, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    return { error };
  }
};

export const post = async (
  path: string,
  options: object,
): Promise<
  | {
      data: unknown;
      status: number;
    }
  | { error: unknown }
> => {
  try {
    const response = await axios.post(API_DOMAIN + path, options, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("POST request error:", error);
    return { error };
  }
};

export const del = async (path: string, id: string) => {
  try {
    const response = await axios.delete(`${API_DOMAIN}${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    return error;
  }
};

export const patch = async (path: string, options: object) => {
  try {
    const response = await axios.patch(API_DOMAIN + path, options, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PATCH request error:", error);
    return error;
  }
};

export const put = async (path: string, id: string, options: object) => {
  try {
    const response = await axios.put(`${API_DOMAIN}${path}/${id}`, options, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    return error;
  }
};
