import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

function IndexerOptions(props) {
  const {
    advancedSettings,
    isFetching,
    error,
    settings,
    hasSettings,
    onInputChange
  } = props;

  return (
    <FieldSet legend={translate('options')}>
      {
        isFetching &&
          <LoadingIndicator />
      }

      {
        !isFetching && error &&
          <div>{translate('unableToLoadIndexerOptions')}</div>
      }

      {
        hasSettings && !isFetching && !error &&
          <Form>
            <FormGroup>
              <FormLabel>{translate('minimumAge')}</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="minimumAge"
                min={0}
                unit={translate('minutes')}
                helpText={translate('minimumAgeHelpText')}
                onChange={onInputChange}
                {...settings.minimumAge}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('retention')}</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="retention"
                min={0}
                unit={translate('days')}
                helpText={translate('retentionHelpText')}
                onChange={onInputChange}
                {...settings.retention}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('maximumSize')}</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="maximumSize"
                min={0}
                unit={translate('megaBytes')}
                helpText={translate('maximumSizeHelpText')}
                onChange={onInputChange}
                {...settings.maximumSize}
              />
            </FormGroup>

            <FormGroup
              advancedSettings={advancedSettings}
              isAdvanced={true}
            >
              <FormLabel>{translate('rssSyncInterval')}</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="rssSyncInterval"
                min={0}
                max={120}
                unit={translate('minutes')}
                helpText={translate('rssSyncIntervalHelpText')}
                helpTextWarning={translate('rssSyncIntervalHelpTextWarning')}
                helpLink="https://wiki.servarr.com/Sonarr_FAQ#How_does_Sonarr_find_episodes"
                onChange={onInputChange}
                {...settings.rssSyncInterval}
              />
            </FormGroup>
          </Form>
      }
    </FieldSet>
  );
}

IndexerOptions.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default IndexerOptions;
