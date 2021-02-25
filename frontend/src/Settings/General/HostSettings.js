import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

function HostSettings(props) {
  const {
    advancedSettings,
    settings,
    isWindows,
    mode,
    onInputChange
  } = props;

  const {
    bindAddress,
    port,
    urlBase,
    enableSsl,
    sslPort,
    sslCertHash,
    launchBrowser
  } = settings;

  return (
    <FieldSet legend={translate('host')}>
      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
      >
        <FormLabel>{translate('bindAddress')}</FormLabel>

        <FormInputGroup
          type={inputTypes.TEXT}
          name="bindAddress"
          helpText={translate('bindAddressHelpText')}
          helpTextWarning={translate('restartRequiredHelpTextWarning')}
          onChange={onInputChange}
          {...bindAddress}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>{translate('portNumber')}</FormLabel>

        <FormInputGroup
          type={inputTypes.NUMBER}
          name="port"
          min={1}
          max={65535}
          helpTextWarning={translate('restartRequiredHelpTextWarning')}
          onChange={onInputChange}
          {...port}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>{translate('urlBase')}</FormLabel>

        <FormInputGroup
          type={inputTypes.TEXT}
          name="urlBase"
          helpText={translate('urlBaseHelpText')}
          helpTextWarning={translate('restartRequiredHelpTextWarning')}
          onChange={onInputChange}
          {...urlBase}
        />
      </FormGroup>

      <FormGroup
        advancedSettings={advancedSettings}
        isAdvanced={true}
        size={sizes.MEDIUM}
      >
        <FormLabel>{translate('enableSSL')}</FormLabel>

        <FormInputGroup
          type={inputTypes.CHECK}
          name="enableSsl"
          helpText={translate('enableSslHelpText')}
          onChange={onInputChange}
          {...enableSsl}
        />
      </FormGroup>

      {
        enableSsl.value ?
          <FormGroup
            advancedSettings={advancedSettings}
            isAdvanced={true}
          >
            <FormLabel>{translate('sslPort')}</FormLabel>

            <FormInputGroup
              type={inputTypes.NUMBER}
              name="sslPort"
              min={1}
              max={65535}
              helpTextWarning={translate('restartRequiredHelpTextWarning')}
              onChange={onInputChange}
              {...sslPort}
            />
          </FormGroup> :
          null
      }

      {
        isWindows && enableSsl.value ?
          <FormGroup
            advancedSettings={advancedSettings}
            isAdvanced={true}
          >
            <FormLabel>{translate('sslCertHash')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="sslCertHash"
              helpTextWarning={translate('restartRequiredHelpTextWarning')}
              onChange={onInputChange}
              {...sslCertHash}
            />
          </FormGroup> :
          null
      }

      {
        isWindows && mode !== 'service' ?
          <FormGroup size={sizes.MEDIUM}>
            <FormLabel>{translate('openBrowserOnStart')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="launchBrowser"
              helpText={translate('launchBrowserHelpText')}
              onChange={onInputChange}
              {...launchBrowser}
            />
          </FormGroup> :
          null
      }

    </FieldSet>
  );
}

HostSettings.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  isWindows: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default HostSettings;
