import moment from 'moment';
import translate from 'Utilities/String/translate';
import formatTime from './formatTime';
import isToday from './isToday';
import isTomorrow from './isTomorrow';
import isYesterday from './isYesterday';

function getRelativeDay(date, includeRelativeDate) {
  if (!includeRelativeDate) {
    return '';
  }

  if (isYesterday(date)) {
    return `${translate('yesterday')}, `;
  }

  if (isToday(date)) {
    return `${translate('today')}, `;
  }

  if (isTomorrow(date)) {
    return `${translate('tomorrow')}, `;
  }

  return '';
}

function formatDateTime(date, dateFormat, timeFormat, { includeSeconds = false, includeRelativeDay = false } = {}) {
  if (!date) {
    return '';
  }

  const relativeDay = getRelativeDay(date, includeRelativeDay);
  const formattedDate = moment(date).format(dateFormat);
  const formattedTime = formatTime(date, timeFormat, { includeMinuteZero: true, includeSeconds });

  return `${relativeDay}${formattedDate} ${formattedTime}`;
}

export default formatDateTime;
