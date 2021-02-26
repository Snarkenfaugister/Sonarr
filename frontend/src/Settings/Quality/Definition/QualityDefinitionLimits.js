import PropTypes from 'prop-types';
import React from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import translate from 'Utilities/String/translate';

function QualityDefinitionLimits(props) {
  const {
    bytes,
    message
  } = props;

  if (!bytes) {
    return <div>{message}</div>;
  }

  const thirty = formatBytes(bytes * 30);
  const fourtyFive = formatBytes(bytes * 45);
  const sixty = formatBytes(bytes * 60);

  return (
    <div>
      <div>{translate('xMinutesInterp', [30, thirty])}</div>
      <div>{translate('xMinutesInterp', [45, fourtyFive])}</div>
      <div>{translate('xMinutesInterp', [60, sixty])}</div>
    </div>
  );
}

QualityDefinitionLimits.propTypes = {
  bytes: PropTypes.number,
  message: PropTypes.string.isRequired
};

export default QualityDefinitionLimits;
