import PropTypes from 'prop-types';
import React from 'react';
import * as seriesTypes from 'Utilities/Series/seriesTypes';
import translate from 'Utilities/String/translate';
import SelectInput from './SelectInput';

const seriesTypeOptions = [
  { key: seriesTypes.STANDARD, value: translate('standard') },
  { key: seriesTypes.DAILY, value: translate('daily') },
  { key: seriesTypes.ANIME, value: translate('anime') }
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
