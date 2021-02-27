import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import translate from 'Utilities/String/translate';

function QueueDetails(props) {
  const {
    title,
    size,
    sizeleft,
    estimatedCompletionTime,
    status,
    trackedDownloadState,
    trackedDownloadStatus,
    errorMessage,
    progressBar
  } = props;

  const progress = (100 - sizeleft / size * 100);

  if (status === 'pending') {
    return (
      <Icon
        name={icons.PENDING}
        title={translate('releaseWillBeProcessed', [moment(estimatedCompletionTime).fromNow()])}
      />
    );
  }

  if (status === 'completed') {
    if (errorMessage) {
      return (
        <Icon
          name={icons.DOWNLOAD}
          kind={kinds.DANGER}
          title={translate('importFailed', [errorMessage])}
        />
      );
    }

    if (trackedDownloadStatus === 'warning') {
      return (
        <Icon
          name={icons.DOWNLOAD}
          kind={kinds.WARNING}
          title={translate('unableToImportCheckLogs')}
        />
      );
    }

    if (trackedDownloadState === 'importPending') {
      return (
        <Icon
          name={icons.DOWNLOAD}
          kind={kinds.PURPLE}
          title={translate('waitingToImport')}
        />
      );
    }

    if (trackedDownloadState === 'importing') {
      return (
        <Icon
          name={icons.DOWNLOAD}
          kind={kinds.PURPLE}
          title={`${translate('downloaded')} - ${translate('importing')}`}
        />
      );
    }
  }

  if (errorMessage) {
    return (
      <Icon
        name={icons.DOWNLOADING}
        kind={kinds.DANGER}
        title={translate('downloadFailedInterp', [errorMessage])}
      />
    );
  }

  if (status === 'failed') {
    return (
      <Icon
        name={icons.DOWNLOADING}
        kind={kinds.DANGER}
        title={translate('downloadFailedCheckDownloadClientForMoreDetails')}
      />
    );
  }

  if (status === 'warning') {
    return (
      <Icon
        name={icons.DOWNLOADING}
        kind={kinds.WARNING}
        title={translate('downloadWarningCheckDownloadClientForMoreDetails')}
      />
    );
  }

  if (progress < 5) {
    return (
      <Icon
        name={icons.DOWNLOADING}
        title={translate('episodeIsDownloadingInterp', [progress.toFixed(1), title])}
      />
    );
  }

  return progressBar;
}

QueueDetails.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  sizeleft: PropTypes.number.isRequired,
  estimatedCompletionTime: PropTypes.string,
  status: PropTypes.string.isRequired,
  trackedDownloadState: PropTypes.string.isRequired,
  trackedDownloadStatus: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  progressBar: PropTypes.node.isRequired
};

export default QueueDetails;
