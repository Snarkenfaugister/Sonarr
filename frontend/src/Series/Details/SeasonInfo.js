import PropTypes from 'prop-types';
import React from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import styles from './SeasonInfo.css';
import translate from 'Utilities/String/translate';

function SeasonInfo(props) {
  const {
    totalEpisodeCount,
    monitoredEpisodeCount,
    episodeFileCount,
    sizeOnDisk
  } = props;

  return (
    <DescriptionList>
      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title={translate('total')}
        data={totalEpisodeCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title={translate('monitored')}
        data={monitoredEpisodeCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title={translate('withFiles')}
        data={episodeFileCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title={translate('sizeOnDisk')}
        data={formatBytes(sizeOnDisk)}
      />
    </DescriptionList>
  );
}

SeasonInfo.propTypes = {
  totalEpisodeCount: PropTypes.number.isRequired,
  monitoredEpisodeCount: PropTypes.number.isRequired,
  episodeFileCount: PropTypes.number.isRequired,
  sizeOnDisk: PropTypes.number.isRequired
};

export default SeasonInfo;
