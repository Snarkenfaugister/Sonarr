import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { icons } from 'Helpers/Props';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import styles from './MonitorToggleButton.css';
import translate from 'Utilities/String/translate';

function getTooltip(monitored, isDisabled) {
  if (isDisabled) {
    return translate('cannotToggleWhenUnmonitored');
  }

  if (monitored) {
    return translate('monitoredClickToUnmonitor');
  }

  return translate('unmonitoredClickToMonitor');
}

class MonitorToggleButton extends Component {

  //
  // Listeners

  onPress = (event) => {
    const shiftKey = event.nativeEvent.shiftKey;

    this.props.onPress(!this.props.monitored, { shiftKey });
  }

  //
  // Render

  render() {
    const {
      className,
      monitored,
      isDisabled,
      isSaving,
      size,
      ...otherProps
    } = this.props;

    const iconName = monitored ? icons.MONITORED : icons.UNMONITORED;

    return (
      <SpinnerIconButton
        className={classNames(
          className,
          isDisabled && styles.isDisabled
        )}
        name={iconName}
        size={size}
        title={getTooltip(monitored, isDisabled)}
        isDisabled={isDisabled}
        isSpinning={isSaving}
        {...otherProps}
        onPress={this.onPress}
      />
    );
  }
}

MonitorToggleButton.propTypes = {
  className: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  size: PropTypes.number,
  isDisabled: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

MonitorToggleButton.defaultProps = {
  className: styles.toggleButton,
  isDisabled: false,
  isSaving: false
};

export default MonitorToggleButton;
