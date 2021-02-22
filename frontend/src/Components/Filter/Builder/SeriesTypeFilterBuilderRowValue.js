import React from 'react';
import translate from 'Utilities/String/translate';
import FilterBuilderRowValue from './FilterBuilderRowValue';

const seriesTypeList = [
  { id: 'anime', name: translate('anime') },
  { id: 'daily', name: translate('daily') },
  { id: 'standard', name: translate('standard') }
];

function SeriesTypeFilterBuilderRowValue(props) {
  return (
    <FilterBuilderRowValue
      tagList={seriesTypeList}
      {...props}
    />
  );
}

export default SeriesTypeFilterBuilderRowValue;
