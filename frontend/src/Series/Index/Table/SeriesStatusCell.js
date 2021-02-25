import PropTypes from 'prop-types';
import React from 'react';
import { icons } from 'Helpers/Props';
import Icon from 'Components/Icon';
import VirtualTableRowCell from 'Components/Table/Cells/TableRowCell';
import { getSeriesStatusDetails } from 'Series/SeriesStatus';
import styles from './SeriesStatusCell.css';
import translate from 'Utilities/String/translate';

function SeriesStatusCell(props) {
  const {
    className,
    monitored,
    status,
    component: Component,
    ...otherProps
  } = props;

  const statusDetails = getSeriesStatusDetails(status);

  return (
    <Component
      className={className}
      {...otherProps}
    >
      <Icon
        className={styles.statusIcon}
        name={monitored ? icons.MONITORED : icons.UNMONITORED}
        title={monitored ? translate('seriesIsMonitored') : translate('seriesIsUnmonitored')}
      />

      <Icon
        className={styles.statusIcon}
        name={statusDetails.icon}
        title={`${statusDetails.title}: ${statusDetails.message}`}

      />
    </Component>
  );
}

SeriesStatusCell.propTypes = {
  className: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  component: PropTypes.elementType
};

SeriesStatusCell.defaultProps = {
  className: styles.status,
  component: VirtualTableRowCell
};

export default SeriesStatusCell;
