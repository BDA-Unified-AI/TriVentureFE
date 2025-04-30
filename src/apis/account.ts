import axios from "axios";
import { API_DOMAIN } from "../constant";
// 
export const login = async (
  payload: object,
): Promise<{
  data: {
    token: string;
    user_data: {
      id: string;
      email: string;
      name: string;
      role: string;
      picture: string;
      contact_number: string;
      bank_number: string;
    } | null;
    first_login: boolean;
  };
  status: number;
}> => {
  const { data, status } = await axios.post(API_DOMAIN + "auth/login", payload);
  return { data, status };
};
export const register = async (payload: {
  name: string;
  email: string;
  contact_number: string;
  password: string;
}): Promise<{
  data: {
    message: string;
    user_data: {
      email: string;
      name: string;
      contact_number: string;
    } | null;
  };
  status: number;
}> => {
  const { data, status } = await axios.post(
    API_DOMAIN + "auth/register",
    payload,
  );
  return { data, status };
};

export const loginWithPassword = async (payload: {
  username: string;
  password: string;
}): Promise<{
  data: {
    token: string;
    user_data: {
      id: string;
      email: string;
      name: string;
      role: string;
      picture: string;
      contact_number: string;
      bank_number: string;
    } | null;
  };
  status: number;
}> => {
  const { data, status } = await axios.post(
    API_DOMAIN + "auth/login-password",
    payload,
  );
  return { data, status };
};
