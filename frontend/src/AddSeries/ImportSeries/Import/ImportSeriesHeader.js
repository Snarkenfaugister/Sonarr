import PropTypes from 'prop-types';
import React from 'react';
import { icons, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Popover from 'Components/Tooltip/Popover';
import VirtualTableHeader from 'Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from 'Components/Table/VirtualTableHeaderCell';
import VirtualTableSelectAllHeaderCell from 'Components/Table/VirtualTableSelectAllHeaderCell';
import SeriesMonitoringOptionsPopoverContent from 'AddSeries/SeriesMonitoringOptionsPopoverContent';
import SeriesTypePopoverContent from 'AddSeries/SeriesTypePopoverContent';
import styles from './ImportSeriesHeader.css';
import translate from 'Utilities/String/translate';

function ImportSeriesHeader(props) {
  const {
    showLanguageProfile,
    allSelected,
    allUnselected,
    onSelectAllChange
  } = props;

  return (
    <VirtualTableHeader>
      <VirtualTableSelectAllHeaderCell
        allSelected={allSelected}
        allUnselected={allUnselected}
        onSelectAllChange={onSelectAllChange}
      />

      <VirtualTableHeaderCell
        className={styles.folder}
        name="folder"
      >
        {translate('folder')}
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.monitor}
        name="monitor"
      >
        {translate('monitor')}

        <Popover
          anchor={
            <Icon
              className={styles.detailsIcon}
              name={icons.INFO}
            />
          }
          title={translate('monitoringOptions')}
          body={<SeriesMonitoringOptionsPopoverContent />}
          position={tooltipPositions.RIGHT}
        />
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.qualityProfile}
        name="qualityProfileId"
      >
        {translate('qualityProfile')}
      </VirtualTableHeaderCell>

      {
        showLanguageProfile &&
          <VirtualTableHeaderCell
            className={styles.languageProfile}
            name="languageProfileId"
          >
            {translate('languageProfile')}
          </VirtualTableHeaderCell>
      }

      <VirtualTableHeaderCell
        className={styles.seriesType}
        name="seriesType"
      >
        {translate('seriesType')}

        <Popover
          anchor={
            <Icon
              className={styles.detailsIcon}
              name={icons.INFO}
            />
          }
          title={translate('seriesType')}
          body={<SeriesTypePopoverContent />}
          position={tooltipPositions.RIGHT}
        />
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.seasonFolder}
        name="seasonFolder"
      >
        {translate('seasonFolder')}
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.series}
        name="series"
      >
        {translate('series')}
      </VirtualTableHeaderCell>
    </VirtualTableHeader>
  );
}

ImportSeriesHeader.propTypes = {
  showLanguageProfile: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func.isRequired
};

export default ImportSeriesHeader;
