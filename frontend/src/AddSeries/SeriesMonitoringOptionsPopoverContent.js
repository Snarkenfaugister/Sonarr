import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import translate from 'Utilities/String/translate';

function SeriesMonitoringOptionsPopoverContent() {
  return (
    <DescriptionList>
      <DescriptionListItem
        title={translate('allEpisodes')}
        data={translate('monitorAllEpisodesExceptSpecials')}
      />

      <DescriptionListItem
        title={translate('futureEpisodes')}
        data={translate('monitorUnairedEpisodes')}
      />

      <DescriptionListItem
        title={translate('missingEpisodes')}
        data={translate('monitorUnairedMissingFileEpisodes')}
      />

      <DescriptionListItem
        title={translate('existingEpisodes')}
        data={translate('monitorUnairedHaveFileEpisodes')}
      />

      <DescriptionListItem
        title={translate('firstSeason')}
        data={translate('monitorFirstSeason')}
      />

      <DescriptionListItem
        title={translate('latestSeason')}
        data={translate('monitorLatestSeason')}
      />

      <DescriptionListItem
        title={translate('none')}
        data={translate('monitorNoEpisodes')}
      />
    </DescriptionList>
  );
}

export default SeriesMonitoringOptionsPopoverContent;
