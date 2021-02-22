import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import styles from './EpisodeSearch.css';
import translate from 'Utilities/String/translate';

function EpisodeSearch(props) {
  const {
    onQuickSearchPress,
    onInteractiveSearchPress
  } = props;

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          size={sizes.LARGE}
          onPress={onQuickSearchPress}
        >
          <Icon
            className={styles.buttonIcon}
            name={icons.QUICK}
          />

          {translate('quickSearch')}
        </Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          kind={kinds.PRIMARY}
          size={sizes.LARGE}
          onPress={onInteractiveSearchPress}
        >
          <Icon
            className={styles.buttonIcon}
            name={icons.INTERACTIVE}
          />

          {translate('interactiveSearch')}
        </Button>
      </div>
    </div>
  );
}

EpisodeSearch.propTypes = {
  onQuickSearchPress: PropTypes.func.isRequired,
  onInteractiveSearchPress: PropTypes.func.isRequired
};

export default EpisodeSearch;
