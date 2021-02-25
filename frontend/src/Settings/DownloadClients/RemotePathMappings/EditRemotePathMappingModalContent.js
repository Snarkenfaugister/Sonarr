import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import { stringSettingShape } from 'Helpers/Props/Shapes/settingShape';
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
import styles from './EditRemotePathMappingModalContent.css';
import translate from 'Utilities/String/translate';

function EditRemotePathMappingModalContent(props) {
  const {
    id,
    isFetching,
    error,
    isSaving,
    saveError,
    item,
    downloadClientHosts,
    onInputChange,
    onSavePress,
    onModalClose,
    onDeleteRemotePathMappingPress,
    ...otherProps
  } = props;

  const {
    host,
    remotePath,
    localPath
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? translate('editRemotePathMapping') : translate('addRemotePathMapping')}
      </ModalHeader>

      <ModalBody className={styles.body}>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToAddANewRemotePathMappingPleaseTryAgain')}</div>
        }

        {
          !isFetching && !error &&
            <Form {...otherProps}>
              <FormGroup>
                <FormLabel>{translate('host')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="host"
                  helpText={translate('settingsRemotePathMappingHostHelpText')}
                  {...host}
                  values={downloadClientHosts}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('remotePath')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="remotePath"
                  helpText={translate('settingsRemotePathMappingRemotePathHelpText')}
                  {...remotePath}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('localPath')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.PATH}
                  name="localPath"
                  helpText={translate('settingsRemotePathMappingLocalPathHelpText')}
                  {...localPath}
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
              onPress={onDeleteRemotePathMappingPress}
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

const remotePathMappingShape = {
  host: PropTypes.shape(stringSettingShape).isRequired,
  remotePath: PropTypes.shape(stringSettingShape).isRequired,
  localPath: PropTypes.shape(stringSettingShape).isRequired
};

EditRemotePathMappingModalContent.propTypes = {
  id: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.shape(remotePathMappingShape).isRequired,
  downloadClientHosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteRemotePathMappingPress: PropTypes.func
};

export default EditRemotePathMappingModalContent;
