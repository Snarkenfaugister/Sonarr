import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from 'Helpers/Props';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import translate from 'Utilities/String/translate';

function OAuthInput(props) {
  const {
    label,
    authorizing,
    error,
    onPress
  } = props;

  return (
    <div>
      <SpinnerErrorButton
        kind={kinds.PRIMARY}
        isSpinning={authorizing}
        error={error}
        onPress={onPress}
      >
        {label}
      </SpinnerErrorButton>
    </div>
  );
}

OAuthInput.propTypes = {
  label: PropTypes.string.isRequired,
  authorizing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onPress: PropTypes.func.isRequired
};

OAuthInput.defaultProps = {
  label: translate('startOauth')
};

export default OAuthInput;
