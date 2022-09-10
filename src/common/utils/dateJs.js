import { format, parseISO } from "date-fns";
import { enGB, vi } from "date-fns/locale";

const locales = { enGB, vi };

const dateTime = (date) => {
  const parseDate = parseISO(date);

  const formatCostume = (date, formatStr = "PP") => {
    window.__localId__ = "vi";
    return format(date, formatStr, {
      locale: locales[window.__localId__],
    });
  };

  const getDateMonth = () => {
    const res = formatCostume(parseDate, "d LLLL yyyy");
    return res;
  };

  const getDayOfWeek = () => {
    const res = formatCostume(parseDate, "eeee");
    return res;
  };

  const getDateTime = () => {
    const res = formatCostume(parseDate, "kk:m");
    return res;
  };

  return {
    getDateMonth,
    getDayOfWeek,
    getDateTime,
  };
};

export default dateTime;
