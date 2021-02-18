import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getRemovedItems from 'Utilities/Object/getRemovedItems';
import hasDifferentItems from 'Utilities/Object/hasDifferentItems';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import removeOldSelectedState from 'Utilities/Table/removeOldSelectedState';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, icons } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import TableOptionsModalWrapper from 'Components/Table/TableOptions/TableOptionsModalWrapper';
import RemoveQueueItemsModal from './RemoveQueueItemsModal';
import QueueOptionsConnector from './QueueOptionsConnector';
import QueueRowConnector from './QueueRowConnector';
import translate from 'Utilities/String/translate';

class Queue extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._shouldBlockRefresh = false;

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      isPendingSelected: false,
      isConfirmRemoveModalOpen: false,
      items: props.items
    };
  }

  shouldComponentUpdate(nextProps) {
    if (!this._shouldBlockRefresh) {
      return true;
    }

    if (hasDifferentItems(this.props.items, nextProps.items)) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      items,
      isEpisodesFetching
    } = this.props;

    if (
      (!isEpisodesFetching && prevProps.isEpisodesFetching) ||
      (hasDifferentItems(prevProps.items, items) && !items.some((e) => e.episodeId))
    ) {
      this.setState((state) => {
        return {
          ...removeOldSelectedState(state, getRemovedItems(prevProps.items, items)),
          items
        };
      });

      return;
    }

    const selectedIds = this.getSelectedIds();
    const isPendingSelected = _.some(this.props.items, (item) => {
      return selectedIds.indexOf(item.id) > -1 && item.status === 'delay';
    });

    if (isPendingSelected !== this.state.isPendingSelected) {
      this.setState({ isPendingSelected });
    }
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onQueueRowModalOpenOrClose = (isOpen) => {
    this._shouldBlockRefresh = isOpen;
  }

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, this.props.items, id, value, shiftKey);
    });
  }

  onGrabSelectedPress = () => {
    this.props.onGrabSelectedPress(this.getSelectedIds());
  }

  onRemoveSelectedPress = () => {
    this._shouldBlockRefresh = true;
    this.setState({ isConfirmRemoveModalOpen: true });
  }

  onRemoveSelectedConfirmed = (payload) => {
    this.props.onRemoveSelectedPress({ ids: this.getSelectedIds(), ...payload });
    this.setState({ isConfirmRemoveModalOpen: false });
    this._shouldBlockRefresh = false;
  }

  onConfirmRemoveModalClose = () => {
    this.setState({ isConfirmRemoveModalOpen: false });
    this._shouldBlockRefresh = false;
  }

  //
  // Render

  render() {
    const {
      isFetching,
      isPopulated,
      error,
      isEpisodesFetching,
      isEpisodesPopulated,
      episodesError,
      columns,
      totalRecords,
      isGrabbing,
      isRemoving,
      isRefreshMonitoredDownloadsExecuting,
      onRefreshPress,
      ...otherProps
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      isConfirmRemoveModalOpen,
      isPendingSelected,
      items
    } = this.state;

    const isRefreshing = isFetching || isEpisodesFetching || isRefreshMonitoredDownloadsExecuting;
    const isAllPopulated = isPopulated && (isEpisodesPopulated || !items.length || items.every((e) => !e.episodeId));
    const hasError = error || episodesError;
    const selectedIds = this.getSelectedIds();
    const selectedCount = selectedIds.length;
    const disableSelectedActions = selectedCount === 0;

    return (
      <PageContent title={translate('queue')}>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              label={translate('refresh')}
              iconName={icons.REFRESH}
              isSpinning={isRefreshing}
              onPress={onRefreshPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label={translate('grabSelected')}
              iconName={icons.DOWNLOAD}
              isDisabled={disableSelectedActions || !isPendingSelected}
              isSpinning={isGrabbing}
              onPress={this.onGrabSelectedPress}
            />

            <PageToolbarButton
              label={translate('removeSelected')}
              iconName={icons.REMOVE}
              isDisabled={disableSelectedActions}
              isSpinning={isRemoving}
              onPress={this.onRemoveSelectedPress}
            />
          </PageToolbarSection>

          <PageToolbarSection
            alignContent={align.RIGHT}
          >
            <TableOptionsModalWrapper
              columns={columns}
              {...otherProps}
              optionsComponent={QueueOptionsConnector}
            >
              <PageToolbarButton
                label={translate('options')}
                iconName={icons.TABLE}
              />
            </TableOptionsModalWrapper>
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            isRefreshing && !isAllPopulated &&
              <LoadingIndicator />
          }

          {
            !isRefreshing && hasError &&
              <div>
                {translate('failedToLoadQueue')}
              </div>
          }

          {
            isAllPopulated && !hasError && !items.length &&
              <div>
                {translate('queueIsEmpty')}
              </div>
          }

          {
            isAllPopulated && !hasError && !!items.length &&
              <div>
                <Table
                  columns={columns}
                  selectAll={true}
                  allSelected={allSelected}
                  allUnselected={allUnselected}
                  {...otherProps}
                  optionsComponent={QueueOptionsConnector}
                  onSelectAllChange={this.onSelectAllChange}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <QueueRowConnector
                            key={item.id}
                            episodeId={item.episodeId}
                            isSelected={selectedState[item.id]}
                            columns={columns}
                            {...item}
                            onSelectedChange={this.onSelectedChange}
                            onQueueRowModalOpenOrClose={this.onQueueRowModalOpenOrClose}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>

                <TablePager
                  totalRecords={totalRecords}
                  isFetching={isRefreshing}
                  {...otherProps}
                />
              </div>
          }
        </PageContentBody>

        <RemoveQueueItemsModal
          isOpen={isConfirmRemoveModalOpen}
          selectedCount={selectedCount}
          canIgnore={isConfirmRemoveModalOpen && (
            selectedIds.every((id) => {
              const item = items.find((i) => i.id === id);

              return !!(item && item.seriesId && item.episodeId);
            })
          )}
          onRemovePress={this.onRemoveSelectedConfirmed}
          onModalClose={this.onConfirmRemoveModalClose}
        />
      </PageContent>
    );
  }
}

Queue.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEpisodesFetching: PropTypes.bool.isRequired,
  isEpisodesPopulated: PropTypes.bool.isRequired,
  episodesError: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalRecords: PropTypes.number,
  isGrabbing: PropTypes.bool.isRequired,
  isRemoving: PropTypes.bool.isRequired,
  isRefreshMonitoredDownloadsExecuting: PropTypes.bool.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onGrabSelectedPress: PropTypes.func.isRequired,
  onRemoveSelectedPress: PropTypes.func.isRequired
};

export default Queue;
