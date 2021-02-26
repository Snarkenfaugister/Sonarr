import translate from 'Utilities/String/translate';

const monitorOptions = [
  { key: 'all', value: 'All Episodes' },
  { key: 'future', value: 'Future Episodes' },
  { key: 'missing', value: translate('missingEpisodes') },
  { key: 'existing', value: 'Existing Episodes' },
  { key: 'pilot', value: 'Pilot Episode' },
  { key: 'firstSeason', value: 'Only First Season' },
  { key: 'latestSeason', value: 'Only Latest Season' },
  { key: 'none', value: translate('none') }
];

export default monitorOptions;
