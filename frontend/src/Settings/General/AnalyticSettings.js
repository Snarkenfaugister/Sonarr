import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

function AnalyticSettings(props) {
  const {
    settings,
    onInputChange
  } = props;

  const {
    analyticsEnabled
  } = settings;

  return (
    <FieldSet legend={translate('analytics')}>
      <FormGroup size={sizes.MEDIUM}>
        <FormLabel>{translate('sendAnonymousUsageData')}</FormLabel>

        <FormInputGroup
          type={inputTypes.CHECK}
          name="analyticsEnabled"
          helpText={translate('analyticsEnabledHelpText')}
          helpTextWarning={translate('restartRequiredHelpTextWarning')}
          onChange={onInputChange}
          {...analyticsEnabled}
        />
      </FormGroup>
    </FieldSet>
  );
}

AnalyticSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default AnalyticSettings;
