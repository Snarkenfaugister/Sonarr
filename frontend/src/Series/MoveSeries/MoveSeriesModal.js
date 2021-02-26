import PropTypes from 'prop-types';
import React from 'react';
import { kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './MoveSeriesModal.css';
import translate from 'Utilities/String/translate';

function MoveSeriesModal(props) {
  const {
    originalPath,
    destinationPath,
    destinationRootFolder,
    isOpen,
    onSavePress,
    onMoveSeriesPress
  } = props;

  if (
    isOpen &&
    !originalPath &&
    !destinationPath &&
    !destinationRootFolder
  ) {
    console.error('orginalPath and destinationPath OR destinationRootFolder must be provided');
  }

  return (
    <Modal
      isOpen={isOpen}
      size={sizes.MEDIUM}
      closeOnBackgroundClick={false}
      onModalClose={onSavePress}
    >
      <ModalContent
        showCloseButton={true}
        onModalClose={onSavePress}
      >
        <ModalHeader>
          {translate('moveFiles')}
        </ModalHeader>

        <ModalBody>
          {
            destinationRootFolder ?
              translate('moveFolders1', [destinationRootFolder]) :
              translate('moveFolders2', [originalPath, destinationPath])
          }
        </ModalBody>

        <ModalFooter>
          <Button
            className={styles.doNotMoveButton}
            onPress={onSavePress}
          >
            {translate('noMoveFilesSelf')}
          </Button>

          <Button
            kind={kinds.DANGER}
            onPress={onMoveSeriesPress}
          >
            {translate('yesMoveFiles')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

MoveSeriesModal.propTypes = {
  originalPath: PropTypes.string,
  destinationPath: PropTypes.string,
  destinationRootFolder: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onMoveSeriesPress: PropTypes.func.isRequired
};

export default MoveSeriesModal;
