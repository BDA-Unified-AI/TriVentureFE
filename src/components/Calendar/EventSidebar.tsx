// EventSidebar.tsx
import React from "react";
import { EventApi } from "@fullcalendar/core";
import { formatDate } from "@fullcalendar/core";
import { Card, List, Checkbox, Typography, Divider } from "antd";

const { Title, Text } = Typography;

interface EventSidebarProps {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  onWeekendsToggle: () => void;
}

const EventSidebar: React.FC<EventSidebarProps> = ({
  weekendsVisible,
  currentEvents,
  onWeekendsToggle,
}) => {
  return (
    <div
      className="event-sidebar"
      style={{ padding: "16px", background: "#f9f9f9" }}
    >
      <Card style={{ marginBottom: "16px" }}>
        <Title level={4}>Instructions</Title>
        <List
          size="small"
          bordered
          dataSource={[
            "Select dates and you will be prompted to create a new event",
            "Drag, drop, and resize events",
            "Click an event to delete it",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>

      <Card style={{ marginBottom: "16px" }}>
        <Checkbox checked={weekendsVisible} onChange={onWeekendsToggle}>
          Toggle weekends
        </Checkbox>
      </Card>

      <Card>
        <Title level={4}>All Events ({currentEvents.length})</Title>
        <Divider />
        <List
          dataSource={currentEvents}
          renderItem={(event) => (
            <List.Item>
              <div>
                <Text strong>
                  {formatDate(event.start!, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <br />
                <Text>{event.title}</Text>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default EventSidebar;
