import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import padNumber from 'Utilities/Number/padNumber';
import filterAlternateTitles from 'Utilities/Series/filterAlternateTitles';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Popover from 'Components/Tooltip/Popover';
import SceneInfo from './SceneInfo';
import styles from './EpisodeNumber.css';
import translate from 'Utilities/String/translate';

function getWarningMessage(unverifiedSceneNumbering, seriesType, absoluteEpisodeNumber) {
  const messages = [];

  if (unverifiedSceneNumbering) {
    messages.push(translate('sceneNumberHasntBeenVerifiedYet'));
  }

  if (seriesType === 'anime' && !absoluteEpisodeNumber) {
    messages.push(translate('episodeNoAbsoluteOrder'));
  }

  return messages.join('\n');
}

function EpisodeNumber(props) {
  const {
    seasonNumber,
    episodeNumber,
    absoluteEpisodeNumber,
    sceneSeasonNumber,
    sceneEpisodeNumber,
    sceneAbsoluteEpisodeNumber,
    useSceneNumbering,
    unverifiedSceneNumbering,
    alternateTitles: seriesAlternateTitles,
    seriesType,
    showSeasonNumber
  } = props;

  const alternateTitles = filterAlternateTitles(seriesAlternateTitles, null, useSceneNumbering, seasonNumber, sceneSeasonNumber);

  const hasSceneInformation = sceneSeasonNumber !== undefined ||
    sceneEpisodeNumber !== undefined ||
    (seriesType === 'anime' && sceneAbsoluteEpisodeNumber !== undefined) ||
    !!alternateTitles.length;

  const warningMessage = getWarningMessage(unverifiedSceneNumbering, seriesType, absoluteEpisodeNumber);

  return (
    <span>
      {
        hasSceneInformation ?
          <Popover
            anchor={
              <span>
                {
                  showSeasonNumber && seasonNumber != null &&
                    <Fragment>
                      {seasonNumber}x
                    </Fragment>
                }

                {showSeasonNumber ? padNumber(episodeNumber, 2) : episodeNumber}

                {
                  seriesType === 'anime' && !!absoluteEpisodeNumber &&
                    <span className={styles.absoluteEpisodeNumber}>
                      ({absoluteEpisodeNumber})
                    </span>
                }
              </span>
            }
            title={translate('sceneInformation')}
            body={
              <SceneInfo
                seasonNumber={seasonNumber}
                episodeNumber={episodeNumber}
                sceneSeasonNumber={sceneSeasonNumber}
                sceneEpisodeNumber={sceneEpisodeNumber}
                sceneAbsoluteEpisodeNumber={sceneAbsoluteEpisodeNumber}
                alternateTitles={alternateTitles}
                seriesType={seriesType}
              />
            }
            position={tooltipPositions.RIGHT}
          /> :
          <span>
            {
              showSeasonNumber && seasonNumber != null &&
                <Fragment>
                  {seasonNumber}x
                </Fragment>
            }

            {showSeasonNumber ? padNumber(episodeNumber, 2) : episodeNumber}

            {
              seriesType === 'anime' && !!absoluteEpisodeNumber &&
                <span className={styles.absoluteEpisodeNumber}>
                  ({absoluteEpisodeNumber})
                </span>
            }
          </span>
      }

      {
        warningMessage ?
          <Icon
            className={styles.warning}
            name={icons.WARNING}
            kind={kinds.WARNING}
            title={warningMessage}
          /> :
          null
      }

    </span>
  );
}

EpisodeNumber.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneEpisodeNumber: PropTypes.number,
  sceneAbsoluteEpisodeNumber: PropTypes.number,
  useSceneNumbering: PropTypes.bool.isRequired,
  unverifiedSceneNumbering: PropTypes.bool.isRequired,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  seriesType: PropTypes.string,
  showSeasonNumber: PropTypes.bool.isRequired
};

EpisodeNumber.defaultProps = {
  useSceneNumbering: false,
  unverifiedSceneNumbering: false,
  alternateTitles: [],
  showSeasonNumber: false
};

export default EpisodeNumber;
