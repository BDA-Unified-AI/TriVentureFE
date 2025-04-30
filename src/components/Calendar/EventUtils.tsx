import { listActivitiesInRange } from "../../apis/schedule";

export function createEventId(): string {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(16)
    .padStart(8, "0");
  const randomPart = Math.random().toString(16).slice(2).padStart(16, "0");
  return timestamp + randomPart;
}
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Initial Event 1",
    start: "2024-12-25T10:00:00",
    end: "2024-12-25T12:00:00",
  },
  {
    id: createEventId(),
    title: "Initial Event 2",
    start: "2024-12-26T14:00:00",
    end: "2024-12-26T16:00:00",
  },
];

export const fecthData = async (e: any) => {
  const response = await listActivitiesInRange(e.startStr, e.endStr);
  if (response.status) {
    if (Array.isArray(response.data.message)) {
      return response.data.message.map((activity: any) => ({
        id: activity.id,
        title: activity.description,
        type: activity.activity_category,
        start: activity.start_time,
        end: activity.end_time,
      }));
    } else {
      return [];
    }
  } else {
    return [];
  }
};
