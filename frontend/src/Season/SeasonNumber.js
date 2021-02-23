import PropTypes from 'prop-types';
import translate from 'Utilities/String/translate';

function SeasonNumber(props) {
  const {
    seasonNumber,
    separator
  } = props;

  if (seasonNumber === 0) {
    return `${separator}${translate('specials')}`;
  }

  if (seasonNumber > 0) {
    return `${separator}${translate('season')} ${seasonNumber}`;
  }

  return null;
}

SeasonNumber.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  separator: PropTypes.string.isRequired
};

SeasonNumber.defaultProps = {
  separator: '- '
};

export default SeasonNumber;
