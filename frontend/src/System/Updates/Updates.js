import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { icons, kinds } from 'Helpers/Props';
import formatDate from 'Utilities/Date/formatDate';
import formatDateTime from 'Utilities/Date/formatDateTime';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import SpinnerButton from 'Components/Link/SpinnerButton';
import InlineMarkdown from 'Components/Markdown/InlineMarkdown';
import Icon from 'Components/Icon';
import Label from 'Components/Label';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import UpdateChanges from './UpdateChanges';
import styles from './Updates.css';
import translate from 'Utilities/String/translate';

class Updates extends Component {

  //
  // Render

  render() {
    const {
      currentVersion,
      isFetching,
      isPopulated,
      updatesError,
      generalSettingsError,
      items,
      isInstallingUpdate,
      updateMechanism,
      updateMechanismMessage,
      shortDateFormat,
      longDateFormat,
      timeFormat,
      onInstallLatestPress
    } = this.props;

    const hasError = !!(updatesError || generalSettingsError);
    const hasUpdates = isPopulated && !hasError && items.length > 0;
    const noUpdates = isPopulated && !hasError && !items.length;
    const hasUpdateToInstall = hasUpdates && _.some(items, { installable: true, latest: true });
    const noUpdateToInstall = hasUpdates && !hasUpdateToInstall;

    const externalUpdaterPrefix = translate('unableToUpdateSonarrDirectly');
    const externalUpdaterMessages = {
      external: translate('externalUpdater'),
      apt: translate('aptUpdater'),
      docker: translate('dockerUpdater')
    };

    return (
      <PageContent title={translate('updates')}>
        <PageContentBody>
          {
            !isPopulated && !hasError &&
              <LoadingIndicator />
          }

          {
            noUpdates &&
              <div>{translate('noUpdatesAreAvailable')}</div>
          }

          {
            hasUpdateToInstall &&
              <div className={styles.messageContainer}>
                {
                  updateMechanism === 'builtIn' || updateMechanism === 'script' ?
                    <SpinnerButton
                      className={styles.updateAvailable}
                      kind={kinds.PRIMARY}
                      isSpinning={isInstallingUpdate}
                      onPress={onInstallLatestPress}
                    >
                      {translate('installLatest')}
                    </SpinnerButton> :

                    <Fragment>
                      <Icon
                        name={icons.WARNING}
                        kind={kinds.WARNING}
                        size={30}
                      />

                      <div className={styles.message}>
                        {externalUpdaterPrefix} <InlineMarkdown data={updateMechanismMessage || externalUpdaterMessages[updateMechanism] || externalUpdaterMessages.external} />
                      </div>
                    </Fragment>
                }

                {
                  isFetching &&
                    <LoadingIndicator
                      className={styles.loading}
                      size={20}
                    />
                }
              </div>
          }

          {
            noUpdateToInstall &&
              <div className={styles.messageContainer}>
                <Icon
                  className={styles.upToDateIcon}
                  name={icons.CHECK_CIRCLE}
                  size={30}
                />

                <div className={styles.message}>
                  {translate('onLatestVersion')}
                </div>

                {
                  isFetching &&
                    <LoadingIndicator
                      className={styles.loading}
                      size={20}
                    />
                }
              </div>
          }

          {
            hasUpdates &&
              <div>
                {
                  items.map((update) => {
                    const hasChanges = !!update.changes;

                    return (
                      <div
                        key={update.version}
                        className={styles.update}
                      >
                        <div className={styles.info}>
                          <div className={styles.version}>{update.version}</div>
                          <div className={styles.space}>&mdash;</div>
                          <div
                            className={styles.date}
                            title={formatDateTime(update.releaseDate, longDateFormat, timeFormat)}
                          >
                            {formatDate(update.releaseDate, shortDateFormat)}
                          </div>

                          {
                            update.branch === 'master' ?
                              null:
                              <Label
                                className={styles.label}
                              >
                                {update.branch}
                              </Label>
                          }

                          {
                            update.version === currentVersion ?
                              <Label
                                className={styles.label}
                                kind={kinds.SUCCESS}
                                title={formatDateTime(update.installedOn, longDateFormat, timeFormat)}
                              >
                                {translate('currentlyInstalled')}
                              </Label> :
                              null
                          }

                          {
                            update.version !== currentVersion && update.installedOn ?
                              <Label
                                className={styles.label}
                                kind={kinds.INVERSE}
                                title={formatDateTime(update.installedOn, longDateFormat, timeFormat)}
                              >
                                {translate('previouslyInstalled')}
                              </Label> :
                              null
                          }
                        </div>

                        {
                          !hasChanges &&
                            <div>{translate('maintenanceRelease')}</div>
                        }

                        {
                          hasChanges &&
                            <div className={styles.changes}>
                              <UpdateChanges
                                title={translate('new')}
                                changes={update.changes.new}
                              />

                              <UpdateChanges
                                title={translate('fixed')}
                                changes={update.changes.fixed}
                              />
                            </div>
                        }
                      </div>
                    );
                  })
                }
              </div>
          }

          {
            !!updatesError &&
              <div>
                {translate('failedToFetchUpdates')}
              </div>
          }

          {
            !!generalSettingsError &&
              <div>
                {translate('failedToUpdateSettings')}
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

Updates.propTypes = {
  currentVersion: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  updatesError: PropTypes.object,
  generalSettingsError: PropTypes.object,
  items: PropTypes.array.isRequired,
  isInstallingUpdate: PropTypes.bool.isRequired,
  updateMechanism: PropTypes.string,
  updateMechanismMessage: PropTypes.string,
  shortDateFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  onInstallLatestPress: PropTypes.func.isRequired
};

export default Updates;
