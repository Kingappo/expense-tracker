import moment from "moment";

export const dateFormat = (dateInput) => {
  try {
    if (!dateInput) {
      return "N/A";
    }

    if (
      typeof dateInput === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ) {
      const [year, month, day] = dateInput.split("-").map(Number);
      return `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year}`;
    }
    const m = moment(dateInput);

    if (!m.isValid()) {
      return "Invalid Date";
    }

    return m.format("DD/MM/YYYY");
  } catch (error) {
    console.error("dateFormat error:", error);
    return "Error";
  }
};

export const timeFormat = (dateInput) => {
  try {
    if (!dateInput) return "No time";

    if (
      typeof dateInput === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ) {
      return "No time";
    }

    if (typeof dateInput === "string" && dateInput.includes("T")) {
      const m = moment(dateInput);
      if (!m.isValid()) return "No time";

      const timePart = dateInput.split("T")[1];
      if (timePart.startsWith("00:00:00")) {
        return "No time";
      }

      return m.format("hh:mm A");
    }

    const m = moment(dateInput);

    if (!m.isValid()) {
      return "No time";
    }

    if (m.hour() === 0 && m.minute() === 0 && m.second() === 0) {
      return "No time";
    }

    return m.format("hh:mm A");
  } catch (error) {
    console.error("timeFormat error:", error);
    return "No time";
  }
};

export const formatDateOnly = (dateInput) => {
  try {
    return dateFormat(dateInput);
  } catch (error) {
    console.error("formatDateOnly error:", error);
    return "Error";
  }
};

export const formatTimeOnly = (dateInput) => {
  try {
    return timeFormat(dateInput);
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

// NEW: Helper to format date for DatePicker input
export const formatForDatePicker = (dateString) => {
  try {
    if (!dateString) return null;

    // If it's in YYYY-MM-DD format from backend
    if (
      typeof dateString === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ) {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    return new Date(dateString);
  } catch (error) {
    console.error("formatForDatePicker error:", error);
    return null;
  }
};

// NEW: Helper to format date for backend (YYYY-MM-DD)
export const formatForBackend = (dateObject) => {
  try {
    if (!dateObject) return "";

    const date = dateObject instanceof Date ? dateObject : new Date(dateObject);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("formatForBackend error:", error);
    return "";
  }
};

// NEW: Helper to check if a date has time information
export const hasTimeInfo = (dateInput) => {
  try {
    if (!dateInput) return false;

    if (typeof dateInput === "string") {
      // Check if it's a full ISO string with time
      if (dateInput.includes("T")) {
        const timePart = dateInput.split("T")[1];
        return !timePart.startsWith("00:00:00");
      }
      // If it's just YYYY-MM-DD, no time
      return false;
    }

    // For Date objects
    const date = new Date(dateInput);
    return !(
      date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0
    );
  } catch (error) {
    console.error("hasTimeInfo error:", error);
    return false;
  }
};
