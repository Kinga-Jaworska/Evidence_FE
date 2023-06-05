import moment from "moment";

export function setDuration(start_time: Date, end_time: Date) {
  const start = moment(start_time);
  const end = moment(end_time);

  return Math.ceil(moment.duration(end.diff(start)).asMinutes());
}

export function setEndTime(start_time: Date, duration: number) {
  return moment(start_time).add(duration, "m").toDate();
}
