import PropTypes from 'prop-types';
import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import padNumber from 'Utilities/Number/padNumber';
import styles from './SceneInfo.css';
import translate from 'Utilities/String/translate';

function SceneInfo(props) {
  const {
    seasonNumber,
    episodeNumber,
    sceneSeasonNumber,
    sceneEpisodeNumber,
    sceneAbsoluteEpisodeNumber,
    alternateTitles,
    seriesType
  } = props;

  return (
    <DescriptionList className={styles.descriptionList}>
      {
        sceneSeasonNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title={translate('season')}
            data={sceneSeasonNumber}
          />
      }

      {
        sceneEpisodeNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title={translate('episode')}
            data={sceneEpisodeNumber}
          />
      }

      {
        seriesType === 'anime' && sceneAbsoluteEpisodeNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title={translate('absolute')}
            data={sceneAbsoluteEpisodeNumber}
          />
      }

      {
        !!alternateTitles.length &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title={alternateTitles.length === 1 ? translate('title') : translate('titles')}
            data={
              <div>
                {
                  alternateTitles.map((alternateTitle) => {
                    let suffix = '';

                    const altSceneSeasonNumber = sceneSeasonNumber === undefined ? seasonNumber : sceneSeasonNumber;
                    const altSceneEpisodeNumber = sceneEpisodeNumber === undefined ? episodeNumber : sceneEpisodeNumber;

                    const mappingSeasonNumber = alternateTitle.sceneOrigin === 'tvdb' ? seasonNumber : altSceneSeasonNumber;
                    const altSeasonNumber = (alternateTitle.sceneSeasonNumber !== -1 && alternateTitle.sceneSeasonNumber !== undefined) ? alternateTitle.sceneSeasonNumber : mappingSeasonNumber;
                    const altEpisodeNumber = alternateTitle.sceneOrigin === 'tvdb' ? episodeNumber : altSceneEpisodeNumber;

                    if (altEpisodeNumber !== altSceneEpisodeNumber) {
                      suffix = `S${padNumber(altSeasonNumber, 2)}E${padNumber(altEpisodeNumber, 2)}`;
                    } else if (altSeasonNumber !== altSceneSeasonNumber) {
                      suffix = `S${padNumber(altSeasonNumber, 2)}`;
                    }

                    return (
                      <div
                        key={alternateTitle.title}
                      >
                        {alternateTitle.title}
                        {
                          suffix &&
                          <span> ({suffix})</span>
                        }
                        {
                          alternateTitle.comment &&
                          <span className={styles.comment}> {alternateTitle.comment}</span>
                        }
                      </div>
                    );
                  })
                }
              </div>
            }
          />
      }
    </DescriptionList>
  );
}

SceneInfo.propTypes = {
  seasonNumber: PropTypes.number,
  episodeNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneEpisodeNumber: PropTypes.number,
  sceneAbsoluteEpisodeNumber: PropTypes.number,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  seriesType: PropTypes.string
};

export default SceneInfo;
