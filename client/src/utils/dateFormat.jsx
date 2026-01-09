import moment from "moment";

export const dateFormat = (dateInput) => {
  try {
    if (!dateInput) {
      console.warn("dateFormat received null/undefined input");
      return "N/A";
    }

    if (moment.isMoment(dateInput) && dateInput.isValid()) {
      return dateInput.format("DD/MM/YYYY");
    }

    if (typeof dateInput === "string") {
      let m;

      if (dateInput.includes("T") && dateInput.endsWith("Z")) {
        m = moment.utc(dateInput).local();
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        m = moment(dateInput, "YYYY-MM-DD");
      } else if (/^\d{4}-\d{2}-\d{2} /.test(dateInput)) {
        m = moment(dateInput, "YYYY-MM-DD HH:mm:ss");
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateInput)) {
        m = moment(dateInput, "DD/MM/YYYY");
      } else {
        m = moment(dateInput);
      }

      if (m.isValid()) {
        return m.format("DD/MM/YYYY");
      } else {
        console.warn("Invalid date string:", dateInput);
        return "Invalid Date";
      }
    }

    if (dateInput instanceof Date) {
      if (isNaN(dateInput.getTime())) {
        console.warn("Invalid Date object:", dateInput);
        return "Invalid Date";
      }
      return moment(dateInput).format("DD/MM/YYYY");
    }

    if (typeof dateInput === "number") {
      const m = moment(dateInput);
      if (m.isValid()) {
        return m.format("DD/MM/YYYY");
      }
    }
    // console.warn("Could not parse date input:", dateInput, typeof dateInput);
    return "Invalid Date";
  } catch (error) {
    // console.error("Error in dateFormat:", error, "Input:", dateInput);
    return "Error";
  }
};

export const timeFormat = (dateInput) => {
  if (!dateInput) return "No time";

  const m = moment(dateInput);

  if (!m.isValid()) return "No time";

  if (m.hour() === 0 && m.minute() === 0 && m.second() === 0) {
    return "No time";
  }

  return m.format("hh:mm A");
};

export const formatDateOnly = (dateInput) => {
  try {
    if (!dateInput) {
      return "N/A";
    }

    const m = moment(dateInput);

    if (!m.isValid()) {
      return "Invalid Date";
    }

    return m.format("DD/MM/YYYY");
  } catch (error) {
    return "Error";
  }
};

export const formatTimeOnly = (dateInput) => {
  try {
    if (!dateInput) {
      return "No time";
    }

    const m = moment(dateInput);

    if (!m.isValid()) {
      return "No time";
    }

    return m.format("hh:mm A");
  } catch (error) {
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
    return "N/A";
  }
};

export const formatForAPI = (dateInput) => {
  try {
    if (typeof dateInput === "string" && dateInput.includes("/")) {
      const parts = dateInput.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
    }

    const m = moment(dateInput);
    if (m.isValid()) {
      return m.format("YYYY-MM-DD");
    }

    return dateInput;
  } catch (error) {
    console.error("Error in formatForAPI:", error);
    return dateInput;
  }
};

export const isSameDay = (date1, date2) => {
  try {
    const m1 = moment(date1);
    const m2 = moment(date2);

    if (!m1.isValid() || !m2.isValid()) {
      return false;
    }

    return m1.format("DD/MM/YYYY") === m2.format("DD/MM/YYYY");
  } catch (error) {
    return false;
  }
};

export const hasTimeComponent = (dateInput) => {
  try {
    if (!dateInput) return false;

    const dateStr = String(dateInput);

    if (dateStr.includes("T") && dateStr.includes(":")) {
      return true;
    }

    const timePatterns = [
      /\d{1,2}:\d{2}(:\d{2})?\s*(AM|PM|am|pm)?/i,
      /\s+\d{1,2}:\d{2}(:\d{2})?/,
    ];

    return timePatterns.some((pattern) => pattern.test(dateStr));
  } catch (error) {
    return false;
  }
};
