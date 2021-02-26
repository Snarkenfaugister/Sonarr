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
import LanguageProfileItems from './LanguageProfileItems';
import styles from './EditLanguageProfileModalContent.css';
import translate from 'Utilities/String/translate';

function EditLanguageProfileModalContent(props) {
  const {
    isFetching,
    error,
    isSaving,
    saveError,
    languages,
    item,
    isInUse,
    onInputChange,
    onCutoffChange,
    onSavePress,
    onModalClose,
    onDeleteLanguageProfilePress,
    ...otherProps
  } = props;

  const {
    id,
    name,
    upgradeAllowed,
    cutoff,
    languages: itemLanguages
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? translate('editLanguageProfile') : translate('addLanguageProfile')}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToAddANewLanguageProfilePleaseTryAgain')}</div>
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
                <FormLabel>
                  {translate('upgradesAllowed')}
                </FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="upgradeAllowed"
                  {...upgradeAllowed}
                  helpText={translate('languageUpgradeAllowedHelpText')}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                upgradeAllowed.value &&
                  <FormGroup>
                    <FormLabel>{translate('upgradeUntil')}</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="cutoff"
                      {...cutoff}
                      value={cutoff ? cutoff.value.id : 0}
                      values={languages}
                      helpText={translate('languageCutoffHelpText')}
                      onChange={onCutoffChange}
                    />
                  </FormGroup>
              }

              <LanguageProfileItems
                languageProfileItems={itemLanguages.value}
                errors={itemLanguages.errors}
                warnings={itemLanguages.warnings}
                {...otherProps}
              />

            </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <div
              className={styles.deleteButtonContainer}
              title={isInUse && translate('languageProfileInUse')}
            >
              <Button
                kind={kinds.DANGER}
                isDisabled={isInUse}
                onPress={onDeleteLanguageProfilePress}
              >
                {translate('delete')}
              </Button>
            </div>
        }

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

EditLanguageProfileModalContent.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.object.isRequired,
  isInUse: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCutoffChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteLanguageProfilePress: PropTypes.func
};

export default EditLanguageProfileModalContent;
