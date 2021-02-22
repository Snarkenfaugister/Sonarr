import PropTypes from 'prop-types';
import React from 'react';
import * as seriesTypes from 'Utilities/Series/seriesTypes';
import translate from 'Utilities/String/translate';
import SelectInput from './SelectInput';

const seriesTypeOptions = [
  { key: seriesTypes.STANDARD, value: 'Standard' },
  { key: seriesTypes.DAILY, value: 'Daily' },
  { key: seriesTypes.ANIME, value: 'Anime' }
];

function SeriesTypeSelectInput(props) {
  const values = [...seriesTypeOptions];

  const {
    includeNoChange,
    includeMixed
  } = props;

  if (includeNoChange) {
    values.unshift({
      key: 'noChange',
      value: translate('noChange'),
      disabled: true
    });
  }

  if (includeMixed) {
    values.unshift({
      key: 'mixed',
      value: `(${translate('mixed')})`,
      disabled: true
    });
  }

  return (
    <SelectInput
      {...props}
      values={values}
    />
  );
}

SeriesTypeSelectInput.propTypes = {
  includeNoChange: PropTypes.bool.isRequired,
  includeMixed: PropTypes.bool.isRequired
};

SeriesTypeSelectInput.defaultProps = {
  includeNoChange: false,
  includeMixed: false
};

export default SeriesTypeSelectInput;
