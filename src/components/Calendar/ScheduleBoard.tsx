import { useState, useRef, useEffect } from "react";
import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventChangeArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, fecthData } from "./EventUtils";
import {
  Modal,
  Form,
  Input,
  notification,
  Select,
  Button,
  Tooltip,
  Card,
  Tag,
  Divider,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import {
  createAnActivity,
  updateActivity,
  deleteActivity,
} from "../../apis/schedule";
import {
  ReloadOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

// Enhanced color palette with Vietnamese travel themes
const EVENT_COLORS = {
  sightseeing: {
    backgroundColor: "#FF9800", // Orange for sightseeing
    borderColor: "#F57C00",
    textColor: "#FFFFFF",
    icon: "🏛️",
  },
  food: {
    backgroundColor: "#E91E63", // Pink for food experiences
    borderColor: "#C2185B",
    textColor: "#FFFFFF",
    icon: "🍜",
  },
  nature: {
    backgroundColor: "#4CAF50", // Green for nature activities
    borderColor: "#388E3C",
    textColor: "#FFFFFF",
    icon: "🌿",
  },
  culture: {
    backgroundColor: "#9C27B0", // Purple for cultural experiences
    borderColor: "#7B1FA2",
    textColor: "#FFFFFF",
    icon: "🏮",
  },
  transportation: {
    backgroundColor: "#2196F3", // Blue for transportation
    borderColor: "#1976D2",
    textColor: "#FFFFFF",
    icon: "🚗",
  },
  accommodation: {
    backgroundColor: "#FFC107", // Amber for accommodation
    borderColor: "#FFA000",
    textColor: "#000000",
    icon: "🏨",
  },
  other: {
    backgroundColor: "#607D8B", // Blue-grey for other
    borderColor: "#455A64",
    textColor: "#FFFFFF",
    icon: "📅",
  },
};

// Vietnamese travel destinations for suggestions
const VIETNAM_DESTINATIONS = [
  "Hà Nội",
  "Hồ Chí Minh City",
  "Hội An",
  "Đà Lạt",
  "Hạ Long Bay",
  "Phú Quốc",
  "Nha Trang",
  "Sapa",
  "Huế",
  "Mũi Né",
  "Đà Nẵng",
  "Cần Thơ",
  "Quy Nhơn",
];

// Types
interface EventForm {
  id?: string;
  title: string;
  type: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  notes?: string;
}

interface ScheduleBoardState {
  weekendsVisible: boolean;
  currentEvents: EventForm[];
  isModalVisible: boolean;
  isEditMode: boolean;
  isRefetching: boolean;
  isLoading: boolean;
  showHelp: boolean;
  eventForm: EventForm;
}

interface EventArgsRef {
  value: unknown;
}

// Custom hooks
const useCalendarState = () => {
  const [state, setState] = useState<ScheduleBoardState>({
    weekendsVisible: true,
    currentEvents: [],
    isModalVisible: false,
    isEditMode: false,
    isRefetching: false,
    isLoading: false,
    showHelp: false,
    eventForm: {
      title: "",
      type: "",
      start: "",
      end: "",
      allDay: false,
      location: "",
      notes: "",
    },
  });

  const updateState = (updates: Partial<ScheduleBoardState>) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  return { state, updateState };
};

// Components
const CalendarHeader = ({
  onRefresh,
  isRefetching,
  onToggleHelp,
}: {
  onRefresh: () => void;
  isRefetching: boolean;
  onToggleHelp: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col xs={24} sm={12}>
        <div className="flex items-center gap-2">
          <Title level={4} style={{ margin: 0 }}>
            <CalendarOutlined
              style={{ color: "#1890ff", marginRight: "8px" }}
            />
            {t("Vietnam Travel Calendar")}
          </Title>
          <Tooltip title={t("View Guide")}>
            <Button
              type="text"
              icon={<QuestionCircleOutlined />}
              onClick={onToggleHelp}
            />
          </Tooltip>
        </div>
      </Col>
      <Col xs={24} sm={12} className="flex justify-end">
        <Button
          onClick={onRefresh}
          loading={isRefetching}
          icon={<ReloadOutlined />}
          type="primary"
          style={{
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {t("Refresh Calendar")}
        </Button>
      </Col>
    </Row>
  );
};

const QuickGuide = ({ onViewMore }: { onViewMore: () => void }) => {
  const { t } = useTranslation();

  return (
    <Card
      title={t("Quick Guide")}
      size="small"
      className="h-full"
      extra={
        <Button type="text" size="small" onClick={onViewMore}>
          {t("View More")}
        </Button>
      }
    >
      <ul className="list-disc pl-4">
        <li>{t("Click on a date to create new event")}</li>
        <li>{t("Drag and drop to change time")}</li>
        <li>{t("Click on event to edit")}</li>
        <li>{t("Use colors to categorize activities")}</li>
      </ul>
    </Card>
  );
};

const ActivityTypes = () => {
  const { t } = useTranslation();

  return (
    <Card title={t("Activity Types")} size="small" className="h-full">
      <div className="flex flex-wrap gap-2">
        {Object.entries(EVENT_COLORS).map(([key, value]) => (
          <Tag
            key={key}
            color={value.backgroundColor}
            style={{
              color: value.textColor,
              padding: "4px 8px",
              borderRadius: "4px",
              margin: "2px",
            }}
          >
            {value.icon} {t(key.charAt(0).toUpperCase() + key.slice(1))}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

const UpcomingEvents = ({
  events,
  weekendsVisible,
  onToggleWeekends,
}: {
  events: EventForm[];
  weekendsVisible: boolean;
  onToggleWeekends: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <Title level={5} style={{ margin: 0 }}>
          <ClockCircleOutlined style={{ marginRight: "8px" }} />
          {t("Upcoming Events")} ({events.length})
        </Title>
        <Button type="text" size="small" onClick={onToggleWeekends}>
          {weekendsVisible ? t("Hide Weekends") : t("Show Weekends")}
        </Button>
      </div>
      <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
        {events.length > 0 ? (
          <ul className="divide-y">
            {events.map((event) => (
              <li key={event.id} className="py-2">
                <div className="flex items-start gap-2">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5"
                    style={{
                      backgroundColor:
                        EVENT_COLORS[event.type as keyof typeof EVENT_COLORS]
                          ?.backgroundColor || "#607D8B",
                    }}
                  ></div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    {event.location && (
                      <div className="text-sm text-gray-600">
                        <EnvironmentOutlined
                          style={{ fontSize: "12px", marginRight: "4px" }}
                        />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <div className="text-lg">
                    {EVENT_COLORS[event.type as keyof typeof EVENT_COLORS]
                      ?.icon || "📅"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4 text-gray-500">
            {t("No events yet. Create your first event!")}
          </div>
        )}
      </div>
    </div>
  );
};

const EventFormModal = ({
  isVisible,
  isEditMode,
  eventForm,
  onCancel,
  onSubmit,
  onDelete,
  isMobile,
}: {
  isVisible: boolean;
  isEditMode: boolean;
  eventForm: EventForm;
  onCancel: () => void;
  onSubmit: (values: Record<string, string>) => void;
  onDelete?: () => void;
  isMobile: boolean;
}) => {
  const { t } = useTranslation();
  const formRef = useRef<any>(null);

  useEffect(() => {
    if (isVisible && formRef.current) {
      formRef.current.setFieldsValue({
        title: eventForm.title,
        type: eventForm.type,
        location: eventForm.location,
        notes: eventForm.notes,
      });
    }
  }, [isVisible, eventForm]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
          <span>{isEditMode ? t("Update Event") : t("Create New Event")}</span>
        </div>
      }
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={isMobile ? 300 : 600}
      centered
      maskClosable={false}
      destroyOnClose
    >
      <Form
        ref={formRef}
        initialValues={eventForm}
        onFinish={onSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  <span style={{ color: "#ff4d4f" }}>*</span> {t("Title")}
                </span>
              }
              name="title"
              rules={[{ required: true, message: t("Please enter a title!") }]}
            >
              <Input
                placeholder={t(
                  "Example: Visit Hoan Kiem Lake, Eat at Bat Dan Pho..."
                )}
                prefix={<EditOutlined style={{ color: "#bfbfbf" }} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  <span style={{ color: "#ff4d4f" }}>*</span>{" "}
                  {t("Activity Type")}
                </span>
              }
              name="type"
              rules={[
                {
                  required: true,
                  message: t("Please select an activity type!"),
                },
              ]}
            >
              <Select
                placeholder={t("Select activity type")}
                optionLabelProp="label"
              >
                <Select.Option value="sightseeing" label={t("Sightseeing")}>
                  <span>🏛️ {t("Sightseeing")}</span>
                </Select.Option>
                <Select.Option value="food" label={t("Food")}>
                  <span>🍜 {t("Food")}</span>
                </Select.Option>
                <Select.Option value="nature" label={t("Nature")}>
                  <span>🌿 {t("Nature")}</span>
                </Select.Option>
                <Select.Option value="culture" label={t("Culture")}>
                  <span>🏮 {t("Culture")}</span>
                </Select.Option>
                <Select.Option
                  value="transportation"
                  label={t("Transportation")}
                >
                  <span>🚗 {t("Transportation")}</span>
                </Select.Option>
                <Select.Option value="accommodation" label={t("Accommodation")}>
                  <span>🏨 {t("Accommodation")}</span>
                </Select.Option>
                <Select.Option value="other" label={t("Other")}>
                  <span>📅 {t("Other")}</span>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Location")} name="location">
              <Select
                placeholder={t("Select location")}
                allowClear
                showSearch
                optionFilterProp="children"
                defaultValue="Quy Nhơn"
              >
                {VIETNAM_DESTINATIONS.map((destination) => (
                  <Select.Option key={destination} value={destination}>
                    <EnvironmentOutlined /> {destination}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={t("Notes")} name="notes">
          <Input.TextArea
            placeholder={t("Add notes about this activity...")}
            rows={3}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              style={{
                borderRadius: "6px",
                height: "40px",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isEditMode ? t("Update") : t("Save Event")}
            </Button>
            {isEditMode && onDelete && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{
                  borderRadius: "6px",
                  height: "40px",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t("Delete Event")}
              </Button>
            )}
            <Button
              onClick={onCancel}
              style={{
                borderRadius: "6px",
                height: "40px",
                padding: "0 20px",
              }}
            >
              {t("Cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const HelpModal = ({
  isVisible,
  onClose,
  isMobile,
}: {
  isVisible: boolean;
  onClose: () => void;
  isMobile: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("How to Use the Travel Calendar")}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          {t("Close")}
        </Button>,
      ]}
      width={isMobile ? 300 : 700}
    >
      <div className="help-content">
        <Title level={4}>{t("How to Use the Travel Calendar")}</Title>
        <Paragraph>
          {t(
            "This travel calendar helps you plan your Vietnam trip easily and efficiently."
          )}
        </Paragraph>

        <Title level={5}>{t("Main Features")}:</Title>
        <ul>
          <li>
            <strong>{t("View Calendar")}:</strong>{" "}
            {t("Switch between day, week and month views")}
          </li>
          <li>
            <strong>{t("Create Event")}:</strong>{" "}
            {t("Click on date and time to create new event")}
          </li>
          <li>
            <strong>{t("Edit Event")}:</strong>{" "}
            {t("Drag and drop to change time, or click event to edit details")}
          </li>
          <li>
            <strong>{t("Categorize")}:</strong>{" "}
            {t("Use different colors to categorize activities")}
          </li>
        </ul>

        <Title level={5}>{t("Travel Planning Tips")}:</Title>
        <ul>
          <li>{t("Start with city's main attractions")}</li>
          <li>{t("Make time for local cuisine")}</li>
          <li>{t("Consider travel time between locations")}</li>
          <li>{t("Mix cultural and nature activities")}</li>
        </ul>

        <Paragraph>
          <InfoCircleOutlined />{" "}
          {t(
            "This calendar is designed to help you make the most of your Vietnam trip!"
          )}
        </Paragraph>
      </div>
    </Modal>
  );
};

// Main component
export default function ScheduleBoard() {
  const { t } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const initialEventArgsRef = useRef<EventArgsRef>({ value: null });
  const { state, updateState } = useCalendarState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Event handlers
  const handleRefresh = async () => {
    updateState({ isRefetching: true });
    try {
      const events = await fecthData(initialEventArgsRef.current.value);
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(events);
        notification.success({
          message: t("Updated"),
          description: t("Events have been updated"),
        });
      }
    } catch (error) {
      notification.error({
        message: t("Update error"),
        description: t("Could not update events"),
      });
    } finally {
      updateState({ isRefetching: false });
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    updateState({
      isModalVisible: true,
      isEditMode: false,
      eventForm: {
        title: "",
        type: "",
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        location: "Quy Nhơn",
        notes: "",
      },
    });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    updateState({
      isModalVisible: true,
      isEditMode: true,
      eventForm: {
        id: event.id,
        title: event.title,
        type: event.extendedProps.type || "",
        start: event.startStr,
        end: event.endStr,
        allDay: event.allDay,
        location: event.extendedProps.location || "",
        notes: event.extendedProps.notes || "",
      },
    });
  };

  const handleEvents = (events: any) => {
    updateState({ currentEvents: events });
  };

  const handleEventDrop = async (dropInfo: EventDropArg | EventChangeArg) => {
    const event = dropInfo.event;
    const newStart = event.startStr;
    const newEnd = event.endStr;
    const eventId = event.id;
    const title = event.title;
    const type = event.extendedProps.type;

    try {
      const response = await updateActivity(
        eventId,
        title,
        type,
        newStart,
        newEnd
      );

      if (response.status === 200) {
        notification.success({
          message: t("Updated successfully"),
          description: t("Event has been updated successfully."),
        });
      } else {
        notification.error({
          message: t("Update failed"),
          description: t("Event was not updated. Please try again."),
        });
        dropInfo.revert();
      }
    } catch {
      notification.error({
        message: t("Error"),
        description: t(
          "An error occurred while updating the event. Please try again."
        ),
      });
      dropInfo.revert();
    }
  };

  const handleEventResize = async (
    resizeInfo: EventDropArg | EventChangeArg
  ) => {
    const event = resizeInfo.event;
    const newStart = event.startStr;
    const newEnd = event.endStr;
    const eventId = event.id;
    const title = event.title;
    const type = event.extendedProps.type;

    try {
      const response = await updateActivity(
        eventId,
        title,
        type,
        newStart,
        newEnd
      );

      if (response.status === 200) {
        notification.success({
          message: t("Updated successfully"),
          description: t("Event has been updated successfully."),
        });
      } else {
        notification.error({
          message: t("Update failed"),
          description: t("Event was not updated. Please try again."),
        });
        resizeInfo.revert();
      }
    } catch {
      notification.error({
        message: t("Error"),
        description: t(
          "An error occurred while updating the event. Please try again."
        ),
      });
      resizeInfo.revert();
    }
  };

  const handleCancel = () => {
    updateState({
      isModalVisible: false,
      isEditMode: false,
      eventForm: {
        title: "",
        type: "",
        start: "",
        end: "",
        allDay: false,
        location: "",
        notes: "",
      },
    });
  };

  const handleFormSubmit = async (values: Record<string, string>) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      notification.error({
        message: t("Error"),
        description: t("Calendar API not available."),
      });
      return;
    }

    try {
      if (state.isEditMode) {
        const response = await updateActivity(
          state.eventForm.id!,
          values.title,
          values.type,
          state.eventForm.start,
          state.eventForm.end
        );
        if (response.status === 200) {
          const event = calendarApi.getEventById(state.eventForm.id!);
          if (event) {
            event.setProp("title", values.title);
            event.setExtendedProp("type", values.type);
            event.setExtendedProp("location", values.location || "");
            event.setExtendedProp("notes", values.notes || "");
          }

          notification.success({
            message: t("Event updated"),
            description: t("Event has been updated successfully."),
          });

          handleCancel();
        } else {
          throw new Error("Failed to update event");
        }
      } else {
        const activity_id = createEventId();
        const createResponse = await createAnActivity(
          activity_id,
          values.title,
          values.type,
          state.eventForm.start,
          state.eventForm.end
        );
        if (createResponse.status === 201) {
          const colors = EVENT_COLORS[values.type as keyof typeof EVENT_COLORS];
          const newEvent = {
            id: activity_id,
            title: values.title,
            start: state.eventForm.start,
            end: state.eventForm.end,
            allDay: state.eventForm.allDay,
            backgroundColor: colors?.backgroundColor,
            borderColor: colors?.borderColor,
            textColor: colors?.textColor,
            extendedProps: {
              type: values.type,
              location: values.location || "",
              notes: values.notes || "",
            },
          };

          calendarApi.addEvent(newEvent);

          notification.success({
            message: t("Event created"),
            description: t("New event has been created successfully."),
          });

          handleCancel();
        } else {
          throw new Error("Failed to create event");
        }
      }
    } catch {
      notification.error({
        message: t("Operation failed"),
        description: state.isEditMode
          ? t("Could not update event. Please try again.")
          : t("Could not create event. Please try again."),
      });
    }
  };

  const handleDeleteEvent = async () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi || !state.eventForm.id) {
      notification.error({
        message: t("Error"),
        description: t("Could not delete event. Please try again."),
      });
      return;
    }

    try {
      const response = await deleteActivity(state.eventForm.id);

      if (response.status === 200) {
        const event = calendarApi.getEventById(state.eventForm.id);
        if (event) {
          event.remove();
        }

        notification.success({
          message: t("Event deleted"),
          description: t("Event has been deleted successfully."),
        });

        handleCancel();
      } else {
        throw new Error("Failed to delete event");
      }
    } catch {
      notification.error({
        message: t("Delete error"),
        description: t("Could not delete event. Please try again."),
      });
    }
  };

  const toggleWeekends = () => {
    updateState({ weekendsVisible: !state.weekendsVisible });
  };

  const toggleHelp = () => {
    updateState({ showHelp: !state.showHelp });
  };

  // Render sidebar
  const renderSidebar = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
        <CalendarHeader
          onRefresh={handleRefresh}
          isRefetching={state.isRefetching}
          onToggleHelp={toggleHelp}
        />

        <Divider style={{ margin: "12px 0" }} />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <QuickGuide onViewMore={toggleHelp} />
          </Col>
          <Col xs={24} md={12}>
            <ActivityTypes />
          </Col>
        </Row>

        <Divider style={{ margin: "12px 0" }} />

        <UpcomingEvents
          events={state.currentEvents}
          weekendsVisible={state.weekendsVisible}
          onToggleWeekends={toggleWeekends}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-scroll">
      <div className="mb-10 relative">
        {state.isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!isMobile && <div className="mb-4">{renderSidebar()}</div>}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: isMobile ? "prev,next" : "prev,next today",
              center: "title",
              right: isMobile ? "dayGridMonth" : "timeGridDay,timeGridWeek,dayGridMonth",
            }}
            initialView={isMobile ? "dayGridMonth" : "timeGridWeek"}
            editable={true}
            selectable={true}
            selectMirror={true}
            weekends={state.weekendsVisible}
            initialEvents={async (e: any) => {
              updateState({ isLoading: true });
              try {
                initialEventArgsRef.current.value = e;
                const events = await fecthData(e);
                return events;
              } catch (error) {
                notification.error({
                  message: t("Error"),
                  description: t("Failed to load events"),
                });
                return [];
              } finally {
                updateState({ isLoading: false });
              }
            }}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            eventDrop={handleEventDrop}
            eventDurationEditable={true}
            eventResize={handleEventResize}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventContent={(eventContent) => {
              const type = (eventContent.event.extendedProps.type ||
                "other") as keyof typeof EVENT_COLORS;
              const icon = EVENT_COLORS[type]?.icon || "📅";
              return (
                <div
                  style={{
                    padding: isMobile ? "2px 4px" : "4px 6px",
                    overflowY: "hidden",
                    color: EVENT_COLORS[type]?.textColor || "#000000",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    fontSize: isMobile ? "0.8em" : "1em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{icon}</span>
                    <b>{eventContent.timeText}</b>
                  </div>
                  <div style={{ fontWeight: "bold", marginTop: "2px" }}>
                    {eventContent.event.title}
                  </div>
                  {eventContent.event.extendedProps.location && (
                    <div style={{ fontSize: "0.8em", opacity: 0.9 }}>
                      <EnvironmentOutlined />{" "}
                      {eventContent.event.extendedProps.location}
                    </div>
                  )}
                </div>
              );
            }}
            eventDidMount={(info) => {
              const type = info.event.extendedProps.type || "other";
              const colors = EVENT_COLORS[type as keyof typeof EVENT_COLORS];
              if (colors) {
                info.el.style.backgroundColor = colors.backgroundColor;
                info.el.style.borderColor = colors.borderColor;
                info.el.style.borderRadius = "6px";
                info.el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }
            }}
            timeZone="Asia/Ho_Chi_Minh"
            selectConstraint={{
              startTime: "00:00",
              endTime: "24:00",
            }}
            selectOverlap={false}
            selectAllow={(_) => true}
            selectMinDistance={isMobile ? 10 : 5}
            eventMaxStack={isMobile ? 2 : 3}
            stickyHeaderDates={true}
            nowIndicator={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
              startTime: "00:00",
              endTime: "24:00",
            }}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            expandRows={true}
            handleWindowResize={true}
            contentHeight="auto"
            aspectRatio={isMobile ? 1.2 : 1.8}
            firstDay={1}
            weekNumbers={false}
            weekNumberCalculation="ISO"
            weekText={t("Week")}
            allDayText={t("All Day")}
            moreLinkText={t("+%d events", { count: 0 })}
            noEventsText={t("No events yet. Create your first event!")}
            loading={(isLoading) => {
              if (isLoading) {
                updateState({ isLoading: true });
              } else {
                updateState({ isLoading: false });
              }
            }}
          />
        </div>
        {isMobile && <div className="mb-4">{renderSidebar()}</div>}
        <EventFormModal
          isVisible={state.isModalVisible}
          isEditMode={state.isEditMode}
          eventForm={state.eventForm}
          onCancel={handleCancel}
          onSubmit={handleFormSubmit}
          onDelete={state.isEditMode ? handleDeleteEvent : undefined}
          isMobile={isMobile}
        />
        <HelpModal isVisible={state.showHelp} onClose={toggleHelp} isMobile={isMobile} />
      </div>
    </div>
  );
}
