import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import RootFoldersConnector from 'RootFolder/RootFoldersConnector';
import NamingConnector from './Naming/NamingConnector';
import AddRootFolderConnector from './RootFolder/AddRootFolderConnector';
import translate from 'Utilities/String/translate';

const episodeTitleRequiredOptions = [
  { key: 'always', value: translate('always') },
  { key: 'bulkSeasonReleases', value: translate('onlyForBulkReleases') },
  { key: 'never', value: translate('never') }
];

const rescanAfterRefreshOptions = [
  { key: 'always', value: translate('always') },
  { key: 'afterManual', value: translate('afterManualRefresh') },
  { key: 'never', value: translate('never') }
];

const downloadPropersAndRepacksOptions = [
  { key: 'preferAndUpgrade', value: translate('preferAndUpgrade') },
  { key: 'doNotUpgrade', value: translate('doNotUpgradeAutomatically') },
  { key: 'doNotPrefer', value: translate('doNotPrefer') }
];

const fileDateOptions = [
  { key: 'none', value: translate('none') },
  { key: 'localAirDate', value: translate('localAirDate') },
  { key: 'utcAirDate', value: translate('utcAirDate') }
];

class MediaManagement extends Component {

  //
  // Render

  render() {
    const {
      advancedSettings,
      isFetching,
      error,
      settings,
      hasSettings,
      isMono,
      onInputChange,
      onSavePress,
      ...otherProps
    } = this.props;

    return (
      <PageContent title={translate('mediaManagementSettings')}>
        <SettingsToolbarConnector
          advancedSettings={advancedSettings}
          {...otherProps}
          onSavePress={onSavePress}
        />

        <PageContentBody>
          <NamingConnector />

          {
            isFetching &&
              <FieldSet legend={translate('namingSettings')}>
                <LoadingIndicator />
              </FieldSet>
          }

          {
            !isFetching && error &&
            <FieldSet legend={translate('namingSettings')}>
              <div>Unable to load Media Management settings</div>
            </FieldSet>
          }

          {
            hasSettings && !isFetching && !error &&
              <Form
                id="mediaManagementSettings"
                {...otherProps}
              >
                {
                  advancedSettings &&
                    <FieldSet legend={translate('folders')}>
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>{translate('createEmptySeriesFolders')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="createEmptySeriesFolders"
                          helpText={translate('createEmptySeriesFoldersHelpText')}
                          onChange={onInputChange}
                          {...settings.createEmptySeriesFolders}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>{translate('deleteEmptyFolders')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="deleteEmptyFolders"
                          helpText={translate('deleteEmptyFoldersHelpText')}
                          onChange={onInputChange}
                          {...settings.deleteEmptyFolders}
                        />
                      </FormGroup>
                    </FieldSet>
                }

                {
                  advancedSettings &&
                    <FieldSet
                      legend={translate('importing')}
                    >
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.SMALL}
                      >
                        <FormLabel>{translate('episodeTitleRequired')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.SELECT}
                          name="episodeTitleRequired"
                          helpText={translate('episodeTitleRequiredHelpText')}
                          values={episodeTitleRequiredOptions}
                          onChange={onInputChange}
                          {...settings.episodeTitleRequired}
                        />
                      </FormGroup>

                      {
                        isMono &&
                          <FormGroup
                            advancedSettings={advancedSettings}
                            isAdvanced={true}
                            size={sizes.MEDIUM}
                          >
                            <FormLabel>{translate('skipFreeSpaceCheck')}</FormLabel>

                            <FormInputGroup
                              type={inputTypes.CHECK}
                              name="skipFreeSpaceCheckWhenImporting"
                              helpText={translate('skipFreeSpaceCheckWhenImportingHelpText')}
                              onChange={onInputChange}
                              {...settings.skipFreeSpaceCheckWhenImporting}
                            />
                          </FormGroup>
                      }

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>{translate('minimumFreeSpace')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.NUMBER}
                          unit='MB'
                          name="minimumFreeSpaceWhenImporting"
                          helpText={translate('minimumFreeSpaceWhenImportingHelpText')}
                          onChange={onInputChange}
                          {...settings.minimumFreeSpaceWhenImporting}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>{translate('useHardlinksInsteadOfCopy')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="copyUsingHardlinks"
                          helpText={translate('copyUsingHardlinksHelpText')}
                          helpTextWarning={translate('copyUsingHardlinksHelpTextWarning')}
                          onChange={onInputChange}
                          {...settings.copyUsingHardlinks}
                        />
                      </FormGroup>

                      <FormGroup size={sizes.MEDIUM}>
                        <FormLabel>{translate('importExtraFiles')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="importExtraFiles"
                          helpText={translate('importExtraFilesHelpText')}
                          onChange={onInputChange}
                          {...settings.importExtraFiles}
                        />
                      </FormGroup>

                      {
                        settings.importExtraFiles.value &&
                          <FormGroup
                            advancedSettings={advancedSettings}
                            isAdvanced={true}
                          >
                            <FormLabel>{translate('importExtraFiles')}</FormLabel>

                            <FormInputGroup
                              type={inputTypes.TEXT}
                              name="extraFileExtensions"
                              helpTexts={[
                                translate('extraFileExtensionsHelpTexts1'),
                                translate('extraFileExtensionsHelpTexts2')
                              ]}
                              onChange={onInputChange}
                              {...settings.extraFileExtensions}
                            />
                          </FormGroup>
                      }
                    </FieldSet>
                }

                <FieldSet
                  legend={translate('fileManagement')}
                >
                  <FormGroup size={sizes.MEDIUM}>
                    <FormLabel>{translate('ignoreDeletedEpisodes')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="autoUnmonitorPreviouslyDownloadedEpisodes"
                      helpText={translate('ignoreDeletedEpisodesHelpText')}
                      onChange={onInputChange}
                      {...settings.autoUnmonitorPreviouslyDownloadedEpisodes}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                    size={sizes.MEDIUM}
                  >
                    <FormLabel>{translate('downloadPropersAndRepacks')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="downloadPropersAndRepacks"
                      helpTexts={[
                        translate('downloadPropersAndRepacksHelpText1'),
                        translate('downloadPropersAndRepacksHelpText2')
                      ]}
                      helpTextWarning={
                        settings.downloadPropersAndRepacks.value === 'doNotPrefer' ?
                          translate('downloadPropersAndRepacksHelpTextWarning') :
                          undefined
                      }
                      values={downloadPropersAndRepacksOptions}
                      onChange={onInputChange}
                      {...settings.downloadPropersAndRepacks}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                    size={sizes.MEDIUM}
                  >
                    <FormLabel>{translate('analyseVideoFiles')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="enableMediaInfo"
                      helpText={translate('analyseVideoFilesHelpText')}
                      onChange={onInputChange}
                      {...settings.enableMediaInfo}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>{translate('rescanSeriesFolderAfterRefresh')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="rescanAfterRefresh"
                      helpText={translate('rescanAfterRefreshHelpText')}
                      helpTextWarning={translate('rescanAfterRefreshHelpTextWarning')}
                      values={rescanAfterRefreshOptions}
                      onChange={onInputChange}
                      {...settings.rescanAfterRefresh}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>{translate('changeFileDate')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="fileDate"
                      helpText={translate('changeFileDateHelpText')}
                      values={fileDateOptions}
                      onChange={onInputChange}
                      {...settings.fileDate}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>{translate('recyclingBin')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.PATH}
                      name="recycleBin"
                      helpText={translate('recycleBinHelpText')}
                      onChange={onInputChange}
                      {...settings.recycleBin}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>{translate('recyclingBinCleanup')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.NUMBER}
                      name="recycleBinCleanupDays"
                      helpText={translate('recycleBinCleanupDaysHelpText')}
                      helpTextWarning={translate('recycleBinCleanupDaysHelpTextWarning')}
                      min={0}
                      onChange={onInputChange}
                      {...settings.recycleBinCleanupDays}
                    />
                  </FormGroup>
                </FieldSet>

                {
                  advancedSettings && isMono &&
                    <FieldSet
                      legend={translate('permissions')}
                    >
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>{translate('setPermissions')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="setPermissionsLinux"
                          helpText={translate('setPermissionsLinuxHelpText')}
                          helpTextWarning={translate('setPermissionsLinuxHelpTextWarning')}
                          onChange={onInputChange}
                          {...settings.setPermissionsLinux}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>{translate('chmodFolder')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.UMASK}
                          name="chmodFolder"
                          helpText={translate('chmodFolderHelpText')}
                          helpTextWarning={translate('chmodFolderHelpTextWarning')}
                          onChange={onInputChange}
                          {...settings.chmodFolder}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>{translate('chownGroup')}</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="chownGroup"
                          helpText={translate('chownGroupHelpText')}
                          helpTextWarning={translate('chownGroupHelpTextWarning')}
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.chownGroup}
                        />
                      </FormGroup>
                    </FieldSet>
                }
              </Form>
          }

          <FieldSet legend={translate('rootFolders')}>
            <RootFoldersConnector />
            <AddRootFolderConnector />
          </FieldSet>
        </PageContentBody>
      </PageContent>
    );
  }

}

MediaManagement.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  isMono: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default MediaManagement;
