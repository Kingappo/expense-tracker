// import moment from "moment";

// export const dateFormat = (dateInput) => {
//   try {
//     if (!dateInput) {
//       return "N/A";
//     }

//     // Parse the date - if it's stored as UTC in DB, moment will handle it correctly
//     const m = moment(dateInput);

//     if (!m.isValid()) {
//       return "Invalid Date";
//     }

//     // Display in local timezone
//     return m.local().format("DD/MM/YYYY");
//   } catch (error) {
//     console.error("dateFormat error:", error);
//     return "Error";
//   }
// };

// export const timeFormat = (dateInput) => {
//   try {
//     if (!dateInput) return "No time";

//     const m = moment(dateInput);

//     if (!m.isValid()) return "No time";

//     // Check if time is midnight (00:00)
//     const localTime = m.local();
//     if (
//       localTime.hour() === 0 &&
//       localTime.minute() === 0 &&
//       localTime.second() === 0
//     ) {
//       return "No time";
//     }

//     return localTime.format("hh:mm A");
//   } catch (error) {
//     console.error("timeFormat error:", error);
//     return "No time";
//   }
// };

// export const formatDateOnly = (dateInput) => {
//   try {
//     if (!dateInput) return "N/A";

//     const m = moment(dateInput);
//     if (!m.isValid()) return "Invalid Date";

//     return m.local().format("DD/MM/YYYY");
//   } catch (error) {
//     console.error("formatDateOnly error:", error);
//     return "Error";
//   }
// };

// export const formatTimeOnly = (dateInput) => {
//   try {
//     if (!dateInput) return "No time";

//     const m = moment(dateInput);
//     if (!m.isValid()) return "No time";

//     const localTime = m.local();
//     return localTime.format("hh:mm A");
//   } catch (error) {
//     console.error("formatTimeOnly error:", error);
//     return "No time";
//   }
// };

// export const formatForChart = (dateInput) => {
//   try {
//     const formatted = dateFormat(dateInput);
//     if (formatted === "Invalid Date" || formatted === "Error") {
//       return "N/A";
//     }
//     return formatted;
//   } catch (error) {
//     console.error("formatForChart error:", error);
//     return "N/A";
//   }
// };

// dateFormat.jsx - UPDATED VERSION

import moment from "moment";

export const dateFormat = (dateInput) => {
  try {
    if (!dateInput) {
      return "N/A";
    }

    // If it's already in YYYY-MM-DD format (from backend), parse it directly
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

    // For other formats, use moment
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

    // For dates from backend (YYYY-MM-DD), always return "No time"
    if (
      typeof dateInput === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ) {
      return "No time";
    }

    const m = moment(dateInput);

    if (!m.isValid()) {
      return "No time";
    }

    // Check if time is midnight (00:00)
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

    const date = new Date(dateObject);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("formatForBackend error:", error);
    return "";
  }
};

// FIXED VERSION of formatForBackend:
// export const formatForBackend = (dateObject) => {
//   try {
//     if (!dateObject) return "";

//     // If it's already a Date object
//     const date = dateObject instanceof Date ? dateObject : new Date(dateObject);

//     // Get local date components (NOT UTC!)
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   } catch (error) {
//     console.error("formatForBackend error:", error);
//     return "";
//   }
// };
