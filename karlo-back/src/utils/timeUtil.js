const moment = require("moment");
class TimeUtil {
  constructor(locale = "es-MX") {
    this.locale = locale;
  }

  transformTime(date) {
    if (!date) return date;
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat(this.locale, options)
      .format(new Date(date))
      .replace(",", "")
      .toUpperCase();
  }

  getAge(date) {
    return moment().diff(date, "years", false);
  }
}

module.exports = TimeUtil;
