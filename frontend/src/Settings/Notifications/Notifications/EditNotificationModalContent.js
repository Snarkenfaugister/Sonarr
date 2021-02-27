import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
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
import ProviderFieldFormGroup from 'Components/Form/ProviderFieldFormGroup';
import styles from './EditNotificationModalContent.css';
import translate from 'Utilities/String/translate';

function EditNotificationModalContent(props) {
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
    onDeleteNotificationPress,
    ...otherProps
  } = props;

  const {
    id,
    implementationName,
    name,
    onGrab,
    onDownload,
    onUpgrade,
    onRename,
    onSeriesDelete,
    onEpisodeFileDelete,
    onEpisodeFileDeleteForUpgrade,
    onHealthIssue,
    supportsOnGrab,
    supportsOnDownload,
    supportsOnUpgrade,
    supportsOnRename,
    supportsOnSeriesDelete,
    supportsOnEpisodeFileDelete,
    supportsOnEpisodeFileDeleteForUpgrade,
    supportsOnHealthIssue,
    includeHealthWarnings,
    tags,
    fields,
    message
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {`${id ? translate('editConnection') : translate('addConnection')} - ${implementationName}`}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToAddANewNotificationPleaseTryAgain')}</div>
        }

        {
          !isFetching && !error &&
            <Form {...otherProps}>
              {
                !!message &&
                  <Alert
                    className={styles.message}
                    kind={message.value.type}
                  >
                    {message.value.message}
                  </Alert>
              }

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
                <FormLabel>{translate('onGrab')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onGrab"
                  helpText={translate('onGrabHelpText')}
                  isDisabled={!supportsOnGrab.value}
                  {...onGrab}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('onImport')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onDownload"
                  helpText={translate('onImportHelpText')}
                  isDisabled={!supportsOnDownload.value}
                  {...onDownload}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                onDownload.value &&
                  <FormGroup>
                    <FormLabel>{translate('onUpgrade')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onUpgrade"
                      helpText={translate('onUpgradeHelpText')}
                      isDisabled={!supportsOnUpgrade.value}
                      {...onUpgrade}
                      onChange={onInputChange}
                    />
                  </FormGroup>
              }

              <FormGroup>
                <FormLabel>{translate('onRename')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onRename"
                  helpText={translate('onRenameHelpText')}
                  isDisabled={!supportsOnRename.value}
                  {...onRename}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('onSeriesDelete')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onSeriesDelete"
                  helpText={translate('onSeriesDeleteHelpText')}
                  isDisabled={!supportsOnSeriesDelete.value}
                  {...onSeriesDelete}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('onEpisodeFileDelete')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onEpisodeFileDelete"
                  helpText={translate('onEpisodeFileDeleteHelpText')}
                  isDisabled={!supportsOnEpisodeFileDelete.value}
                  {...onEpisodeFileDelete}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                onEpisodeFileDelete.value ?
                  <FormGroup>
                    <FormLabel>{translate('onEpisodeFileDeleteForUpgrade')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onEpisodeFileDeleteForUpgrade"
                      helpText={translate('onEpisodeFileDeleteForUpgradeHelpText')}
                      isDisabled={!supportsOnEpisodeFileDeleteForUpgrade.value}
                      {...onEpisodeFileDeleteForUpgrade}
                      onChange={onInputChange}
                    />
                  </FormGroup> :
                  null
              }

              <FormGroup>
                <FormLabel>{translate('onHealthIssue')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="onHealthIssue"
                  helpText={translate('onHealthIssueHelpText')}
                  isDisabled={!supportsOnHealthIssue.value}
                  {...onHealthIssue}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                onHealthIssue.value &&
                  <FormGroup>
                    <FormLabel>{translate('includeHealthWarnings')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="includeHealthWarnings"
                      helpText={translate('includeHealthWarningsHelpText')}
                      isDisabled={!supportsOnHealthIssue.value}
                      {...includeHealthWarnings}
                      onChange={onInputChange}
                    />
                  </FormGroup>
              }

              <FormGroup>
                <FormLabel>{translate('tags')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TAG}
                  name="tags"
                  helpText={translate('notificationTagsHelpText')}
                  {...tags}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                fields.map((field) => {
                  return (
                    <ProviderFieldFormGroup
                      key={field.name}
                      advancedSettings={advancedSettings}
                      provider="notification"
                      providerData={item}
                      section="settings.notifications"
                      {...field}
                      onChange={onFieldChange}
                    />
                  );
                })
              }

            </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteNotificationPress}
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

EditNotificationModalContent.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  isTesting: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onTestPress: PropTypes.func.isRequired,
  onDeleteNotificationPress: PropTypes.func
};

export default EditNotificationModalContent;
