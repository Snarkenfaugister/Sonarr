import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './ConnectionLostModal.css';
import translate from 'Utilities/String/translate';

function ConnectionLostModal(props) {
  const {
    isOpen,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('connectionLost')}
        </ModalHeader>

        <ModalBody>
          <div>
            {translate('connectionLostMessage')}
          </div>

          <div className={styles.automatic}>
            {translate('connectionLostAutomaticMessage')}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            kind={kinds.PRIMARY}
            onPress={onModalClose}
          >
            {translate('reload')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ConnectionLostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ConnectionLostModal;
