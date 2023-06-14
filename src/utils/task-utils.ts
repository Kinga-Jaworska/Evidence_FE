import moment from "moment";

export function setDuration(start_time: Date, end_time: Date) {
  const start = moment(start_time);
  const end = moment(end_time);

  return Math.ceil(moment.duration(end.diff(start)).asMinutes());
}

export function setEndTime(start_time: Date, duration: number) {
  return moment(start_time).add(duration, "m").toDate();
}

export const changeDurationFormatToString = (duration: number) => {
  if (duration < 60) return `${duration % 60}m`;
  else
    return duration % 60 != 0
      ? `${Math.floor(duration / 60)}h${duration % 60}m`
      : `${Math.floor(duration / 60)}h`;
};

export function setDurationInMinutes(duration: string) {
  const regex = /(\d+)([hm])/g;
  const matches = duration.match(regex);

  if (!matches) {
    return 0;
  }

  const values = {
    h: 0,
    m: 0,
  };

  matches.forEach((match) => {
    const numericValue = parseInt(match);
    const unit = match.slice(-1);

    if (unit === "h" || unit === "m") {
      values[unit] += numericValue;
    }
  });

  const totalMinutes = values.h * 60 + values.m;
  return totalMinutes;
}
