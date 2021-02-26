import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import styles from './EditReleaseProfileModalContent.css';
import translate from 'Utilities/String/translate';

const tagInputDelimiters = ['Tab', 'Enter', ','];

function EditReleaseProfileModalContent(props) {
  const {
    isSaving,
    saveError,
    item,
    onInputChange,
    onModalClose,
    onSavePress,
    onDeleteReleaseProfilePress,
    ...otherProps
  } = props;

  const {
    id,
    name,
    enabled,
    required,
    ignored,
    preferred,
    includePreferredWhenRenaming,
    tags,
    indexerId
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? translate('editReleaseProfile') : translate('addReleaseProfile')}
      </ModalHeader>

      <ModalBody>
        <Form {...otherProps}>

          <FormGroup>
            <FormLabel>{translate('name')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TEXT}
              name="name"
              {...name}
              placeholder={translate('optionalName')}
              canEdit={true}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('enableProfile')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="enabled"
              helpText={translate('enableProfileHelpText')}
              {...enabled}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('mustContain')}</FormLabel>

            <FormInputGroup
              {...required}
              type={inputTypes.TEXT_TAG}
              name="required"
              helpText={translate('mustContainHelpText')}
              kind={kinds.SUCCESS}
              placeholder={translate('newRestrictionPlaceHolder')}
              delimiters={tagInputDelimiters}
              canEdit={true}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('mustNotContain')}</FormLabel>

            <FormInputGroup
              {...ignored}
              type={inputTypes.TEXT_TAG}
              name="ignored"
              helpText={translate('mustNotContainHelpText')}
              kind={kinds.DANGER}
              placeholder={translate('newRestrictionPlaceHolder')}
              delimiters={tagInputDelimiters}
              canEdit={true}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('preferred')}</FormLabel>

            <FormInputGroup
              type={inputTypes.KEY_VALUE_LIST}
              name="preferred"
              helpTexts={[
                translate('preferredHelpText1'),
                translate('preferredHelpText2'),
                translate('preferredHelpText3')
              ]}
              {...preferred}
              keyPlaceholder={translate('term')}
              valuePlaceholder={translate('score')}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('includePreferredWhenRenaming')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="includePreferredWhenRenaming"
              helpText={indexerId.value === 0 ? translate('includePreferredWhenRenamingHelpText') : translate('includePreferredWhenRenamingHelpTextUnsupported')}
              {...includePreferredWhenRenaming}
              onChange={onInputChange}
              isDisabled={indexerId.value !== 0}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('indexer')}</FormLabel>

            <FormInputGroup
              type={inputTypes.INDEXER_SELECT}
              name="indexerId"
              helpText={translate('indexerHelpText')}
              helpTextWarning={translate('indexerHelpTextWarning')}
              {...indexerId}
              includeAny={true}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('tags')}</FormLabel>

            <FormInputGroup
              type={inputTypes.TAG}
              name="tags"
              helpText={translate('releaseProfilesTagsHelpText')}
              {...tags}
              onChange={onInputChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteReleaseProfilePress}
            >
              {translate('delete')}
            </Button>
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

EditReleaseProfileModalContent.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onDeleteReleaseProfilePress: PropTypes.func
};

export default EditReleaseProfileModalContent;
