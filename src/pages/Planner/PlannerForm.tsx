import { DatePicker, Select, Form, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CalendarOutlined,
  CompassOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { DestinationItem, listAllDestinations } from "../../apis/dest";

interface plannerFormProps {
  dateRange: any;
  duration: string;
  interests: string;
  includeDestinations: any[];
  location: string;
  isLoading: boolean;
  setInterests: (value: string) => void;
  setIncludeDestinations: (value: any[]) => void;
  setLocation: (value: string) => void;
  setDuration: (value: string) => void;
  handleSubmit: (values: any) => void;
  handleDateRangeChange: (value: any) => void;
}

const PlannerForm: React.FC<plannerFormProps> = ({
  dateRange,
  duration,
  interests,
  includeDestinations,
  location,
  isLoading,
  setInterests,
  setIncludeDestinations,
  setLocation,
  setDuration,
  handleSubmit,
  handleDateRangeChange,
}) => {
  const { t } = useTranslation();
  const [destinationData, setDestinationData] = useState<DestinationItem[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAllDestinations = async () => {
      const response = await listAllDestinations();
      setDestinationData(response);
    };
    fetchAllDestinations();
  }, []);

  // Calculate duration based on date range
  // Initialize form with includeDestinations
  useEffect(() => {
    if (form && includeDestinations.length > 0) {
      form.setFieldsValue({
        includeDestinations: includeDestinations.map((dest) => dest.name),
      });
    }
  }, [form, includeDestinations]);

  // Calculate and validate duration based on date range
  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);

      // Calculate the difference in milliseconds
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      // Convert to days and add 1 to include both start and end dates
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 1 || diffDays > 14) {
        message.warning(t("planner.form.durationWarning"));
        // Clear the date range if it's invalid
        form.setFieldsValue({ dateRange: null });
        handleDateRangeChange(null);
      } else {
        setDuration(diffDays.toString());
        form.setFieldsValue({ duration: diffDays.toString() });
      }
    }
  }, [dateRange, setDuration, form, t, handleDateRangeChange]);

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Updated form submission handler
  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6"
        initialValues={{
          includeDestinations: includeDestinations.map((dest) => dest.name),
          dateRange: dateRange,
          duration: duration,
          interests: interests,
          location: location,
        }}
      >
        <motion.div variants={formItemVariants}>
          <Form.Item
            label={
              <span className="flex items-center gap-2">
                <CalendarOutlined className="text-blue-500" />
                <span className="font-medium">
                  {t("planner.form.travelDates")}
                </span>
              </span>
            }
            name="dateRange"
            rules={[
              { required: true, message: t("planner.form.dateRequired") },
              {
                validator: async (_, value) => {
                  if (value && value[0] && value[1]) {
                    const startDate = new Date(value[0]);
                    const endDate = new Date(value[1]);
                    const diffTime = Math.abs(
                      endDate.getTime() - startDate.getTime()
                    );
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24)
                    );

                    if (diffDays < 1 || diffDays > 14) {
                      throw new Error(t("planner.form.durationError"));
                    }
                  }
                },
              },
            ]}
          >
            <DatePicker.RangePicker
              onChange={(dates) => {
                handleDateRangeChange(dates);
              }}
              className="w-full"
              format="YYYY/MM/DD"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
        </motion.div>

        <motion.div variants={formItemVariants}>
          <Form.Item
            label={
              <span className="flex items-center gap-2">
                <CalendarOutlined className="text-blue-500" />
                <span className="font-medium">
                  {t("planner.form.duration")}
                </span>
              </span>
            }
            name="duration"
          >
            <Input
              size="large"
              className="bg-gray-50"
              suffix={t("days")}
              disabled
            />
          </Form.Item>
        </motion.div>

        <motion.div variants={formItemVariants}>
          <Form.Item
            label={
              <span className="flex items-center gap-2">
                <HeartOutlined className="text-red-500" />
                <span className="font-medium">
                  {t("planner.form.interests")}
                </span>
              </span>
            }
            name="interests"
            rules={[{ required: true, message: "Please enter your interests" }]}
          >
            <Input
              onChange={(e) => setInterests(e.target.value)}
              size="large"
              placeholder={t("planner.form.interests.placeholder")}
              className="hover:border-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </Form.Item>
        </motion.div>

        <motion.div variants={formItemVariants}>
          <Form.Item
            label={
              <span className="flex items-center gap-2">
                <CompassOutlined className="text-green-500" />
                <span className="font-medium">
                  {t("planner.form.mustVisit")}
                </span>
              </span>
            }
            name="includeDestinations"
          >
            <Select
              size="large"
              mode="multiple"
              value={includeDestinations.map((dest) => dest.name)}
              onChange={(value) => {
                // Convert selected values back to destination objects
                const newDestinations = value.map((name) => {
                  // First try to find in destinationData
                  const fromData = destinationData.find((d) => d.name === name);
                  if (fromData) return fromData;

                  // If not in destinationData, check includeDestinations
                  const fromInclude = includeDestinations.find(
                    (d) => d.name === name
                  );
                  if (fromInclude) return fromInclude;

                  // If not found anywhere, create a new destination object
                  return {
                    id: "",
                    name: name,
                    description: "",
                    image: "",
                  };
                });

                setIncludeDestinations(newDestinations);
                form.setFieldValue("includeDestinations", value);
              }}
              placeholder={t("planner.form.mustVisit.placeholder")}
              className="hover:border-blue-500 focus:border-blue-500"
              optionFilterProp="children"
              showSearch
              disabled={isLoading}
            >
              {/* Show options from destinationData */}
              {destinationData.map((dest) => (
                <Select.Option key={dest.id} value={dest.name}>
                  {dest.name}
                </Select.Option>
              ))}
              {/* Show additional options from includeDestinations that aren't in destinationData */}
              {includeDestinations
                .filter(
                  (dest) => !destinationData.some((d) => d.name === dest.name)
                )
                .map((dest) => (
                  <Select.Option key={dest.name} value={dest.name}>
                    {dest.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </motion.div>

        <motion.div variants={formItemVariants}>
          <Form.Item
            label={
              <span className="flex items-center gap-2">
                <EnvironmentOutlined className="text-red-500" />
                <span className="font-medium">
                  {t("planner.form.mainLocation")}
                </span>
              </span>
            }
            name="location"
            rules={[
              { required: true, message: "Please select a main location" },
            ]}
          >
            <Select
              onChange={setLocation}
              size="large"
              className="hover:border-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              <Select.Option value="Quy Nhon, Vietnam">
                {t("planner.location.quyNhon")}
              </Select.Option>
              {/* <Select.Option value="Nha Trang, Vietnam">
                {t("planner.location.nhaTrang")}
              </Select.Option>
              <Select.Option value="Da Nang, Vietnam">
                {t("planner.location.daNang")}
              </Select.Option> */}
            </Select>
          </Form.Item>
        </motion.div>

        <motion.div variants={formItemVariants} className="pt-4">
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 border-none"
              icon={isLoading ? <LoadingOutlined /> : <CalendarOutlined />}
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading
                ? t("planner.form.submitting")
                : t("planner.form.submit")}
            </Button>
          </Form.Item>
        </motion.div>
      </Form>
    </motion.div>
  );
};

export default PlannerForm;
