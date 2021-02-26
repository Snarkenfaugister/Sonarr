import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { kinds } from 'Helpers/Props';
import Card from 'Components/Card';
import Label from 'Components/Label';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import EditNotificationModalConnector from './EditNotificationModalConnector';
import styles from './Notification.css';
import translate from 'Utilities/String/translate';

class Notification extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditNotificationModalOpen: false,
      isDeleteNotificationModalOpen: false
    };
  }

  //
  // Listeners

  onEditNotificationPress = () => {
    this.setState({ isEditNotificationModalOpen: true });
  }

  onEditNotificationModalClose = () => {
    this.setState({ isEditNotificationModalOpen: false });
  }

  onDeleteNotificationPress = () => {
    this.setState({
      isEditNotificationModalOpen: false,
      isDeleteNotificationModalOpen: true
    });
  }

  onDeleteNotificationModalClose= () => {
    this.setState({ isDeleteNotificationModalOpen: false });
  }

  onConfirmDeleteNotification = () => {
    this.props.onConfirmDeleteNotification(this.props.id);
  }

  //
  // Render

  render() {
    const {
      id,
      name,
      onGrab,
      onDownload,
      onUpgrade,
      onRename,
      onSeriesDelete,
      onEpisodeFileDelete,
      onEpisodeFileDeleteForUpgrade,
      onHealthIssue,
      supportsOnGrab,
      supportsOnDownload,
      supportsOnUpgrade,
      supportsOnRename,
      supportsOnSeriesDelete,
      supportsOnEpisodeFileDelete,
      supportsOnEpisodeFileDeleteForUpgrade,
      supportsOnHealthIssue
    } = this.props;

    return (
      <Card
        className={styles.notification}
        overlayContent={true}
        onPress={this.onEditNotificationPress}
      >
        <div className={styles.name}>
          {name}
        </div>

        {
          supportsOnGrab && onGrab ?
            <Label kind={kinds.SUCCESS}>
              {translate('onGrab')}
            </Label> :
            null
        }

        {
          supportsOnDownload && onDownload ?
            <Label kind={kinds.SUCCESS}>
              {translate('onImport')}
            </Label> :
            null
        }

        {
          supportsOnUpgrade && onDownload && onUpgrade ?
            <Label kind={kinds.SUCCESS}>
              {translate('onUpgrade')}
            </Label> :
            null
        }

        {
          supportsOnRename && onRename ?
            <Label kind={kinds.SUCCESS}>
              {translate('onRename')}
            </Label> :
            null
        }

        {
          supportsOnHealthIssue && onHealthIssue ?
            <Label kind={kinds.SUCCESS}>
              {translate('onHealthIssue')}
            </Label> :
            null
        }

        {
          supportsOnSeriesDelete && onSeriesDelete ?
            <Label kind={kinds.SUCCESS}>
              {translate('onSeriesDelete')}
            </Label> :
            null
        }

        {
          supportsOnEpisodeFileDelete && onEpisodeFileDelete ?
            <Label kind={kinds.SUCCESS}>
              {translate('onEpisodeFileDelete')}
            </Label> :
            null
        }

        {
          supportsOnEpisodeFileDeleteForUpgrade && onEpisodeFileDelete && onEpisodeFileDeleteForUpgrade ?
            <Label kind={kinds.SUCCESS}>
              {translate('onEpisodeFileDeleteForUpgrade')}
            </Label> :
            null
        }

        {
          !onGrab && !onDownload && !onRename && !onHealthIssue && !onSeriesDelete && !onEpisodeFileDelete ?
            <Label
              kind={kinds.DISABLED}
              outline={true}
            >
              {translate('disabled')}
            </Label> :
            null
        }

        <EditNotificationModalConnector
          id={id}
          isOpen={this.state.isEditNotificationModalOpen}
          onModalClose={this.onEditNotificationModalClose}
          onDeleteNotificationPress={this.onDeleteNotificationPress}
        />

        <ConfirmModal
          isOpen={this.state.isDeleteNotificationModalOpen}
          kind={kinds.DANGER}
          title={translate('deleteNotification')}
          message={translate('deleteNotificationMessageText', [name])}
          confirmLabel={translate('delete')}
          onConfirm={this.onConfirmDeleteNotification}
          onCancel={this.onDeleteNotificationModalClose}
        />
      </Card>
    );
  }
}

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onGrab: PropTypes.bool.isRequired,
  onDownload: PropTypes.bool.isRequired,
  onUpgrade: PropTypes.bool.isRequired,
  onRename: PropTypes.bool.isRequired,
  onSeriesDelete: PropTypes.bool.isRequired,
  onEpisodeFileDelete: PropTypes.bool.isRequired,
  onEpisodeFileDeleteForUpgrade: PropTypes.bool.isRequired,
  onHealthIssue: PropTypes.bool.isRequired,
  supportsOnGrab: PropTypes.bool.isRequired,
  supportsOnDownload: PropTypes.bool.isRequired,
  supportsOnSeriesDelete: PropTypes.bool.isRequired,
  supportsOnEpisodeFileDelete: PropTypes.bool.isRequired,
  supportsOnEpisodeFileDeleteForUpgrade: PropTypes.bool.isRequired,
  supportsOnUpgrade: PropTypes.bool.isRequired,
  supportsOnRename: PropTypes.bool.isRequired,
  supportsOnHealthIssue: PropTypes.bool.isRequired,
  onConfirmDeleteNotification: PropTypes.func.isRequired
};

export default Notification;
