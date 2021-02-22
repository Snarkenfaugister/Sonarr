import React from 'react';
import translate from 'Utilities/String/translate';
import FilterBuilderRowValue from './FilterBuilderRowValue';

const protocols = [
  { id: 'torrent', name: translate('torrent') },
  { id: 'usenet', name: translate('usenet') }
];

function ProtocolFilterBuilderRowValue(props) {
  return (
    <FilterBuilderRowValue
      tagList={protocols}
      {...props}
    />
  );
}

export default ProtocolFilterBuilderRowValue;
