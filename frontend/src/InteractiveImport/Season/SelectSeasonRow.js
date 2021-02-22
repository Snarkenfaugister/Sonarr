import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import styles from './SelectSeasonRow.css';
import translate from 'Utilities/String/translate';

class SelectSeasonRow extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onSeasonSelect(this.props.seasonNumber);
  }

  //
  // Render

  render() {
    const seasonNumber = this.props.seasonNumber;

    return (
      <Link
        className={styles.season}
        component="div"
        onPress={this.onPress}
      >
        {
          seasonNumber === 0 ? translate('specials') : translate('seasonInterp', [seasonNumber])
        }
      </Link>
    );
  }
}

SelectSeasonRow.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  onSeasonSelect: PropTypes.func.isRequired
};

export default SelectSeasonRow;
