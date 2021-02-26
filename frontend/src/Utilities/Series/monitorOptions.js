import translate from 'Utilities/String/translate';

const monitorOptions = [
  { key: 'all', value: translate('allEpisodes') },
  { key: 'future', value: translate('futureEpisodes') },
  { key: 'missing', value: translate('missingEpisodes') },
  { key: 'existing', value: translate('existingEpisodes') },
  { key: 'pilot', value: translate('pilotEpisode') },
  { key: 'firstSeason', value: translate('onlyFirstSeason') },
  { key: 'latestSeason', value: translate('onlyLatestSeason') },
  { key: 'none', value: translate('none') }
];

export default monitorOptions;
