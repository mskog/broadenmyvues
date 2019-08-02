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

Vue.filter("seasonEpisode", episode => {
  const paddedSeason = episode.season.toString().padStart(2, "0");
  const paddedEpisode = episode.episode.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
});

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("thumb", function(src, size = 1080) {
  return `https://thumbs.mskog.com/${size}x/${src}`;
});

Vue.filter("truncate", function(string, size) {
  if (string === null) return "";
  return string.substring(0, size) + "...";
});
