import PropTypes from 'prop-types';
import React from 'react';
import isBefore from 'Utilities/Date/isBefore';
import { icons, kinds, sizes } from 'Helpers/Props';
import Icon from 'Components/Icon';
import ProgressBar from 'Components/ProgressBar';
import QueueDetails from 'Activity/Queue/QueueDetails';
import EpisodeQuality from './EpisodeQuality';
import styles from './EpisodeStatus.css';
import translate from 'Utilities/String/translate';

function EpisodeStatus(props) {
  const {
    airDateUtc,
    monitored,
    grabbed,
    queueItem,
    episodeFile
  } = props;

  const hasEpisodeFile = !!episodeFile;
  const isQueued = !!queueItem;
  const hasAired = isBefore(airDateUtc);

  if (isQueued) {
    const {
      sizeleft,
      size
    } = queueItem;

    const progress = size ? (100 - sizeleft / size * 100) : 0;

    return (
      <div className={styles.center}>
        <QueueDetails
          {...queueItem}
          progressBar={
            <ProgressBar
              title={translate('episodeIsDownloadingInterp', [progress.toFixed(1), queueItem.title])}
              progress={progress}
              kind={kinds.PURPLE}
              size={sizes.MEDIUM}
            />
          }
        />
      </div>
    );
  }

  if (grabbed) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.DOWNLOADING}
          title={translate('episodeIsDownloading')}
        />
      </div>
    );
  }

  if (hasEpisodeFile) {
    const quality = episodeFile.quality;
    const isCutoffNotMet = episodeFile.qualityCutoffNotMet;

    return (
      <div className={styles.center}>
        <EpisodeQuality
          quality={quality}
          size={episodeFile.size}
          isCutoffNotMet={isCutoffNotMet}
          title={translate('episodeDownloaded')}
        />
      </div>
    );
  }

  if (!airDateUtc) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.TBA}
          title={translate('tba')}
        />
      </div>
    );
  }

  if (!monitored) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.UNMONITORED}
          kind={kinds.DISABLED}
          title={translate('episodeNotMonitored')}
        />
      </div>
    );
  }

  if (hasAired) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.MISSING}
          title={translate('episodeMissingFromDisk')}
        />
      </div>
    );
  }

  return (
    <div className={styles.center}>
      <Icon
        name={icons.NOT_AIRED}
        title={translate('episodeHasNotAired')}
      />
    </div>
  );
}

EpisodeStatus.propTypes = {
  airDateUtc: PropTypes.string,
  monitored: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  episodeFile: PropTypes.object
};

export default EpisodeStatus;
