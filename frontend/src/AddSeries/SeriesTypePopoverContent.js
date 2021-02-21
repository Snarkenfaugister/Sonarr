import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import translate from 'Utilities/String/translate';

function SeriesTypePopoverContent() {
  return (
    <DescriptionList>
      <DescriptionListItem
        title={translate('anime')}
        data={translate('animeTypeDescription')}
      />

      <DescriptionListItem
        title={translate('daily')}
        data={translate('dailyTypeDescription')}
      />

      <DescriptionListItem
        title={translate('standard')}
        data={translate('standardTypeDescription')}
      />
    </DescriptionList>
  );
}

export default SeriesTypePopoverContent;
