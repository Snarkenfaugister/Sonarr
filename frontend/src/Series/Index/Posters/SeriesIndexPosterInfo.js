import PropTypes from 'prop-types';
import React from 'react';
import getRelativeDate from 'Utilities/Date/getRelativeDate';
import formatBytes from 'Utilities/Number/formatBytes';
import translate from 'Utilities/String/translate';
import styles from './SeriesIndexPosterInfo.css';

function SeriesIndexPosterInfo(props) {
  const {
    network,
    qualityProfile,
    showQualityProfile,
    previousAiring,
    added,
    seasonCount,
    path,
    sizeOnDisk,
    sortKey,
    showRelativeDates,
    shortDateFormat,
    timeFormat
  } = props;

  if (sortKey === 'network' && network) {
    return (
      <div className={styles.info}>
        {network}
      </div>
    );
  }

  if (sortKey === 'qualityProfileId' && !showQualityProfile) {
    return (
      <div className={styles.info}>
        {qualityProfile.name}
      </div>
    );
  }

  if (sortKey === 'previousAiring' && previousAiring) {
    return (
      <div className={styles.info}>
        {
          getRelativeDate(
            previousAiring,
            shortDateFormat,
            showRelativeDates,
            {
              timeFormat,
              timeForToday: true
            }
          )
        }
      </div>
    );
  }

  if (sortKey === 'added' && added) {
    const addedDate = getRelativeDate(
      added,
      shortDateFormat,
      showRelativeDates,
      {
        timeFormat,
        timeForToday: false
      }
    );

    return (
      <div className={styles.info}>
        {translate('addedInterp', [addedDate])}
      </div>
    );
  }

  if (sortKey === 'seasonCount') {
    let seasons = translate('oneSeason');

    if (seasonCount === 0) {
      seasons = translate('noSeasons');
    } else if (seasonCount > 1) {
      seasons = translate('seasonsInterp', [seasonCount]);
    }

    return (
      <div className={styles.info}>
        {seasons}
      </div>
    );
  }

  if (sortKey === 'path') {
    return (
      <div className={styles.info}>
        {path}
      </div>
    );
  }

  if (sortKey === 'sizeOnDisk') {
    return (
      <div className={styles.info}>
        {formatBytes(sizeOnDisk)}
      </div>
    );
  }

  return null;
}

SeriesIndexPosterInfo.propTypes = {
  network: PropTypes.string,
  showQualityProfile: PropTypes.bool.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  previousAiring: PropTypes.string,
  added: PropTypes.string,
  seasonCount: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  sizeOnDisk: PropTypes.number,
  sortKey: PropTypes.string.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default SeriesIndexPosterInfo;
