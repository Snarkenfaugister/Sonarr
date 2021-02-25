import PropTypes from 'prop-types';
import React from 'react';
import titleCase from 'Utilities/String/titleCase';
import { inputTypes, sizes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

const branchValues = [
  'master',
  'develop'
];

function UpdateSettings(props) {
  const {
    advancedSettings,
    settings,
    isMono,
    packageUpdateMechanism,
    onInputChange
  } = props;

  const {
    branch,
    updateAutomatically,
    updateMechanism,
    updateScriptPath
  } = settings;

  if (!advancedSettings) {
    return null;
  }

  const usingExternalUpdateMechanism = packageUpdateMechanism !== 'builtIn';

  const updateOptions = [];

  if (usingExternalUpdateMechanism) {
    updateOptions.push({
      key: packageUpdateMechanism,
      value: titleCase(packageUpdateMechanism)
    });
  } else {
    updateOptions.push({ key: 'builtIn', value: translate('builtIn') });
  }

  updateOptions.push({ key: 'script', value: translate('script') });

  return (
    <FieldSet legend="Updates">
      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
      >
        <FormLabel>{translate('branch')}</FormLabel>

        <FormInputGroup
          type={inputTypes.AUTO_COMPLETE}
          name="branch"
          helpText={usingExternalUpdateMechanism ? translate('branchUpdateMechanism') : translate('branchUpdate')}
          helpLink="https://wiki.servarr.com/Sonarr_Settings#Updates"
          {...branch}
          values={branchValues}
          onChange={onInputChange}
          readOnly={usingExternalUpdateMechanism}
        />
      </FormGroup>

      {
        isMono &&
          <div>
            <FormGroup
              advancedSettings={advancedSettings}
              isAdvanced={true}
              size={sizes.MEDIUM}
            >
              <FormLabel>{translate('automatic')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="updateAutomatically"
                helpText={translate('updateAutomaticallyHelpText')}
                onChange={onInputChange}
                {...updateAutomatically}
              />
            </FormGroup>

            <FormGroup
              advancedSettings={advancedSettings}
              isAdvanced={true}
            >
              <FormLabel>{translate('mechanism')}</FormLabel>

              <FormInputGroup
                type={inputTypes.SELECT}
                name="updateMechanism"
                values={updateOptions}
                helpText={translate('updateMechanismHelpText')}
                helpLink="https://wiki.servarr.com/Sonarr_Settings#Updates"
                onChange={onInputChange}
                {...updateMechanism}
              />
            </FormGroup>

            {
              updateMechanism.value === 'script' &&
              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>{translate('scriptPath')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="updateScriptPath"
                  helpText={translate('updateScriptPathHelpText')}
                  onChange={onInputChange}
                  {...updateScriptPath}
                />
              </FormGroup>
            }
          </div>
      }
    </FieldSet>
  );
}

UpdateSettings.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  isMono: PropTypes.bool.isRequired,
  packageUpdateMechanism: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default UpdateSettings;
