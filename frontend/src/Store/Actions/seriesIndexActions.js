import moment from 'moment';
import { createAction } from 'redux-actions';
import { sortDirections } from 'Helpers/Props';
import createSetTableOptionReducer from './Creators/Reducers/createSetTableOptionReducer';
import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
import createSetClientSideCollectionFilterReducer from './Creators/Reducers/createSetClientSideCollectionFilterReducer';
import createHandleActions from './Creators/createHandleActions';
import { filters, filterPredicates, filterBuilderProps, sortPredicates } from './seriesActions';
import translate from 'Utilities/String/translate';

//
// Variables

export const section = 'seriesIndex';

//
// State

export const defaultState = {
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  secondarySortKey: 'sortTitle',
  secondarySortDirection: sortDirections.ASCENDING,
  view: 'posters',

  posterOptions: {
    detailedProgressBar: false,
    size: 'large',
    showTitle: false,
    showMonitored: true,
    showQualityProfile: true,
    showSearchAction: false
  },

  overviewOptions: {
    detailedProgressBar: false,
    size: 'medium',
    showMonitored: true,
    showNetwork: true,
    showQualityProfile: true,
    showPreviousAiring: false,
    showAdded: false,
    showSeasonCount: true,
    showPath: false,
    showSizeOnDisk: false,
    showSearchAction: false
  },

  tableOptions: {
    showBanners: false,
    showSearchAction: false
  },

  columns: [
    {
      name: 'status',
      columnLabel: translate('status'),
      isSortable: true,
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'sortTitle',
      label: translate('seriesTitle'),
      isSortable: true,
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'seriesType',
      label: translate('type'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'network',
      label: translate('network'),
      isSortable: true,
      isVisible: true
    },
    {
      name: 'qualityProfileId',
      label: translate('qualityProfile'),
      isSortable: true,
      isVisible: true
    },
    {
      name: 'languageProfileId',
      label: translate('languageProfile'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'nextAiring',
      label: translate('nextAiring'),
      isSortable: true,
      isVisible: true
    },
    {
      name: 'previousAiring',
      label: translate('previousAiring'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'added',
      label: translate('added'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'seasonCount',
      label: translate('seasons'),
      isSortable: true,
      isVisible: true
    },
    {
      name: 'episodeProgress',
      label: translate('episodes'),
      isSortable: true,
      isVisible: true
    },
    {
      name: 'episodeCount',
      label: translate('episodeCount'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'latestSeason',
      label: translate('latestSeason'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'year',
      label: translate('year'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'path',
      label: translate('path'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'sizeOnDisk',
      label: translate('sizeOnDisk'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'genres',
      label: translate('genres'),
      isSortable: false,
      isVisible: false
    },
    {
      name: 'ratings',
      label: translate('rating'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'certification',
      label: translate('certification'),
      isSortable: false,
      isVisible: false
    },
    {
      name: 'tags',
      label: translate('tags'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'useSceneNumbering',
      label: translate('sceneNumbering'),
      isSortable: true,
      isVisible: false
    },
    {
      name: 'actions',
      columnLabel: translate('actions'),
      isVisible: true,
      isModifiable: false
    }
  ],

  sortPredicates: {
    ...sortPredicates,

    network: function(item) {
      const network = item.network;

      return network ? network.toLowerCase() : '';
    },

    nextAiring: function(item, direction) {
      const nextAiring = item.nextAiring;

      if (nextAiring) {
        return moment(nextAiring).unix();
      }

      if (direction === sortDirections.DESCENDING) {
        return 0;
      }

      return Number.MAX_VALUE;
    },

    episodeProgress: function(item) {
      const { statistics = {} } = item;

      const {
        episodeCount = 0,
        episodeFileCount
      } = statistics;

      const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

      return progress + episodeCount / 1000000;
    },

    episodeCount: function(item) {
      const { statistics = {} } = item;

      return statistics.totalEpisodeCount || 0;
    },

    seasonCount: function(item) {
      const { statistics = {} } = item;

      return statistics.seasonCount;
    },

    ratings: function(item) {
      const { ratings = {} } = item;

      return ratings.value;
    }
  },

  selectedFilterKey: 'all',

  filters,

  filterPredicates,

  filterBuilderProps
};

export const persistState = [
  'seriesIndex.sortKey',
  'seriesIndex.sortDirection',
  'seriesIndex.selectedFilterKey',
  'seriesIndex.customFilters',
  'seriesIndex.view',
  'seriesIndex.columns',
  'seriesIndex.posterOptions',
  'seriesIndex.overviewOptions',
  'seriesIndex.tableOptions'
];

//
// Actions Types

export const SET_SERIES_SORT = 'seriesIndex/setSeriesSort';
export const SET_SERIES_FILTER = 'seriesIndex/setSeriesFilter';
export const SET_SERIES_VIEW = 'seriesIndex/setSeriesView';
export const SET_SERIES_TABLE_OPTION = 'seriesIndex/setSeriesTableOption';
export const SET_SERIES_POSTER_OPTION = 'seriesIndex/setSeriesPosterOption';
export const SET_SERIES_OVERVIEW_OPTION = 'seriesIndex/setSeriesOverviewOption';

//
// Action Creators

export const setSeriesSort = createAction(SET_SERIES_SORT);
export const setSeriesFilter = createAction(SET_SERIES_FILTER);
export const setSeriesView = createAction(SET_SERIES_VIEW);
export const setSeriesTableOption = createAction(SET_SERIES_TABLE_OPTION);
export const setSeriesPosterOption = createAction(SET_SERIES_POSTER_OPTION);
export const setSeriesOverviewOption = createAction(SET_SERIES_OVERVIEW_OPTION);

//
// Reducers

export const reducers = createHandleActions({

  [SET_SERIES_SORT]: createSetClientSideCollectionSortReducer(section),
  [SET_SERIES_FILTER]: createSetClientSideCollectionFilterReducer(section),

  [SET_SERIES_VIEW]: function(state, { payload }) {
    return Object.assign({}, state, { view: payload.view });
  },

  [SET_SERIES_TABLE_OPTION]: createSetTableOptionReducer(section),

  [SET_SERIES_POSTER_OPTION]: function(state, { payload }) {
    const posterOptions = state.posterOptions;

    return {
      ...state,
      posterOptions: {
        ...posterOptions,
        ...payload
      }
    };
  },

  [SET_SERIES_OVERVIEW_OPTION]: function(state, { payload }) {
    const overviewOptions = state.overviewOptions;

    return {
      ...state,
      overviewOptions: {
        ...overviewOptions,
        ...payload
      }
    };
  }

}, defaultState, section);
