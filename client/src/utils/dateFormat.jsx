import moment from "moment";

export const dateFormat = (dateInput) => {
  try {
    if (!dateInput) {
      return "N/A";
    }

    // Parse the date - if it's stored as UTC in DB, moment will handle it correctly
    const m = moment(dateInput);

    if (!m.isValid()) {
      return "Invalid Date";
    }

    // Display in local timezone
    return m.local().format("DD/MM/YYYY");
  } catch (error) {
    console.error("dateFormat error:", error);
    return "Error";
  }
};

export const timeFormat = (dateInput) => {
  try {
    if (!dateInput) return "No time";

    const m = moment(dateInput);

    if (!m.isValid()) return "No time";

    // Check if time is midnight (00:00)
    const localTime = m.local();
    if (
      localTime.hour() === 0 &&
      localTime.minute() === 0 &&
      localTime.second() === 0
    ) {
      return "No time";
    }

    return localTime.format("hh:mm A");
  } catch (error) {
    console.error("timeFormat error:", error);
    return "No time";
  }
};

export const formatDateOnly = (dateInput) => {
  try {
    if (!dateInput) return "N/A";

    const m = moment(dateInput);
    if (!m.isValid()) return "Invalid Date";

    return m.local().format("DD/MM/YYYY");
  } catch (error) {
    console.error("formatDateOnly error:", error);
    return "Error";
  }
};

export const formatTimeOnly = (dateInput) => {
  try {
    if (!dateInput) return "No time";

    const m = moment(dateInput);
    if (!m.isValid()) return "No time";

    const localTime = m.local();
    return localTime.format("hh:mm A");
  } catch (error) {
    console.error("formatTimeOnly error:", error);
    return "No time";
  }
};

export const formatForChart = (dateInput) => {
  try {
    const formatted = dateFormat(dateInput);
    if (formatted === "Invalid Date" || formatted === "Error") {
      return "N/A";
    }
    return formatted;
  } catch (error) {
    console.error("formatForChart error:", error);
    return "N/A";
  }
};
