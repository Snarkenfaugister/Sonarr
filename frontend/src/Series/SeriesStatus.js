
import { icons } from 'Helpers/Props';
import translate from 'Utilities/String/translate';

export function getSeriesStatusDetails(status) {

  let statusDetails = {
    icon: icons.SERIES_CONTINUING,
    title: translate('continuing'),
    message: translate('continuingMsg')
  };

  if (status === 'deleted') {
    statusDetails = {
      icon: icons.SERIES_DELETED,
      title: translate('deleted'),
      message: translate('deletedMsg')
    };
  } else if (status === 'ended') {
    statusDetails = {
      icon: icons.SERIES_ENDED,
      title: translate('ended'),
      message: translate('endedMsg')
    };
  } else if (status === 'upcoming') {
    statusDetails = {
      icon: icons.SERIES_CONTINUING,
      title: translate('upcoming'),
      message: translate('upcomingMsg')
    };
  }

  return statusDetails;
}
