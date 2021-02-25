import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

const logLevelOptions = [
  { key: 'info', value: translate('info') },
  { key: 'debug', value: translate('debug') },
  { key: 'trace', value: translate('trace') }
];

function LoggingSettings(props) {
  const {
    settings,
    onInputChange
  } = props;

  const {
    logLevel
  } = settings;

  return (
    <FieldSet legend={translate('logging')}>
      <FormGroup>
        <FormLabel>{translate('logLevel')}</FormLabel>

        <FormInputGroup
          type={inputTypes.SELECT}
          name="logLevel"
          values={logLevelOptions}
          helpTextWarning={logLevel.value === 'trace' ? translate('logLevelTraceHelpTextWarning') : undefined}
          onChange={onInputChange}
          {...logLevel}
        />
      </FormGroup>
    </FieldSet>
  );
}

LoggingSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default LoggingSettings;
