import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds, inputTypes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import Icon from 'Components/Icon';
import ClipboardButton from 'Components/Link/ClipboardButton';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormInputButton from 'Components/Form/FormInputButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import translate from 'Utilities/String/translate';

const authenticationMethodOptions = [
  { key: 'none', value: translate('none') },
  { key: 'basic', value: 'Basic (Browser Popup)' },
  { key: 'forms', value: 'Forms (Login Page)' }
];

const certificateValidationOptions = [
  { key: 'enabled', value: translate('enabled') },
  { key: 'disabledForLocalAddresses', value: translate('certValidationNoLocal') },
  { key: 'disabled', value: translate('disabled') }
];

class SecuritySettings extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isConfirmApiKeyResetModalOpen: false
    };
  }

  //
  // Listeners

  onApikeyFocus = (event) => {
    event.target.select();
  }

  onResetApiKeyPress = () => {
    this.setState({ isConfirmApiKeyResetModalOpen: true });
  }

  onConfirmResetApiKey = () => {
    this.setState({ isConfirmApiKeyResetModalOpen: false });
    this.props.onConfirmResetApiKey();
  }

  onCloseResetApiKeyModal = () => {
    this.setState({ isConfirmApiKeyResetModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      settings,
      isResettingApiKey,
      onInputChange
    } = this.props;

    const {
      authenticationMethod,
      username,
      password,
      apiKey,
      certificateValidation
    } = settings;

    const authenticationEnabled = authenticationMethod && authenticationMethod.value !== 'none';

    return (
      <FieldSet legend={translate('security')}>
        <FormGroup>
          <FormLabel>{translate('authentication')}</FormLabel>

          <FormInputGroup
            type={inputTypes.SELECT}
            name="authenticationMethod"
            values={authenticationMethodOptions}
            helpText={translate('authenticationMethodHelpText')}
            helpTextWarning={translate('restartRequiredHelpTextWarning')}
            onChange={onInputChange}
            {...authenticationMethod}
          />
        </FormGroup>

        {
          authenticationEnabled &&
          <FormGroup>
            <FormLabel>{translate('username')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="username"
              helpTextWarning={translate('restartRequiredHelpTextWarning')}
              onChange={onInputChange}
              {...username}
            />
          </FormGroup>
        }

        {
          authenticationEnabled &&
          <FormGroup>
            <FormLabel>{translate('password')}</FormLabel>

            <FormInputGroup
              type={inputTypes.PASSWORD}
              name="password"
              helpTextWarning={translate('restartRequiredHelpTextWarning')}
              onChange={onInputChange}
              {...password}
            />
          </FormGroup>
        }

        <FormGroup>
          <FormLabel>{translate('apiKey')}</FormLabel>

          <FormInputGroup
            type={inputTypes.TEXT}
            name="apiKey"
            readOnly={true}
            helpTextWarning={translate('restartRequiredHelpTextWarning')}
            buttons={[
              <ClipboardButton
                key="copy"
                value={apiKey.value}
                kind={kinds.DEFAULT}
              />,

              <FormInputButton
                key="reset"
                kind={kinds.DANGER}
                onPress={this.onResetApiKeyPress}
              >
                <Icon
                  name={icons.REFRESH}
                  isSpinning={isResettingApiKey}
                />
              </FormInputButton>
            ]}
            onChange={onInputChange}
            onFocus={this.onApikeyFocus}
            {...apiKey}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>{translate('certificateValidation')}</FormLabel>

          <FormInputGroup
            type={inputTypes.SELECT}
            name="certificateValidation"
            values={certificateValidationOptions}
            helpText={translate('certificateValidationHelpText')}
            onChange={onInputChange}
            {...certificateValidation}
          />
        </FormGroup>

        <ConfirmModal
          isOpen={this.state.isConfirmApiKeyResetModalOpen}
          kind={kinds.DANGER}
          title={translate('resetAPIKey')}
          message={translate('areYouSureYouWantToResetYourAPIKey')}
          confirmLabel={translate('reset')}
          onConfirm={this.onConfirmResetApiKey}
          onCancel={this.onCloseResetApiKeyModal}
        />
      </FieldSet>
    );
  }
}

SecuritySettings.propTypes = {
  settings: PropTypes.object.isRequired,
  isResettingApiKey: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onConfirmResetApiKey: PropTypes.func.isRequired
};

export default SecuritySettings;
