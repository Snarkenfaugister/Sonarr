import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

function BackupSettings(props) {
  const {
    advancedSettings,
    settings,
    onInputChange
  } = props;

  const {
    backupFolder,
    backupInterval,
    backupRetention
  } = settings;

  if (!advancedSettings) {
    return null;
  }

  return (
    <FieldSet legend={translate('backups')}>
      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
      >
        <FormLabel>{translate('folder')}</FormLabel>

        <FormInputGroup
          type={inputTypes.PATH}
          name="backupFolder"
          helpText={translate('backupFolderHelpText')}
          onChange={onInputChange}
          {...backupFolder}
        />
      </FormGroup>

      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
      >
        <FormLabel>{translate('interval')}</FormLabel>

        <FormInputGroup
          type={inputTypes.NUMBER}
          name="backupInterval"
          unit={translate('days')}
          helpText={translate('backupIntervalHelpText')}
          onChange={onInputChange}
          {...backupInterval}
        />
      </FormGroup>

      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
      >
        <FormLabel>{translate('retention')}</FormLabel>

        <FormInputGroup
          type={inputTypes.NUMBER}
          name="backupRetention"
          unit={translate('days')}
          helpText={translate('backupRetentionHelpText')}
          onChange={onInputChange}
          {...backupRetention}
        />
      </FormGroup>
    </FieldSet>
  );
}

BackupSettings.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default BackupSettings;
