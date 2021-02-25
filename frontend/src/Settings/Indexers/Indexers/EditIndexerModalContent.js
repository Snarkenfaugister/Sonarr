import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
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
import styles from './EditIndexerModalContent.css';
import translate from 'Utilities/String/translate';

function EditIndexerModalContent(props) {
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
    onDeleteIndexerPress,
    ...otherProps
  } = props;

  const {
    id,
    implementationName,
    name,
    enableRss,
    enableAutomaticSearch,
    enableInteractiveSearch,
    supportsRss,
    supportsSearch,
    fields,
    priority
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {`${id ? translate('editIndexer') : translate('addIndexer')} - ${implementationName}`}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToAddANewIndexerPleaseTryAgain')}</div>
        }

        {
          !isFetching && !error &&
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
                <FormLabel>{translate('enableRSS')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="enableRss"
                  helpTextWarning={supportsRss.value ? undefined : translate('rssIsNotSupportedWithThisIndexer')}
                  isDisabled={!supportsRss.value}
                  {...enableRss}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('enableAutomaticSearch')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="enableAutomaticSearch"
                  helpText={supportsSearch.value ? translate('indexerEnableAutomaticSearchHelpText') : undefined}
                  helpTextWarning={supportsSearch.value ? undefined : translate('enableInteractiveSearchHelpTextWarning')}
                  isDisabled={!supportsSearch.value}
                  {...enableAutomaticSearch}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('enableInteractiveSearch')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="enableInteractiveSearch"
                  helpText={supportsSearch.value ? translate('enableInteractiveSearchHelpText') : undefined}
                  helpTextWarning={supportsSearch.value ? undefined : translate('enableInteractiveSearchHelpTextWarning')}
                  isDisabled={!supportsSearch.value}
                  {...enableInteractiveSearch}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                fields.map((field) => {
                  return (
                    <ProviderFieldFormGroup
                      key={field.name}
                      advancedSettings={advancedSettings}
                      provider="indexer"
                      providerData={item}
                      {...field}
                      onChange={onFieldChange}
                    />
                  );
                })
              }
              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>{translate('indexerPriority')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.NUMBER}
                  name="priority"
                  helpText={translate('indexerPriorityHelpTextInterp', [1, 50, 25])}
                  min={1}
                  max={50}
                  {...priority}
                  onChange={onInputChange}
                />
              </FormGroup>
            </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteIndexerPress}
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

EditIndexerModalContent.propTypes = {
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
  onDeleteIndexerPress: PropTypes.func
};

export default EditIndexerModalContent;
