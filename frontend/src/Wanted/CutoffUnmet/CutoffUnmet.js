import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getFilterValue from 'Utilities/Filter/getFilterValue';
import hasDifferentItems from 'Utilities/Object/hasDifferentItems';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import removeOldSelectedState from 'Utilities/Table/removeOldSelectedState';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, icons, kinds } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import FilterMenu from 'Components/Menu/FilterMenu';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import CutoffUnmetRowConnector from './CutoffUnmetRowConnector';
import translate from 'Utilities/String/translate';

function getMonitoredValue(props) {
  const {
    filters,
    selectedFilterKey
  } = props;

  return getFilterValue(filters, selectedFilterKey, 'monitored', false);
}

class CutoffUnmet extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      isConfirmSearchAllCutoffUnmetModalOpen: false,
      isInteractiveImportModalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (hasDifferentItems(prevProps.items, this.props.items)) {
      this.setState((state) => {
        return removeOldSelectedState(state, prevProps.items);
      });
    }
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onFilterMenuItemPress = (filterKey, filterValue) => {
    this.props.onFilterSelect(filterKey, filterValue);
  }

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, this.props.items, id, value, shiftKey);
    });
  }

  onSearchSelectedPress = () => {
    const selected = this.getSelectedIds();

    this.props.onSearchSelectedPress(selected);
  }

  onToggleSelectedPress = () => {
    const episodeIds = this.getSelectedIds();

    this.props.batchToggleCutoffUnmetEpisodes({
      episodeIds,
      monitored: !getMonitoredValue(this.props)
    });
  }

  onSearchAllCutoffUnmetPress = () => {
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: true });
  }

  onSearchAllCutoffUnmetConfirmed = () => {
    const {
      selectedFilterKey,
      onSearchAllCutoffUnmetPress
    } = this.props;

    // TODO: Custom filters will need to check whether there is a monitored
    // filter once implemented.

    onSearchAllCutoffUnmetPress(selectedFilterKey === 'monitored');
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: false });
  }

  onConfirmSearchAllCutoffUnmetModalClose = () => {
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      isFetching,
      isPopulated,
      error,
      items,
      selectedFilterKey,
      filters,
      columns,
      totalRecords,
      isSearchingForCutoffUnmetEpisodes,
      isSaving,
      onFilterSelect,
      ...otherProps
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      isConfirmSearchAllCutoffUnmetModalOpen
    } = this.state;

    const itemsSelected = !!this.getSelectedIds().length;
    const isShowingMonitored = getMonitoredValue(this.props);

    return (
      <PageContent title={translate('cutoffUnmet')}>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              label={translate('searchSelected')}
              iconName={icons.SEARCH}
              isDisabled={!itemsSelected || isSearchingForCutoffUnmetEpisodes}
              onPress={this.onSearchSelectedPress}
            />

            <PageToolbarButton
              label={isShowingMonitored ? translate('unmonitorSelected') : translate('monitorSelected')}
              iconName={icons.MONITORED}
              isDisabled={!itemsSelected}
              isSpinning={isSaving}
              onPress={this.onToggleSelectedPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label={translate('searchAll')}
              iconName={icons.SEARCH}
              isDisabled={!items.length}
              isSpinning={isSearchingForCutoffUnmetEpisodes}
              onPress={this.onSearchAllCutoffUnmetPress}
            />

            <PageToolbarSeparator />
          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <FilterMenu
              alignMenu={align.RIGHT}
              selectedFilterKey={selectedFilterKey}
              filters={filters}
              customFilters={[]}
              onFilterSelect={onFilterSelect}
            />
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            isFetching && !isPopulated &&
              <LoadingIndicator />
          }

          {
            !isFetching && error &&
              <div>
                {translate('errorFetchingCutoffUnmet')}
              </div>
          }

          {
            isPopulated && !error && !items.length &&
              <div>
                {translate('noCutoffUnmetItems')}
              </div>
          }

          {
            isPopulated && !error && !!items.length &&
              <div>
                <Table
                  columns={columns}
                  selectAll={true}
                  allSelected={allSelected}
                  allUnselected={allUnselected}
                  {...otherProps}
                  onSelectAllChange={this.onSelectAllChange}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <CutoffUnmetRowConnector
                            key={item.id}
                            isSelected={selectedState[item.id]}
                            columns={columns}
                            {...item}
                            onSelectedChange={this.onSelectedChange}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>

                <TablePager
                  totalRecords={totalRecords}
                  isFetching={isFetching}
                  {...otherProps}
                />

                <ConfirmModal
                  isOpen={isConfirmSearchAllCutoffUnmetModalOpen}
                  kind={kinds.DANGER}
                  title={translate('searchForAllCutoffUnmetEpisodes')}
                  message={
                    <div>
                      <div>
                        {translate('areYouSureYouWantToSearchForCutoffUnmetEpisodes', [totalRecords])}
                      </div>
                      <div>
                        {translate('thisCannotBeCancelled')}
                      </div>
                    </div>
                  }
                  confirmLabel={translate('search')}
                  onConfirm={this.onSearchAllCutoffUnmetConfirmed}
                  onCancel={this.onConfirmSearchAllCutoffUnmetModalClose}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

CutoffUnmet.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFilterKey: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalRecords: PropTypes.number,
  isSearchingForCutoffUnmetEpisodes: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onSearchSelectedPress: PropTypes.func.isRequired,
  batchToggleCutoffUnmetEpisodes: PropTypes.func.isRequired,
  onSearchAllCutoffUnmetPress: PropTypes.func.isRequired
};

export default CutoffUnmet;
