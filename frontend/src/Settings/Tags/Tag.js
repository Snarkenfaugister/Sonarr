import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { kinds } from 'Helpers/Props';
import Card from 'Components/Card';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import TagDetailsModal from './Details/TagDetailsModal';
import styles from './Tag.css';
import translate from 'Utilities/String/translate';

class Tag extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false,
      isDeleteTagModalOpen: false
    };
  }

  //
  // Listeners

  onShowDetailsPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  onDeleteTagPress = () => {
    this.setState({
      isDetailsModalOpen: false,
      isDeleteTagModalOpen: true
    });
  }

  onDeleteTagModalClose= () => {
    this.setState({ isDeleteTagModalOpen: false });
  }

  onConfirmDeleteTag = () => {
    this.props.onConfirmDeleteTag({ id: this.props.id });
  }

  //
  // Render

  render() {
    const {
      label,
      delayProfileIds,
      importListIds,
      notificationIds,
      restrictionIds,
      seriesIds
    } = this.props;

    const {
      isDetailsModalOpen,
      isDeleteTagModalOpen
    } = this.state;

    const isTagUsed = !!(
      delayProfileIds.length ||
      importListIds.length ||
      notificationIds.length ||
      restrictionIds.length ||
      seriesIds.length
    );

    return (
      <Card
        className={styles.tag}
        overlayContent={true}
        onPress={this.onShowDetailsPress}
      >
        <div className={styles.label}>
          {label}
        </div>

        {
          isTagUsed &&
            <div>
              {
                seriesIds.length ?
                  <div>
                    {seriesIds.length} series
                  </div> :
                  null
              }

              {
                delayProfileIds.length ?
                  <div>
                    {delayProfileIds.length} delay profile{delayProfileIds.length > 1 && 's'}
                  </div> :
                  null
              }

              {
                importListIds.length ?
                  <div>
                    {importListIds.length} import list{importListIds.length > 1 && 's'}
                  </div> :
                  null
              }

              {
                notificationIds.length ?
                  <div>
                    {notificationIds.length} connection{notificationIds.length > 1 && 's'}
                  </div> :
                  null
              }

              {
                restrictionIds.length ?
                  <div>
                    {restrictionIds.length} restriction{restrictionIds.length > 1 && 's'}
                  </div> :
                  null
              }
            </div>
        }

        {
          !isTagUsed &&
            <div>
              No links
            </div>
        }

        <TagDetailsModal
          label={label}
          isTagUsed={isTagUsed}
          seriesIds={seriesIds}
          delayProfileIds={delayProfileIds}
          importListIds={importListIds}
          notificationIds={notificationIds}
          restrictionIds={restrictionIds}
          isOpen={isDetailsModalOpen}
          onModalClose={this.onDetailsModalClose}
          onDeleteTagPress={this.onDeleteTagPress}
        />

        <ConfirmModal
          isOpen={isDeleteTagModalOpen}
          kind={kinds.DANGER}
          title="Delete Tag"
          message={`Are you sure you want to delete the tag '${label}'?`}
          confirmLabel={translate('delete')}
          onConfirm={this.onConfirmDeleteTag}
          onCancel={this.onDeleteTagModalClose}
        />
      </Card>
    );
  }
}

Tag.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  delayProfileIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  importListIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  notificationIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  restrictionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  seriesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onConfirmDeleteTag: PropTypes.func.isRequired
};

Tag.defaultProps = {
  delayProfileIds: [],
  importListIds: [],
  notificationIds: [],
  restrictionIds: [],
  seriesIds: []
};

export default Tag;
