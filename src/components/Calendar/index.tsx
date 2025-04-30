import React from "react";
import { EventApi } from "@fullcalendar/core";
import EventSidebar from "./EventSidebar";
interface SchedulingCalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  isModalVisible: boolean;
  isEditMode: boolean; // New state to track if we're editing

  eventForm: {
    id?: string;
    title: string;
    type: string;
    start: string;
    end: string;
    allDay: boolean;
  };
}

export default class Scheduling extends React.Component<
  {},
  SchedulingCalendarState
> {
  state: SchedulingCalendarState = {
    weekendsVisible: false,
    currentEvents: [],
    isModalVisible: false,
    isEditMode: false, // New state to track if we're editing

    eventForm: {
      title: "",
      type: "",
      start: "",
      end: "",
      allDay: false,
    },
  };

  render() {
    return (
      <div className="container mx-auto mb-20">
        <EventSidebar
          weekendsVisible={this.state.weekendsVisible}
          currentEvents={this.state.currentEvents}
          onWeekendsToggle={this.handleWeekendsToggle}
        />
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };
}
