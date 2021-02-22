import React from 'react';
import translate from 'Utilities/String/translate';
import FilterBuilderRowValue from './FilterBuilderRowValue';

const seriesStatusList = [
  { id: 'continuing', name: translate('continuing') },
  { id: 'upcoming', name: translate('upcoming') },
  { id: 'ended', name: translate('ended') }
];

function SeriesStatusFilterBuilderRowValue(props) {
  return (
    <FilterBuilderRowValue
      tagList={seriesStatusList}
      {...props}
    />
  );
}

export default SeriesStatusFilterBuilderRowValue;
