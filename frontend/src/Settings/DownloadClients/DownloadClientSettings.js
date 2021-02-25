import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { icons } from 'Helpers/Props';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import DownloadClientsConnector from './DownloadClients/DownloadClientsConnector';
import DownloadClientOptionsConnector from './Options/DownloadClientOptionsConnector';
import RemotePathMappingsConnector from './RemotePathMappings/RemotePathMappingsConnector';
import translate from 'Utilities/String/translate';

class DownloadClientSettings extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._saveCallback = null;

    this.state = {
      isSaving: false,
      hasPendingChanges: false
    };
  }

  //
  // Listeners

  onChildMounted = (saveCallback) => {
    this._saveCallback = saveCallback;
  }

  onChildStateChange = (payload) => {
    this.setState(payload);
  }

  onSavePress = () => {
    if (this._saveCallback) {
      this._saveCallback();
    }
  }

  //
  // Render

  render() {
    const {
      isTestingAll,
      dispatchTestAllDownloadClients
    } = this.props;

    const {
      isSaving,
      hasPendingChanges
    } = this.state;

    return (
      <PageContent title={translate('downloadClientSettings')}>
        <SettingsToolbarConnector
          isSaving={isSaving}
          hasPendingChanges={hasPendingChanges}
          additionalButtons={
            <Fragment>
              <PageToolbarSeparator />

              <PageToolbarButton
                label={translate('testAllClients')}
                iconName={icons.TEST}
                isSpinning={isTestingAll}
                onPress={dispatchTestAllDownloadClients}
              />
            </Fragment>
          }
          onSavePress={this.onSavePress}
        />

        <PageContentBody>
          <DownloadClientsConnector />

          <DownloadClientOptionsConnector
            onChildMounted={this.onChildMounted}
            onChildStateChange={this.onChildStateChange}
          />

          <RemotePathMappingsConnector />
        </PageContentBody>
      </PageContent>
    );
  }
}

DownloadClientSettings.propTypes = {
  isTestingAll: PropTypes.bool.isRequired,
  dispatchTestAllDownloadClients: PropTypes.func.isRequired
};

export default DownloadClientSettings;
