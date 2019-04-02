import Vue from "vue";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");
const moment = require("moment");

Vue.filter("runtimeFormatted", runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
});

Vue.filter("timeAgo", date => {
  return timeAgo.format(moment(date).toDate());
});

Vue.filter("capitalize", value => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("futureDate", value => {
  const dateA = moment(new Date());
  const dateB = moment(value);
  const diff = dateB.diff(dateA, "days");
  if (diff <= 7) {
    return dateB.format("dddd");
  } else {
    return dateB.format("YYYY-MM-DD");
  }
});
