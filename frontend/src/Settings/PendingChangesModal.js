import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { kinds } from 'Helpers/Props';
import keyboardShortcuts from 'Components/keyboardShortcuts';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import translate from 'Utilities/String/translate';

function PendingChangesModal(props) {
  const {
    isOpen,
    onConfirm,
    onCancel,
    bindShortcut
  } = props;

  useEffect(() => {
    bindShortcut('enter', onConfirm);
  }, [onConfirm]);

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onCancel}
    >
      <ModalContent onModalClose={onCancel}>
        <ModalHeader>{translate('unsavedChanges')}</ModalHeader>

        <ModalBody>
          {translate('pendingChangesMessage')}
        </ModalBody>

        <ModalFooter>
          <Button
            kind={kinds.DEFAULT}
            onPress={onCancel}
          >
            {translate('pendingChangesStayReview')}
          </Button>

          <Button
            autoFocus={true}
            kind={kinds.DANGER}
            onPress={onConfirm}
          >
            {translate('pendingChangesDiscardChanges')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

PendingChangesModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  kind: PropTypes.oneOf(kinds.all),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  bindShortcut: PropTypes.func.isRequired
};

PendingChangesModal.defaultProps = {
  kind: kinds.PRIMARY
};

export default keyboardShortcuts(PendingChangesModal);
