import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import LegendItem from './LegendItem';
import LegendIconItem from './LegendIconItem';
import styles from './Legend.css';
import translate from 'Utilities/String/translate';

function Legend(props) {
  const {
    showFinaleIcon,
    showSpecialIcon,
    showCutoffUnmetIcon,
    colorImpairedMode
  } = props;

  const iconsToShow = [];
  if (showFinaleIcon) {
    iconsToShow.push(
      <LegendIconItem
        name={translate('finale')}
        icon={icons.INFO}
        kind={kinds.WARNING}
        tooltip={translate('seriesOrSeasonFinale')}
      />
    );
  }

  if (showSpecialIcon) {
    iconsToShow.push(
      <LegendIconItem
        name={translate('special')}
        icon={icons.INFO}
        kind={kinds.PINK}
        tooltip={translate('specialEpisode')}
      />
    );
  }

  if (showCutoffUnmetIcon) {
    iconsToShow.push(
      <LegendIconItem
        name={translate('cutoffUnmet')}
        icon={icons.EPISODE_FILE}
        kind={kinds.WARNING}
        tooltip={translate('qualityOrLangCutoffHasNotBeenMet')}
      />
    );
  }

  return (
    <div className={styles.legend}>
      <div>
        <LegendItem
          status="unaired"
          tooltip={translate('episodeHasntAiredYet')}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="unmonitored"
          tooltip={translate('episodeIsUnmonitored')}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendItem
          status="onAir"
          name={translate('onAir')}
          tooltip={translate('episodeIsCurrentlyAiring')}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="missing"
          tooltip={translate('episodeHasAiredMissing')}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendItem
          status="downloading"
          tooltip={translate('episodeCurrentlyDownloading')}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="downloaded"
          tooltip={translate('episodeWasDownloadedAndSorted')}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendIconItem
          name={translate('premiere')}
          icon={icons.INFO}
          kind={kinds.INFO}
          tooltip={translate('seriesOrSeasonPremiere')}
        />

        {iconsToShow[0]}
      </div>

      {
        iconsToShow.length > 1 &&
          <div>
            {iconsToShow[1]}
            {iconsToShow[2]}
          </div>
      }
    </div>
  );
}

Legend.propTypes = {
  showFinaleIcon: PropTypes.bool.isRequired,
  showSpecialIcon: PropTypes.bool.isRequired,
  showCutoffUnmetIcon: PropTypes.bool.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired
};

export default Legend;
