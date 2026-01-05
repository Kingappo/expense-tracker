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
    console.warn("Could not parse date input:", dateInput, typeof dateInput);
    return "Invalid Date";
  } catch (error) {
    console.error("Error in dateFormat:", error, "Input:", dateInput);
    return "Error";
  }
};

export const timeFormat = (dateInput) => {
  try {
    // Handle null/undefined
    if (!dateInput) {
      return "N/A";
    }

    // If it's already a valid moment object
    if (moment.isMoment(dateInput) && dateInput.isValid()) {
      return dateInput.format("hh:mm A");
    }

    // Handle string dates
    if (typeof dateInput === "string") {
      let m;

      // ISO format
      if (dateInput.includes("T") && dateInput.endsWith("Z")) {
        m = moment.utc(dateInput).local();
      }
      // Try default parsing
      else {
        m = moment(dateInput);
      }

      if (m.isValid()) {
        return m.format("hh:mm A");
      }
    }

    // Handle Date objects
    if (dateInput instanceof Date) {
      if (!isNaN(dateInput.getTime())) {
        return moment(dateInput).format("hh:mm A");
      }
    }

    // Handle timestamps
    if (typeof dateInput === "number") {
      const m = moment(dateInput);
      if (m.isValid()) {
        return m.format("hh:mm A");
      }
    }

    // Default
    const m = moment(dateInput);
    return m.isValid() ? m.format("hh:mm A") : "N/A";
  } catch (error) {
    console.error("Error in timeFormat:", error);
    return "N/A";
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
