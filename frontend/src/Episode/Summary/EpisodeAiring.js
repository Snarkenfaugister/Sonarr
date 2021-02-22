import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import formatTime from 'Utilities/Date/formatTime';
import isInNextWeek from 'Utilities/Date/isInNextWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import translate from 'Utilities/String/translate';

function EpisodeAiring(props) {
  const {
    airDateUtc,
    network,
    shortDateFormat,
    showRelativeDates,
    timeFormat
  } = props;

  const networkLabel = (
    <Label
      kind={kinds.INFO}
      size={sizes.MEDIUM}
    >
      {network}
    </Label>
  );

  if (!airDateUtc) {
    return (
      <span>
        {translate('tbaOnInterp', [networkLabel])}
      </span>
    );
  }

  const time = formatTime(airDateUtc, timeFormat);

  if (!showRelativeDates) {
    return (
      <span>
        {translate('dateAtTimeOnNetworkInterp', [moment(airDateUtc).format(shortDateFormat), time, networkLabel])}
      </span>
    );
  }

  if (isToday(airDateUtc)) {
    return (
      <span>
        {translate('timeOnNetworkInterp', [time, networkLabel])}
      </span>
    );
  }

  if (isTomorrow(airDateUtc)) {
    return (
      <span>
        {translate('tomorrowAtTimeOnNetworkInterp', [time, networkLabel])}
      </span>
    );
  }

  if (isInNextWeek(airDateUtc)) {
    return (
      <span>
        {translate('dateAtTimeOnNetworkInterp', [moment(airDateUtc).format('dddd'), time, networkLabel])}
      </span>
    );
  }

  return (
    <span>
      {translate('dateAtTimeOnNetworkInterp', [moment(airDateUtc).format(shortDateFormat), time, networkLabel])}
    </span>
  );
}

EpisodeAiring.propTypes = {
  airDateUtc: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default EpisodeAiring;
