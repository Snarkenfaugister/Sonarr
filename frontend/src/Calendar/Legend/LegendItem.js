import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './LegendItem.css';
import translate from 'Utilities/String/translate';

function LegendItem(props) {
  const {
    name,
    status,
    tooltip,
    colorImpairedMode
  } = props;

  return (
    <div
      className={classNames(
        styles.legendItem,
        styles[status],
        colorImpairedMode && 'colorImpaired'
      )}
      title={tooltip}
    >
      {name ? name : translate(status)}
    </div>
  );
}

LegendItem.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired
};

export default LegendItem;
