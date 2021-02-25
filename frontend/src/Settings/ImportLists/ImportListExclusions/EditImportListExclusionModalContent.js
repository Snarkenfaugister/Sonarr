import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import { stringSettingShape, numberSettingShape } from 'Helpers/Props/Shapes/settingShape';
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
import styles from './EditImportListExclusionModalContent.css';
import translate from 'Utilities/String/translate';

function EditImportListExclusionModalContent(props) {
  const {
    id,
    isFetching,
    error,
    isSaving,
    saveError,
    item,
    onInputChange,
    onSavePress,
    onModalClose,
    onDeleteImportListExclusionPress,
    ...otherProps
  } = props;

  const {
    title,
    tvdbId
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? translate('editImportListExclusion') : translate('addImportListExclusion')}
      </ModalHeader>

      <ModalBody className={styles.body}>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToAddANewImportListExclusionPleaseTryAgain')}</div>
        }

        {
          !isFetching && !error &&
            <Form
              {...otherProps}
            >
              <FormGroup>
                <FormLabel>{translate('title')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="title"
                  helpText={translate('excludeTitleHelpText')}
                  {...title}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('tvdbId')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="tvdbId"
                  helpText={translate('excludeTvdbHelpText')}
                  {...tvdbId}
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
              onPress={onDeleteImportListExclusionPress}
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

const ImportListExclusionShape = {
  title: PropTypes.shape(stringSettingShape).isRequired,
  tvdbId: PropTypes.shape(numberSettingShape).isRequired
};

EditImportListExclusionModalContent.propTypes = {
  id: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.shape(ImportListExclusionShape).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteImportListExclusionPress: PropTypes.func
};

export default EditImportListExclusionModalContent;
