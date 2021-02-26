import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { icons } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Link from 'Components/Link/Link';
import styles from './AdvancedSettingsButton.css';
import translate from 'Utilities/String/translate';

function AdvancedSettingsButton(props) {
  const {
    advancedSettings,
    onAdvancedSettingsPress
  } = props;

  return (
    <Link
      className={styles.button}
      title={advancedSettings ? translate('shownClickToHide') : translate('hiddenClickToShow')}
      onPress={onAdvancedSettingsPress}
    >
      <Icon
        name={icons.ADVANCED_SETTINGS}
        size={21}
      />

      <span
        className={classNames(
          styles.indicatorContainer,
          'fa-layers fa-fw'
        )}
      >
        <Icon
          className={styles.indicatorBackground}
          name={icons.CIRCLE}
          size={16}
        />

        <Icon
          className={advancedSettings ? styles.enabled : styles.disabled}
          name={advancedSettings ? icons.CHECK : icons.CLOSE}
          size={10}
        />
      </span>

      <div className={styles.labelContainer}>
        <div className={styles.label}>
          {advancedSettings ? translate('hideAdvanced') : translate('showAdvanced')}
        </div>
      </div>
    </Link>
  );
}

AdvancedSettingsButton.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  onAdvancedSettingsPress: PropTypes.func.isRequired
};

export default AdvancedSettingsButton;
