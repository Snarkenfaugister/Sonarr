import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './RemoveQueueItemsModal.css';
import translate from 'Utilities/String/translate';

class RemoveQueueItemsModal extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      remove: true,
      blacklist: false
    };
  }

  //
  // Control

   resetState = function() {
     this.setState({
       remove: true,
       blacklist: false
     });
   }

   //
   // Listeners

   onRemoveChange = ({ value }) => {
     this.setState({ remove: value });
   }

  onBlacklistChange = ({ value }) => {
    this.setState({ blacklist: value });
  }

  onRemoveConfirmed = () => {
    const state = this.state;

    this.resetState();
    this.props.onRemovePress(state);
  }

  onModalClose = () => {
    this.resetState();
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    const {
      isOpen,
      selectedCount,
      canIgnore
    } = this.props;

    const { remove, blacklist } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        size={sizes.MEDIUM}
        onModalClose={this.onModalClose}
      >
        <ModalContent
          onModalClose={this.onModalClose}
        >
          <ModalHeader>
            {translate(selectedCount === 1 ? 'removeSelectedItem' : 'removeSelectedItems')}
          </ModalHeader>

          <ModalBody>
            <div className={styles.message}>
              {translate(selectedCount === 1 ? 'areYouSureYouWantToRemoveSelectedItemFromQueue' : 'areYouSureYouWantToRemoveSelectedItemsFromQueue', [selectedCount])}
            </div>

            <FormGroup>
              <FormLabel>{translate('removeFromDownloadClient')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="remove"
                value={remove}
                helpTextWarning={translate('removeHelpTextWarning')}
                isDisabled={!canIgnore}
                onChange={this.onRemoveChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                {translate(selectedCount === 1 ? 'blacklistRelease' : 'blacklistReleases')}
              </FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="blacklist"
                value={blacklist}
                helpText={translate('blacklistHelpText')}
                onChange={this.onBlacklistChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button onPress={this.onModalClose}>
              {translate('close')}
            </Button>

            <Button
              kind={kinds.DANGER}
              onPress={this.onRemoveConfirmed}
            >
              {translate('remove')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

RemoveQueueItemsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedCount: PropTypes.number.isRequired,
  canIgnore: PropTypes.bool.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default RemoveQueueItemsModal;
