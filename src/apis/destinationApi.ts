import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";
import { Destination, DestinationResponse } from "../types/destination";

export const destinationApi = {
  getAllDestinations: async (
    page: number = 1
  ): Promise<DestinationResponse> => {
    const response = await axios.get(
      `${API_DOMAIN}admin/destination/paginate?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response.data;
  },

  createDestination: async (
    data: Omit<Destination, "id" | "created_at" | "updated_at">
  ): Promise<Destination> => {
    const response = await axios.post(`${API_DOMAIN}admin/destination`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return response.data;
  },

  updateDestination: async (
    id: string,
    data: Partial<Destination>
  ): Promise<Destination> => {
    const response = await axios.put(
      `${API_DOMAIN}admin/destination/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response.data;
  },

  deleteDestination: async (id: string): Promise<void> => {
    await axios.delete(`${API_DOMAIN}admin/destination/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
  },
};
