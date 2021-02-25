import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

function ProxySettings(props) {
  const {
    settings,
    onInputChange
  } = props;

  const {
    proxyEnabled,
    proxyType,
    proxyHostname,
    proxyPort,
    proxyUsername,
    proxyPassword,
    proxyBypassFilter,
    proxyBypassLocalAddresses
  } = settings;

  const proxyTypeOptions = [
    { key: 'http', value: translate('httpHttps') },
    { key: 'socks4', value: translate('socks4') },
    { key: 'socks5', value: translate('socks5') }
  ];

  return (
    <FieldSet legend={translate('proxy')}>
      <FormGroup size={sizes.MEDIUM}>
        <FormLabel>{translate('useProxy')}</FormLabel>

        <FormInputGroup
          type={inputTypes.CHECK}
          name="proxyEnabled"
          onChange={onInputChange}
          {...proxyEnabled}
        />
      </FormGroup>

      {
        proxyEnabled.value &&
        <div>
          <FormGroup>
            <FormLabel>{translate('proxyType')}</FormLabel>

            <FormInputGroup
              type={inputTypes.SELECT}
              name="proxyType"
              values={proxyTypeOptions}
              onChange={onInputChange}
              {...proxyType}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('hostname')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="proxyHostname"

              onChange={onInputChange}
              {...proxyHostname}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('port')}</FormLabel>

            <FormInputGroup
              type={inputTypes.NUMBER}
              name="proxyPort"
              min={1}
              max={65535}
              onChange={onInputChange}
              {...proxyPort}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('username')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="proxyUsername"
              helpText={translate('proxyPasswordHelpText')}
              onChange={onInputChange}
              {...proxyUsername}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('password')}</FormLabel>

            <FormInputGroup
              type={inputTypes.PASSWORD}
              name="proxyPassword"
              helpText={translate('proxyPasswordHelpText')}
              onChange={onInputChange}
              {...proxyPassword}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ignoredAddresses')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="proxyBypassFilter"
              helpText={translate('proxyBypassFilterHelpText')}
              onChange={onInputChange}
              {...proxyBypassFilter}
            />
          </FormGroup>

          <FormGroup size={sizes.MEDIUM}>
            <FormLabel>{translate('bypassProxyForLocalAddresses')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="proxyBypassLocalAddresses"
              onChange={onInputChange}
              {...proxyBypassLocalAddresses}
            />
          </FormGroup>
        </div>
      }
    </FieldSet>
  );
}

ProxySettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default ProxySettings;
