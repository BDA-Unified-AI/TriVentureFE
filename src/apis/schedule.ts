import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { API_DOMAIN } from "../constant";

export const createAnActivity = async (
  activityId: string,
  description: string,
  activityCategory: string,
  startTime: string,
  endTime: string
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}scheduling/create`,
      {
        activity_id: activityId,
        description: description,
        activity_category: activityCategory,
        start_time: startTime,
        end_time: endTime,
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
    return {
      status: 500,
      data: { status: "error", message: "Error sending chat message" },
    };
  }
};
type ActivityType = {
  id: string;
  description: string;
  start_time: string;
  end_time: string;
};
type MultipleActivityType = {
  activity_id: string;
  description: string;
  start_time: string;
  end_time: string;
};

export const createMultipleActivities = async (
  activities: MultipleActivityType[]
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}scheduling/create_multiple`,
      activities,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error creating multiple activities:", error);
    return {
      status: 500,
      data: { status: "error", message: "Error creating multiple activities" },
    };
  }
};
export const listAllActivities = async (): Promise<{
  status: number;
  data: { status: string | null; message: ActivityType[] | string };
}> => {
  try {
    const { status, data } = await axios.get(`${API_DOMAIN}scheduling/search`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {
      status: 500,
      data: { status: null, message: "Error sending chat message" },
    };
  }
};
export const listActivitiesInRange = async (
  startTime: string,
  endTime: string
): Promise<{
  status: number;
  data: { status: string | null; message: ActivityType[] | string };
}> => {
  try {
    const { status, data } = await axios.get(`${API_DOMAIN}scheduling/search`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      params: {
        start_time: startTime,
        end_time: endTime,
      },
    });
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {
      status: 500,
      data: { status: null, message: "Error sending chat message" },
    };
  }
};
export const updateActivity = async (
  activityId: string,
  description: string,
  activityCategory: string,
  startTime: string,
  endTime: string
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.put(
      `${API_DOMAIN}scheduling/update`,
      {
        activity_id: activityId,
        description: description,
        activity_category: activityCategory,
        start_time: startTime,
        end_time: endTime,
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
    return {
      status: 500,
      data: { status: "error", message: "Error sending chat message" },
    };
  }
};
export const deleteActivity = async (
  activityId: string
): Promise<{ status: number; data: unknown }> => {
  try {
    const { status, data } = await axios.delete(
      `${API_DOMAIN}scheduling/delete?activity_id=${activityId}`,
      {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error deleting activity:", error);
    return {
      status: 500,
      data: { status: "error", message: "Error deleting activity" },
    };
  }
};
