import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';
import formatBytes from 'Utilities/Number/formatBytes';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, icons, kinds, sizes, tooltipPositions } from 'Helpers/Props';
import fonts from 'Styles/Variables/fonts';
import HeartRating from 'Components/HeartRating';
import Icon from 'Components/Icon';
import IconButton from 'Components/Link/IconButton';
import Label from 'Components/Label';
import Measure from 'Components/Measure';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import Popover from 'Components/Tooltip/Popover';
import Tooltip from 'Components/Tooltip/Tooltip';
import EpisodeFileEditorModal from 'EpisodeFile/Editor/EpisodeFileEditorModal';
import InteractiveImportModal from 'InteractiveImport/InteractiveImportModal';
import OrganizePreviewModalConnector from 'Organize/OrganizePreviewModalConnector';
import QualityProfileNameConnector from 'Settings/Profiles/Quality/QualityProfileNameConnector';
import SeriesPoster from 'Series/SeriesPoster';
import EditSeriesModalConnector from 'Series/Edit/EditSeriesModalConnector';
import DeleteSeriesModal from 'Series/Delete/DeleteSeriesModal';
import SeriesHistoryModal from 'Series/History/SeriesHistoryModal';
import SeriesAlternateTitles from './SeriesAlternateTitles';
import SeriesDetailsSeasonConnector from './SeriesDetailsSeasonConnector';
import SeriesTagsConnector from './SeriesTagsConnector';
import SeriesDetailsLinks from './SeriesDetailsLinks';
import MonitoringOptionsModal from 'Series/MonitoringOptions/MonitoringOptionsModal';
import { getSeriesStatusDetails } from 'Series/SeriesStatus';
import styles from './SeriesDetails.css';
import translate from 'Utilities/String/translate';

const defaultFontSize = parseInt(fonts.defaultFontSize);
const lineHeight = parseFloat(fonts.lineHeight);

function getFanartUrl(images) {
  const fanartImage = _.find(images, { coverType: 'fanart' });
  if (fanartImage) {
    // Remove protocol
    return fanartImage.url.replace(/^https?:/, '');
  }
}

function getExpandedState(newState) {
  return {
    allExpanded: newState.allSelected,
    allCollapsed: newState.allUnselected,
    expandedState: newState.selectedState
  };
}

class SeriesDetails extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOrganizeModalOpen: false,
      isManageEpisodesOpen: false,
      isEditSeriesModalOpen: false,
      isDeleteSeriesModalOpen: false,
      isSeriesHistoryModalOpen: false,
      isInteractiveImportModalOpen: false,
      isMonitorOptionsModalOpen: false,
      allExpanded: false,
      allCollapsed: false,
      expandedState: {},
      overviewHeight: 0
    };
  }

  //
  // Listeners

  onOrganizePress = () => {
    this.setState({ isOrganizeModalOpen: true });
  }

  onOrganizeModalClose = () => {
    this.setState({ isOrganizeModalOpen: false });
  }

  onManageEpisodesPress = () => {
    this.setState({ isManageEpisodesOpen: true });
  }

  onManageEpisodesModalClose = () => {
    this.setState({ isManageEpisodesOpen: false });
  }

  onInteractiveImportPress = () => {
    this.setState({ isInteractiveImportModalOpen: true });
  }

  onInteractiveImportModalClose = () => {
    this.setState({ isInteractiveImportModalOpen: false });
  }

  onEditSeriesPress = () => {
    this.setState({ isEditSeriesModalOpen: true });
  }

  onEditSeriesModalClose = () => {
    this.setState({ isEditSeriesModalOpen: false });
  }

  onDeleteSeriesPress = () => {
    this.setState({
      isEditSeriesModalOpen: false,
      isDeleteSeriesModalOpen: true
    });
  }

  onDeleteSeriesModalClose = () => {
    this.setState({ isDeleteSeriesModalOpen: false });
  }

  onSeriesHistoryPress = () => {
    this.setState({ isSeriesHistoryModalOpen: true });
  }

  onSeriesHistoryModalClose = () => {
    this.setState({ isSeriesHistoryModalOpen: false });
  }

  onMonitorOptionsPress = () => {
    this.setState({ isMonitorOptionsModalOpen: true });
  }

  onMonitorOptionsClose = () => {
    this.setState({ isMonitorOptionsModalOpen: false });
  }

  onExpandAllPress = () => {
    const {
      allExpanded,
      expandedState
    } = this.state;

    this.setState(getExpandedState(selectAll(expandedState, !allExpanded)));
  }

  onExpandPress = (seasonNumber, isExpanded) => {
    this.setState((state) => {
      const convertedState = {
        allSelected: state.allExpanded,
        allUnselected: state.allCollapsed,
        selectedState: state.expandedState
      };

      const newState = toggleSelected(convertedState, [], seasonNumber, isExpanded, false);

      return getExpandedState(newState);
    });
  }

  onMeasure = ({ height }) => {
    this.setState({ overviewHeight: height });
  }

  //
  // Render

  render() {
    const {
      id,
      tvdbId,
      tvMazeId,
      imdbId,
      title,
      runtime,
      ratings,
      path,
      statistics,
      qualityProfileId,
      monitored,
      status,
      network,
      overview,
      images,
      seasons,
      alternateTitles,
      tags,
      isSaving,
      isRefreshing,
      isSearching,
      isFetching,
      isPopulated,
      episodesError,
      episodeFilesError,
      hasEpisodes,
      hasMonitoredEpisodes,
      hasEpisodeFiles,
      previousSeries,
      nextSeries,
      onMonitorTogglePress,
      onRefreshPress,
      onSearchPress
    } = this.props;

    const {
      episodeFileCount,
      sizeOnDisk
    } = statistics;

    const {
      isOrganizeModalOpen,
      isManageEpisodesOpen,
      isEditSeriesModalOpen,
      isDeleteSeriesModalOpen,
      isSeriesHistoryModalOpen,
      isInteractiveImportModalOpen,
      isMonitorOptionsModalOpen,
      allExpanded,
      allCollapsed,
      expandedState,
      overviewHeight
    } = this.state;

    const statusDetails = getSeriesStatusDetails(status);

    let episodeFilesCountMessage = translate('noEpisodeFiles');

    if (episodeFileCount === 1) {
      episodeFilesCountMessage = translate('oneEpisodeFile');
    } else if (episodeFileCount > 1) {
      episodeFilesCountMessage = translate('episodeFilesInterp', [episodeFileCount]);
    }

    let expandIcon = icons.EXPAND_INDETERMINATE;

    if (allExpanded) {
      expandIcon = icons.COLLAPSE;
    } else if (allCollapsed) {
      expandIcon = icons.EXPAND;
    }

    return (
      <PageContent title={title}>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              label={translate('refreshAndScan')}
              iconName={icons.REFRESH}
              spinningName={icons.REFRESH}
              title={translate('refreshInformationAndScanDisk')}
              isSpinning={isRefreshing}
              onPress={onRefreshPress}
            />

            <PageToolbarButton
              label={translate('searchMonitored')}
              iconName={icons.SEARCH}
              isDisabled={!monitored || !hasMonitoredEpisodes || !hasEpisodes}
              isSpinning={isSearching}
              title={hasMonitoredEpisodes ? undefined : translate('noMonitoredEpisodesInSeries')}
              onPress={onSearchPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label={translate('previewRename')}
              iconName={icons.ORGANIZE}
              isDisabled={!hasEpisodeFiles}
              onPress={this.onOrganizePress}
            />

            <PageToolbarButton
              label={translate('manageEpisodes')}
              iconName={icons.EPISODE_FILE}
              isDisabled={!hasEpisodeFiles}
              onPress={this.onManageEpisodesPress}
            />

            <PageToolbarButton
              label={translate('history')}
              iconName={icons.HISTORY}
              isDisabled={!hasEpisodes}
              onPress={this.onSeriesHistoryPress}
            />

            <PageToolbarButton
              label={translate('manualFileImport')}
              iconName={icons.INTERACTIVE}
              onPress={this.onInteractiveImportPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label={translate('seriesMonitoring')}
              iconName={icons.MONITORED}
              onPress={this.onMonitorOptionsPress}
            />

            <PageToolbarButton
              label={translate('edit')}
              iconName={icons.EDIT}
              onPress={this.onEditSeriesPress}
            />

            <PageToolbarButton
              label={translate('delete')}
              iconName={icons.DELETE}
              onPress={this.onDeleteSeriesPress}
            />

          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <PageToolbarButton
              label={allExpanded ? translate('collapseAll') : translate('expandAll')}
              iconName={expandIcon}
              onPress={this.onExpandAllPress}
            />
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody innerClassName={styles.innerContentBody}>
          <div className={styles.header}>
            <div
              className={styles.backdrop}
              style={{
                backgroundImage: `url(${getFanartUrl(images)})`
              }}
            >
              <div className={styles.backdropOverlay} />
            </div>

            <div className={styles.headerContent}>
              <SeriesPoster
                className={styles.poster}
                images={images}
                size={500}
                lazy={false}
              />

              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <div className={styles.titleContainer}>
                    <div className={styles.toggleMonitoredContainer}>
                      <MonitorToggleButton
                        className={styles.monitorToggleButton}
                        monitored={monitored}
                        isSaving={isSaving}
                        size={40}
                        onPress={onMonitorTogglePress}
                      />
                    </div>

                    <div className={styles.title}>
                      {title}
                    </div>

                    {
                      !!alternateTitles.length &&
                        <div className={styles.alternateTitlesIconContainer}>
                          <Popover
                            anchor={
                              <Icon
                                name={icons.ALTERNATE_TITLES}
                                size={20}
                              />
                            }
                            title={translate('Alternate Titles')}
                            body={<SeriesAlternateTitles alternateTitles={alternateTitles} />}
                            position={tooltipPositions.BOTTOM}
                          />
                        </div>
                    }
                  </div>

                  <div className={styles.seriesNavigationButtons}>
                    <IconButton
                      className={styles.seriesNavigationButton}
                      name={icons.ARROW_LEFT}
                      size={30}
                      title={translate('goToInterp', [previousSeries.title])}
                      to={`/series/${previousSeries.titleSlug}`}
                    />

                    <IconButton
                      className={styles.seriesNavigationButton}
                      name={icons.ARROW_RIGHT}
                      size={30}
                      title={translate('goToInterp', [nextSeries.title])}
                      to={`/series/${nextSeries.titleSlug}`}
                    />
                  </div>
                </div>

                <div className={styles.details}>
                  <div>
                    {
                      !!runtime &&
                        <span className={styles.runtime}>
                          {translate('minutesInterp', [runtime])}
                        </span>
                    }

                    <HeartRating
                      rating={ratings.value}
                      iconSize={20}
                    />
                  </div>
                </div>

                <div className={styles.detailsLabels}>
                  <Label
                    className={styles.detailsLabel}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={icons.FOLDER}
                      size={17}
                    />

                    <span className={styles.path}>
                      {path}
                    </span>
                  </Label>

                  <Tooltip
                    anchor={
                      <Label
                        className={styles.detailsLabel}
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.DRIVE}
                          size={17}
                        />

                        <span className={styles.sizeOnDisk}>
                          {
                            formatBytes(sizeOnDisk || 0)
                          }
                        </span>
                      </Label>
                    }
                    tooltip={
                      <span>
                        {episodeFilesCountMessage}
                      </span>
                    }
                    kind={kinds.INVERSE}
                    position={tooltipPositions.BOTTOM}
                  />

                  <Label
                    className={styles.detailsLabel}
                    title={translate('qualityProfile')}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={icons.PROFILE}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {
                        <QualityProfileNameConnector
                          qualityProfileId={qualityProfileId}
                        />
                      }
                    </span>
                  </Label>

                  <Label
                    className={styles.detailsLabel}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={monitored ? icons.MONITORED : icons.UNMONITORED}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {monitored ? translate('monitored') : translate('unmonitored')}
                    </span>
                  </Label>

                  <Label
                    className={styles.detailsLabel}
                    title={statusDetails.message}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={statusDetails.icon}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {statusDetails.title}
                    </span>
                  </Label>

                  {
                    !!network &&
                      <Label
                        className={styles.detailsLabel}
                        title={translate('network')}
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.NETWORK}
                          size={17}
                        />

                        <span className={styles.qualityProfileName}>
                          {network}
                        </span>
                      </Label>
                  }

                  <Tooltip
                    anchor={
                      <Label
                        className={styles.detailsLabel}
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.EXTERNAL_LINK}
                          size={17}
                        />

                        <span className={styles.links}>
                          {translate('links')}
                        </span>
                      </Label>
                    }
                    tooltip={
                      <SeriesDetailsLinks
                        tvdbId={tvdbId}
                        tvMazeId={tvMazeId}
                        imdbId={imdbId}
                      />
                    }
                    kind={kinds.INVERSE}
                    position={tooltipPositions.BOTTOM}
                  />

                  {
                    !!tags.length &&
                      <Tooltip
                        anchor={
                          <Label
                            className={styles.detailsLabel}
                            size={sizes.LARGE}
                          >
                            <Icon
                              name={icons.TAGS}
                              size={17}
                            />

                            <span className={styles.tags}>
                              {translate('tags')}
                            </span>
                          </Label>
                        }
                        tooltip={<SeriesTagsConnector seriesId={id} />}
                        kind={kinds.INVERSE}
                        position={tooltipPositions.BOTTOM}
                      />

                  }
                </div>

                <Measure onMeasure={this.onMeasure}>
                  <div className={styles.overview}>
                    <TextTruncate
                      line={Math.floor(overviewHeight / (defaultFontSize * lineHeight))}
                      text={overview}
                    />
                  </div>
                </Measure>
              </div>
            </div>
          </div>

          <div className={styles.contentContainer}>
            {
              !isPopulated && !episodesError && !episodeFilesError &&
                <LoadingIndicator />
            }

            {
              !isFetching && episodesError &&
                <div>{translate('loadingEpisodesFailed')}</div>
            }

            {
              !isFetching && episodeFilesError &&
                <div>{translate('loadingEpisodeFilesFailed')}</div>
            }

            {
              isPopulated && !!seasons.length &&
                <div>
                  {
                    seasons.slice(0).reverse().map((season) => {
                      return (
                        <SeriesDetailsSeasonConnector
                          key={season.seasonNumber}
                          seriesId={id}
                          {...season}
                          isExpanded={expandedState[season.seasonNumber]}
                          onExpandPress={this.onExpandPress}
                        />
                      );
                    })
                  }
                </div>
            }

            {
              isPopulated && !seasons.length &&
                <div>
                  {translate('noEpisodeInformationAvailable')}
                </div>
            }

          </div>

          <OrganizePreviewModalConnector
            isOpen={isOrganizeModalOpen}
            seriesId={id}
            onModalClose={this.onOrganizeModalClose}
          />

          <EpisodeFileEditorModal
            isOpen={isManageEpisodesOpen}
            seriesId={id}
            onModalClose={this.onManageEpisodesModalClose}
          />

          <SeriesHistoryModal
            isOpen={isSeriesHistoryModalOpen}
            seriesId={id}
            onModalClose={this.onSeriesHistoryModalClose}
          />

          <EditSeriesModalConnector
            isOpen={isEditSeriesModalOpen}
            seriesId={id}
            onModalClose={this.onEditSeriesModalClose}
            onDeleteSeriesPress={this.onDeleteSeriesPress}
          />

          <DeleteSeriesModal
            isOpen={isDeleteSeriesModalOpen}
            seriesId={id}
            onModalClose={this.onDeleteSeriesModalClose}
          />

          <InteractiveImportModal
            isOpen={isInteractiveImportModalOpen}
            seriesId={id}
            folder={path}
            allowSeriesChange={false}
            showFilterExistingFiles={true}
            showImportMode={false}
            onModalClose={this.onInteractiveImportModalClose}
          />

          <MonitoringOptionsModal
            isOpen={isMonitorOptionsModalOpen}
            seriesId={id}
            onModalClose={this.onMonitorOptionsClose}
          />
        </PageContentBody>
      </PageContent>
    );
  }
}

SeriesDetails.propTypes = {
  id: PropTypes.number.isRequired,
  tvdbId: PropTypes.number.isRequired,
  tvMazeId: PropTypes.number,
  imdbId: PropTypes.string,
  title: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  ratings: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  statistics: PropTypes.object.isRequired,
  qualityProfileId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  monitor: PropTypes.string,
  status: PropTypes.string.isRequired,
  network: PropTypes.string,
  overview: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  isRefreshing: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  episodesError: PropTypes.object,
  episodeFilesError: PropTypes.object,
  hasEpisodes: PropTypes.bool.isRequired,
  hasMonitoredEpisodes: PropTypes.bool.isRequired,
  hasEpisodeFiles: PropTypes.bool.isRequired,
  previousSeries: PropTypes.object.isRequired,
  nextSeries: PropTypes.object.isRequired,
  onMonitorTogglePress: PropTypes.func.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

SeriesDetails.defaultProps = {
  statistics: {},
  tags: [],
  isSaving: false
};

export default SeriesDetails;
