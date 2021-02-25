import PropTypes from 'prop-types';
import React from 'react';
import SeriesTypePopoverContent from 'AddSeries/SeriesTypePopoverContent';
import SeriesMonitoringOptionsPopoverContent from 'AddSeries/SeriesMonitoringOptionsPopoverContent';
import { icons, inputTypes, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Button from 'Components/Link/Button';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import Popover from 'Components/Tooltip/Popover';
import ProviderFieldFormGroup from 'Components/Form/ProviderFieldFormGroup';
import styles from './EditImportListModalContent.css';
import translate from 'Utilities/String/translate';

function EditImportListModalContent(props) {

  const {
    advancedSettings,
    isFetching,
    error,
    isSaving,
    isTesting,
    saveError,
    item,
    onInputChange,
    onFieldChange,
    onModalClose,
    onSavePress,
    onTestPress,
    onDeleteImportListPress,
    showLanguageProfile,
    ...otherProps
  } = props;

  const {
    id,
    name,
    enableAutomaticAdd,
    shouldMonitor,
    rootFolderPath,
    qualityProfileId,
    languageProfileId,
    seriesType,
    seasonFolder,
    tags,
    fields
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? translate('editList') : translate('addList')}
      </ModalHeader>

      <ModalBody>
        {
          isFetching ?
            <LoadingIndicator /> :
            null
        }

        {
          !isFetching && !!error ?
            <div>{translate('unableToAddANewListPleaseTryAgain')}</div> :
            null
        }

        {
          !isFetching && !error ?
            <Form {...otherProps}>
              <FormGroup>
                <FormLabel>{translate('name')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="name"
                  {...name}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('enableAutomaticAdd')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="enableAutomaticAdd"
                  helpText={translate('listEnableAutomaticSearchHelpText')}
                  {...enableAutomaticAdd}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  {translate('monitor')}

                  <Popover
                    anchor={
                      <Icon
                        className={styles.labelIcon}
                        name={icons.INFO}
                      />
                    }
                    title={translate('monitoringOptions')}
                    body={<SeriesMonitoringOptionsPopoverContent />}
                    position={tooltipPositions.RIGHT}
                  />
                </FormLabel>

                <FormInputGroup
                  type={inputTypes.MONITOR_EPISODES_SELECT}
                  name="shouldMonitor"
                  onChange={onInputChange}
                  {...shouldMonitor}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('rootFolder')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.ROOT_FOLDER_SELECT}
                  name="rootFolderPath"
                  helpText={translate('listRootFolderHelpText')}
                  {...rootFolderPath}
                  includeMissingValue={true}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('qualityProfile')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.QUALITY_PROFILE_SELECT}
                  name="qualityProfileId"
                  helpText={translate('listQualityProfileHelpText')}
                  {...qualityProfileId}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup className={showLanguageProfile ? undefined : styles.hideLanguageProfile}>
                <FormLabel>{translate('languageProfile')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.LANGUAGE_PROFILE_SELECT}
                  name="languageProfileId"
                  helpText={translate('listLanguageProfileHelpText')}
                  {...languageProfileId}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  {translate('seriesType')}

                  <Popover
                    anchor={
                      <Icon
                        className={styles.labelIcon}
                        name={icons.INFO}
                      />
                    }
                    title={translate('seriesTypes')}
                    body={<SeriesTypePopoverContent />}
                    position={tooltipPositions.RIGHT}
                  />
                </FormLabel>

                <FormInputGroup
                  type={inputTypes.SERIES_TYPE_SELECT}
                  name="seriesType"
                  onChange={onInputChange}
                  {...seriesType}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('seasonFolder')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="seasonFolder"
                  onChange={onInputChange}
                  {...seasonFolder}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('sonarrTags')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TAG}
                  name="tags"
                  helpText={translate('listTagsHelpText')}
                  {...tags}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                !!fields && !!fields.length &&
                <div>
                  {
                    fields.map((field) => {
                      return (
                        <ProviderFieldFormGroup
                          key={field.name}
                          advancedSettings={advancedSettings}
                          provider="importList"
                          providerData={item}
                          section="settings.importLists"
                          {...field}
                          onChange={onFieldChange}
                        />
                      );
                    })
                  }
                </div>
              }

            </Form> :
            null
        }
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteImportListPress}
            >
              {translate('delete')}
            </Button>
        }

        <SpinnerErrorButton
          isSpinning={isTesting}
          error={saveError}
          onPress={onTestPress}
        >
          {translate('test')}
        </SpinnerErrorButton>

        <Button
          onPress={onModalClose}
        >
          {translate('cancel')}
        </Button>

        <SpinnerErrorButton
          isSpinning={isSaving}
          error={saveError}
          onPress={onSavePress}
        >
          {translate('save')}
        </SpinnerErrorButton>
      </ModalFooter>
    </ModalContent>
  );
}

EditImportListModalContent.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  isTesting: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  showLanguageProfile: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onTestPress: PropTypes.func.isRequired,
  onDeleteImportListPress: PropTypes.func
};

export default EditImportListModalContent;
