import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const timeFormat = (date) => {
  return moment(date).format("hh:mm A");
};
