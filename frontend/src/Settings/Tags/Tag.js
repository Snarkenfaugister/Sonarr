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
                    {translate('seriesInterp', [seriesIds.length])}
                  </div> :
                  null
              }

              {
                delayProfileIds.length ?
                  <div>
                    {translate(delayProfileIds.length > 1 ? 'delayProfilesInterp' : 'delayProfileInterp', [delayProfileIds.length])}
                  </div> :
                  null
              }

              {
                importListIds.length ?
                  <div>
                    {translate(importListIds.length > 1 ? 'importListsInterp' : 'importListInterp', [importListIds.length])}
                  </div> :
                  null
              }

              {
                notificationIds.length ?
                  <div>
                    {translate(notificationIds.length > 1 ? 'connectionsInterp' : 'connectionInterp', [notificationIds.length])}
                  </div> :
                  null
              }

              {
                restrictionIds.length ?
                  <div>
                    {translate(restrictionIds.length > 1 ? 'restrictionsInterp' : 'restrictionInterp', [restrictionIds.length])}
                  </div> :
                  null
              }
            </div>
        }

        {
          !isTagUsed &&
            <div>
              {translate('noLinks')}
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
          title={translate('deleteTag')}
          message={translate('deleteTagMessageText', [label])}
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
