// import moment from "moment";

// export const dateFormat = (dateInput) => {
//   try {
//     if (!dateInput) {
//       return "N/A";
//     }

//     // Always parse as UTC first, then convert to local time for display
//     const m = moment.utc(dateInput);

//     if (!m.isValid()) {
//       return "Invalid Date";
//     }

//     // Convert to local time and format
//     return m.local().format("DD/MM/YYYY");
//   } catch (error) {
//     return "Error";
//   }
// };

// export const timeFormat = (dateInput) => {
//   try {
//     if (!dateInput) return "No time";

//     const m = moment.utc(dateInput);

//     if (!m.isValid()) return "No time";

//     // Convert to local time
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
//     return "No time";
//   }
// };

// export const formatDateOnly = (dateInput) => {
//   try {
//     if (!dateInput) return "N/A";

//     const m = moment.utc(dateInput);
//     if (!m.isValid()) return "Invalid Date";

//     return m.local().format("DD/MM/YYYY");
//   } catch (error) {
//     return "Error";
//   }
// };

// export const formatTimeOnly = (dateInput) => {
//   try {
//     if (!dateInput) return "No time";

//     const m = moment.utc(dateInput);
//     if (!m.isValid()) return "No time";

//     const localTime = m.local();
//     return localTime.format("hh:mm A");
//   } catch (error) {
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
//     return "N/A";
//   }
// };

import moment from "moment";

export const dateFormat = (dateInput) => {
  try {
    if (!dateInput) {
      return "N/A";
    }

    // Parse the date - if it has timezone info, use it; otherwise assume UTC
    const m = moment(dateInput);

    if (!m.isValid()) {
      return "Invalid Date";
    }

    // Always display in UTC format to avoid timezone confusion
    return m.utc().format("DD/MM/YYYY");
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

    // Always use UTC
    const utcTime = m.utc();

    if (
      utcTime.hour() === 0 &&
      utcTime.minute() === 0 &&
      utcTime.second() === 0
    ) {
      return "No time";
    }

    return utcTime.format("hh:mm A");
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

    return m.utc().format("DD/MM/YYYY");
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

    return m.utc().format("hh:mm A");
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
