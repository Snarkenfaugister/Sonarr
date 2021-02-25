import PropTypes from 'prop-types';
import React from 'react';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import styles from './SeriesDetailsLinks.css';
import translate from 'Utilities/String/translate';

function SeriesDetailsLinks(props) {
  const {
    tvdbId,
    tvMazeId,
    imdbId
  } = props;

  return (
    <div className={styles.links}>
      <Link
        className={styles.link}
        to={`http://www.thetvdb.com/?tab=series&id=${tvdbId}`}
      >
        <Label
          className={styles.linkLabel}
          kind={kinds.INFO}
          size={sizes.LARGE}
        >
          {translate('theTvdb')}
        </Label>
      </Link>

      <Link
        className={styles.link}
        to={`http://trakt.tv/search/tvdb/${tvdbId}?id_type=show`}
      >
        <Label
          className={styles.linkLabel}
          kind={kinds.INFO}
          size={sizes.LARGE}
        >
          {translate('trakt')}
        </Label>
      </Link>

      {
        !!tvMazeId &&
          <Link
            className={styles.link}
            to={`http://www.tvmaze.com/shows/${tvMazeId}/_`}
          >
            <Label
              className={styles.linkLabel}
              kind={kinds.INFO}
              size={sizes.LARGE}
            >
              {translate('tvMaze')}
            </Label>
          </Link>
      }

      {
        !!imdbId &&
          <Link
            className={styles.link}
            to={`http://imdb.com/title/${imdbId}/`}
          >
            <Label
              className={styles.linkLabel}
              kind={kinds.INFO}
              size={sizes.LARGE}
            >
              {translate('imdb')}
            </Label>
          </Link>
      }
    </div>
  );
}

SeriesDetailsLinks.propTypes = {
  tvdbId: PropTypes.number.isRequired,
  tvMazeId: PropTypes.number,
  imdbId: PropTypes.string
};

export default SeriesDetailsLinks;
