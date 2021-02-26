import PropTypes from 'prop-types';
import React from 'react';
import titleCase from 'Utilities/String/titleCase';
import translate from 'Utilities/String/translate';

function TagDetailsDelayProfile(props) {
  const {
    preferredProtocol,
    enableUsenet,
    enableTorrent,
    usenetDelay,
    torrentDelay
  } = props;

  return (
    <div>
      <div>
        {translate('protocolInterp', [titleCase(preferredProtocol)])}
      </div>

      <div>
        {
          enableUsenet ?
            translate('usenetDelayTime', [usenetDelay]) :
            translate('usenetDisabled')
        }
      </div>

      <div>
        {
          enableTorrent ?
            translate('torrentDelayTime', [torrentDelay]) :
            translate('torrentsDisabled')
        }
      </div>
    </div>
  );
}

TagDetailsDelayProfile.propTypes = {
  preferredProtocol: PropTypes.string.isRequired,
  enableUsenet: PropTypes.bool.isRequired,
  enableTorrent: PropTypes.bool.isRequired,
  usenetDelay: PropTypes.number.isRequired,
  torrentDelay: PropTypes.number.isRequired
};

export default TagDetailsDelayProfile;
