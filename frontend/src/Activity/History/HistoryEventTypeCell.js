import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './HistoryEventTypeCell.css';
import translate from 'Utilities/String/translate';

function getIconName(eventType) {
  switch (eventType) {
    case 'grabbed':
      return icons.DOWNLOADING;
    case 'seriesFolderImported':
      return icons.DRIVE;
    case 'downloadFolderImported':
      return icons.DOWNLOADED;
    case 'downloadFailed':
      return icons.DOWNLOADING;
    case 'episodeFileDeleted':
      return icons.DELETE;
    case 'episodeFileRenamed':
      return icons.ORGANIZE;
    case 'downloadIgnored':
      return icons.IGNORE;
    default:
      return icons.UNKNOWN;
  }
}

function getIconKind(eventType) {
  switch (eventType) {
    case 'downloadFailed':
      return kinds.DANGER;
    default:
      return kinds.DEFAULT;
  }
}

function getTooltip(eventType, data) {
  switch (eventType) {
    case 'grabbed':
      return translate('episodeGrabbedFromSentTo', [data.indexer, data.downloadClient]);
    case 'seriesFolderImported':
      return translate('episodeImportedFromSeriesFolder');
    case 'downloadFolderImported':
      return translate('episodeDownloadedSuccessfully');
    case 'downloadFailed':
      return translate('episodeDownloadFailed');
    case 'episodeFileDeleted':
      return translate('episodeFileDeleted');
    case 'episodeFileRenamed':
      return translate('episodeFileRenamed');
    case 'downloadIgnored':
      return translate('episodeDownloadIgnored');
    default:
      return translate('unknownEvent');
  }
}

function HistoryEventTypeCell({ eventType, data }) {
  const iconName = getIconName(eventType);
  const iconKind = getIconKind(eventType);
  const tooltip = getTooltip(eventType, data);

  return (
    <TableRowCell
      className={styles.cell}
      title={tooltip}
    >
      <Icon
        name={iconName}
        kind={iconKind}
      />
    </TableRowCell>
  );
}

HistoryEventTypeCell.propTypes = {
  eventType: PropTypes.string.isRequired,
  data: PropTypes.object
};

HistoryEventTypeCell.defaultProps = {
  data: {}
};

export default HistoryEventTypeCell;
