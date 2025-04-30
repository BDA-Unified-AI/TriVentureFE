import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsProps, Steps, Card, notification } from "antd";
import { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CalendarOutlined,
  CompassOutlined,
  RocketOutlined,
  PictureOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import ImageRetrival from "../../components/ImageRetrival";
import ProcessOutput from "./ProcessOutput";
import PlannerForm from "./PlannerForm";
import TextRetrieval from "../../components/TextRetrieval";
import PlannerStreamOutput from "./PlannerStreamOutput";
import { DestinationItem } from "../../apis/dest";
import { API_DOMAIN } from "../../constant";
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

interface PlannerProps {
  urlParams?: {
    duration: string | null | undefined;
    interests: string | null | undefined;
    location: string | null | undefined;
    includeDestination: string | null | undefined;
  };
}

const Planner: React.FC<PlannerProps> = ({ urlParams }) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState(urlParams?.duration || "3");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const streamOutputRef = useRef<HTMLDivElement>(null);

  const [interests, setInterests] = useState(
    urlParams?.interests || "natural, cultural"
  );
  const [location, setLocation] = useState(
    urlParams?.location || "Quy Nhon, Vietnam"
  );
  const [streamData, setStreamData] = useState<string>("");
  const [lastData, setLastData] = useState<PlannerData>({
    itinerary: [],
    additional_info: "",
  });
  const [includeDestinations, setIncludeDestinations] = useState<
    DestinationItem[]
  >([]);

  // Process includeDestination parameter if present
  useEffect(() => {
    // If includeDestination parameter exists and is a valid JSON string, parse it
    if (urlParams?.includeDestination) {
      try {
        const destinations = JSON.parse(urlParams.includeDestination);
        if (Array.isArray(destinations)) {
          setIncludeDestinations(destinations);
        }
      } catch (error) {
        console.error("Failed to parse includeDestination parameter:", error);
      }
    }
  }, [urlParams?.includeDestination]);

  const url = API_DOMAIN + "planner/invoke";

  // Auto scroll to stream output when isLoading becomes true
  useEffect(() => {
    if (isLoading && streamOutputRef.current) {
      const scrollTimer = setTimeout(() => {
        streamOutputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 2000);

      return () => clearTimeout(scrollTimer);
    }
  }, [isLoading]);

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    if (dates) {
      setDateRange(dates);
      if (dates[0] && dates[1]) {
        const diffDays = dates[1].diff(dates[0], "days");
        setDuration(diffDays > 0 ? diffDays.toString() : "0");
      }
    } else {
      setDateRange([null, null]);
      setDuration("0");
    }
  };

  const handleSubmit = async () => {
    setCurrentStep(2);
    setIsLoading(true);

    const data = {
      duration,
      start_date: dateRange[0]?.format("YYYY-MM-DD") || "",
      end_date: dateRange[1]?.format("YYYY-MM-DD") || "",
      include_destination: includeDestinations,
      interests,
      location,
      nation: "Vietnamese",
      limit_interation: 5,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        try {
          const chunk = JSON.parse(decodedValue);
          processStreamedData(chunk);
        } catch (parseError) {
          console.error("Failed to parse chunk:", parseError, decodedValue);
        }
      }
    } catch (error) {
      console.error("Failed to get data:", error);
      setIsLoading(false);
      setCurrentStep(1); // Reset to form step
      notification.error({
        message: "Connection Error",
        description:
          "Failed to connect to the planning service. Please try again.",
        placement: "topRight",
        duration: 5,
      });
    }
  };

  const [api, contextHolder] = notification.useNotification();

  const processStreamedData = (chunk: {
    type: string;
    content: string | PlannerData;
  }) => {
    if (chunk.type === "error") {
      setIsLoading(false);
      setCurrentStep(1); // Reset to form step
      if (typeof chunk.content === "string") {
        api.error({
          message: "Error in planning process",
          description: chunk.content,
          placement: "topRight",
          duration: 5,
        });
      }
      return;
    }

    if (chunk.type === "message") {
      if (typeof chunk.content === "string") {
        setStreamData(chunk.content);
      }
    }
    if (chunk.type === "final") {
      if (typeof chunk.content !== "string") {
        setLastData(chunk.content);
        setActiveKey("2");
        setCurrentStep(4); // Move to final step when plan is ready
        setIsLoading(false);
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <FileTextOutlined />
          {t("planner.tab.textQuery")}
        </span>
      ),
      children: (
        <div className="flex items-center justify-center">
          <TextRetrieval
            includeDestinations={includeDestinations}
            setIncludeDestinations={setIncludeDestinations}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <PictureOutlined />
          {t("planner.tab.imageQuery")}
        </span>
      ),
      children: <ImageRetrival />,
    },
  ];
  console.log("includeDestinations", includeDestinations);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      {contextHolder}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t("planner.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("planner.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg rounded-xl">
              <Tabs
                className="mb-8"
                defaultActiveKey="1"
                centered
                items={items}
                onChange={() => {
                  setCurrentStep(0);
                }}
              />

              <div className="max-w-2xl mx-auto">
                <PlannerForm
                  dateRange={dateRange}
                  duration={duration}
                  interests={interests}
                  includeDestinations={includeDestinations}
                  location={location}
                  setInterests={setInterests}
                  setIncludeDestinations={setIncludeDestinations}
                  setLocation={setLocation}
                  setDuration={setDuration}
                  handleSubmit={handleSubmit}
                  handleDateRangeChange={handleDateRangeChange}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <div className="max-w-4xl mx-auto mb-8">
              <Steps
                current={currentStep}
                items={[
                  {
                    title: t("planner.step.chooseMethod"),
                    description: t("planner.step.chooseMethod.desc"),
                    icon: <CompassOutlined />,
                  },
                  {
                    title: t("planner.step.planDetails"),
                    description: t("planner.step.planDetails.desc"),
                    icon: <CalendarOutlined />,
                  },
                  {
                    title: t("planner.step.processing"),
                    description: t("planner.step.processing.desc"),
                    icon: <RocketOutlined />,
                  },
                  {
                    title: t("planner.step.ready"),
                    description: t("planner.step.ready.desc"),
                    icon: <RocketOutlined />,
                  },
                ]}
              />
            </div>
            <div ref={streamOutputRef}>
              {(streamData || lastData.itinerary.length > 0) && (
                <Card className="shadow-lg rounded-xl">
                  <Tabs
                    defaultActiveKey={activeKey}
                    centered
                    items={[
                      {
                        key: "1",
                        label: t("planner.tab.progress"),
                        children: (
                          <PlannerStreamOutput
                            streamData={streamData}
                            currentStep={currentStep}
                          />
                        ),
                      },
                      {
                        key: "2",
                        label: t("planner.tab.itinerary"),
                        children: lastData && <ProcessOutput data={lastData} />,
                      },
                    ]}
                  />
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Planner;
