import PropTypes from 'prop-types';
import React from 'react';
import { scrollDirections } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Scroller from 'Components/Scroller/Scroller';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './LogsTableDetailsModal.css';
import translate from 'Utilities/String/translate';

function LogsTableDetailsModal(props) {
  const {
    isOpen,
    message,
    exception,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ModalContent
        onModalClose={onModalClose}
      >
        <ModalHeader>
          {translate('details')}
        </ModalHeader>

        <ModalBody>
          <div>{translate('message')}</div>

          <Scroller
            className={styles.detailsText}
            scrollDirection={scrollDirections.HORIZONTAL}
          >
            {message}
          </Scroller>

          {
            !!exception &&
              <div>
                <div>{translate('exception')}</div>
                <Scroller
                  className={styles.detailsText}
                  scrollDirection={scrollDirections.HORIZONTAL}
                >
                  {exception}
                </Scroller>
              </div>
          }
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

LogsTableDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  exception: PropTypes.string,
  onModalClose: PropTypes.func.isRequired
};

export default LogsTableDetailsModal;
