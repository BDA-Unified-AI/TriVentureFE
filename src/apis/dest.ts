import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

interface Destination {
  name: string;
  description: string;
  image: string;
}

interface DestinationResponse {
  data: Destination[];
  page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
}

export interface DestinationDetail {
  id: string;
  name: string;
  description: string;
  image: string;
}
export const getDestination = async (
  page: number = 1
): Promise<DestinationResponse> => {
  const { data } = await axios.get(API_DOMAIN + `dest/paginate?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return data;
};
export interface DestinationItem {
  id: string;
  name: string;
  description: string;
  image: string;
}
export const listAllDestinations = async (): Promise<DestinationItem[]> => {
  const { data } = await axios.get(API_DOMAIN + `dest/get_tourist_names`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

export interface DestinationSearchResult {
  name: string;
  address?: string;
  distance_km?: number;
  contact?: string;
  website?: string;
  map_url?: string;
  image?: string;
  description?: string;
}

export const destinationSuggestions = async (
  query: string,
  user_id: string | null,
  limit: number = 5
): Promise<DestinationSearchResult[]> => {
  const { data } = await axios.get(
    API_DOMAIN +
      `dest/suggest?question=${query}&top_k=${limit}${
        user_id ? `&user_id=${user_id}` : ""
      }`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );
  return data;
};

export const getDestinationDetail = async (
  destinationId: string
): Promise<DestinationDetail> => {
  const { data } = await axios.get(
    API_DOMAIN + `dest/destination_detail?destination_id=${destinationId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );
  return data;
};
