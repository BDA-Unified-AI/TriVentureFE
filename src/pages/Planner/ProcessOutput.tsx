import { notification, Button, Tooltip, TimePicker } from "antd";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createEventId } from "../../components/Calendar/EventUtils";
import { createAnActivity, createMultipleActivities } from "../../apis/schedule";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Activity {
  start_time: string;
  end_time: string;
  description: string;
}

interface Planner {
  date: string;
  activities: Activity[];
}

interface PlannerData {
  itinerary: Planner[];
  additional_info: string;
}

interface ProcessOutputProps {
  data: PlannerData;
}

const ProcessOutput: React.FC<ProcessOutputProps> = ({ data }) => {
  const { t } = useTranslation();
  const [loadingActivities, setLoadingActivities] = useState<Set<string>>(new Set());
  const [createdActivities, setCreatedActivities] = useState<Set<string>>(new Set());
  const [activityTimes, setActivityTimes] = useState<{
    [key: string]: { start: Dayjs | null; end: Dayjs | null };
  }>({});

  const combineDateAndTime = (date: string, time: string): string => {
    const [month, day, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const dateTime = dayjs(`${formattedDate} ${time}`);
    return dateTime.utc().format("YYYY-MM-DDTHH:mm:ssZ");
  };

  const handleTimeChange = (
    dateStr: string,
    index: number,
    type: "start" | "end",
    time: Dayjs | null
  ) => {
    const key = `${dateStr}-${index}`;
    setActivityTimes((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: time,
      },
    }));
  };

  const createActivity = async (
    description: string,
    activityCategory: string,
    date: string,
    startTime: string,
    endTime: string,
    activityKey: string,
  ) => {
    setLoadingActivities((prev) => new Set(prev).add(activityKey));
    const activity_id = createEventId();

    try {
      const customStart = activityTimes[activityKey]?.start?.format("HH:mm") || startTime;
      const customEnd = activityTimes[activityKey]?.end?.format("HH:mm") || endTime;
      const startStr = combineDateAndTime(date, customStart);
      const endStr = combineDateAndTime(date, customEnd);

      const response = await createAnActivity(
        activity_id,
        description,
        activityCategory,
        startStr,
        endStr,
      );

      if (response.status === 201) {
        setCreatedActivities((prev) => new Set(prev).add(activityKey));
        notification.success({
          message: t("planner.activity.created"),
          description: t("planner.activity.createdDesc"),
          placement: "topRight",
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        });
      } else {
        notification.error({
          message: t("common.error"),
          description: t("planner.activity.createFailed"),
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: t("common.error"),
        description: t("planner.activity.createError"),
        placement: "topRight",
      });
    } finally {
      setLoadingActivities((prev) => {
        const next = new Set(prev);
        next.delete(activityKey);
        return next;
      });
    }
  };

  const createActivities = async () => {
    setLoadingActivities((prev) => new Set(prev).add("all"));

    try {
      const activitiesToCreate = data.itinerary.flatMap((day) =>
        day.activities.map((activity, idx) => {
          const key = `${day.date}-${idx}`;
          const customStart = activityTimes[key]?.start?.format("HH:mm") || activity.start_time;
          const customEnd = activityTimes[key]?.end?.format("HH:mm") || activity.end_time;

          return {
            activity_id: createEventId(),
            description: activity.description,
            activity_category: "work",
            start_time: combineDateAndTime(day.date, customStart),
            end_time: combineDateAndTime(day.date, customEnd),
          };
        })
      );

      const response = await createMultipleActivities(activitiesToCreate);

      if (response.status === 201) {
        const allKeys = data.itinerary.flatMap((day) =>
          day.activities.map((_, activityIndex) => `${day.date}-${activityIndex}`)
        );
        setCreatedActivities((prev) => new Set([...prev, ...allKeys]));
        
        notification.success({
          message: t("planner.activities.created"),
          description: t("planner.activities.createdDesc"),
          placement: "topRight",
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        });
      } else {
        notification.error({
          message: t("common.error"),
          description: t("planner.activities.createFailed"),
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: t("common.error"),
        description: t("planner.activities.createError"),
        placement: "topRight",
      });
    } finally {
      setLoadingActivities((prev) => {
        const next = new Set(prev);
        next.delete("all");
        return next;
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-end">
        <Tooltip title={t("planner.activities.createAllTooltip")}>
          <Button
            onClick={createActivities}
            disabled={loadingActivities.has("all")}
            type="primary"
            shape="round"
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
            icon={
              loadingActivities.has("all") ? <LoadingOutlined /> : <CalendarOutlined />
            }
          >
            {loadingActivities.has("all")
              ? t("planner.activities.loading")
              : t("planner.activities.createAll")}
          </Button>
        </Tooltip>
      </div>

      {data.itinerary.map((day, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-4">
            {t("planner.day")} {index + 1} - {day.date}
          </h3>
          <ul className="space-y-4">
            {day.activities.map((activity, idx) => {
              const key = `${day.date}-${idx}`;
              return (
                <motion.li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                  variants={itemVariants}
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{t("planner.startTime")}:</span>
                      <TimePicker
                        value={
                          activityTimes[key]?.start ||
                          dayjs(activity.start_time, "HH:mm")
                        }
                        onChange={(value) => handleTimeChange(day.date, idx, "start", value)}
                        format="HH:mm"
                        minuteStep={5}
                        className="w-24"
                      />
                      <span>{t("planner.endTime")}:</span>
                      <TimePicker
                        value={
                          activityTimes[key]?.end ||
                          dayjs(activity.end_time, "HH:mm")
                        }
                        onChange={(value) => handleTimeChange(day.date, idx, "end", value)}
                        format="HH:mm"
                        minuteStep={5}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <Tooltip
                    title={
                      createdActivities.has(key)
                        ? t("planner.activity.alreadyCreated")
                        : t("planner.activity.createTooltip")
                    }
                  >
                    <Button
                      onClick={() =>
                        createActivity(
                          activity.description,
                          "work",
                          day.date,
                          activity.start_time,
                          activity.end_time,
                          key
                        )
                      }
                      disabled={
                        createdActivities.has(key) ||
                        loadingActivities.has(key)
                      }
                      type="primary"
                      shape="round"
                      size="middle"
                      className={`mt-3 sm:mt-0 ${
                        createdActivities.has(key)
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      icon={
                        loadingActivities.has(key) ? (
                          <LoadingOutlined />
                        ) : createdActivities.has(key) ? (
                          <CheckCircleOutlined />
                        ) : (
                          <PlusOutlined />
                        )
                      }
                    >
                      {loadingActivities.has(key)
                        ? t("planner.activity.loading")
                        : createdActivities.has(key)
                        ? t("planner.activity.created")
                        : t("planner.activity.createTooltip")}
                    </Button>
                  </Tooltip>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      ))}

      {data.additional_info && (
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t("planner.additionalInfo")}
          </h3>
          <p className="text-gray-700">{data.additional_info}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProcessOutput;
