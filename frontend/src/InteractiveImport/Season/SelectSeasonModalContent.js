import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import SelectSeasonRow from './SelectSeasonRow';
import translate from 'Utilities/String/translate';

class SelectSeasonModalContent extends Component {

  //
  // Render

  render() {
    const {
      items,
      onSeasonSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('manualImport')} - {translate('selectSeason')}
        </ModalHeader>

        <ModalBody>
          {
            items.map((item) => {
              return (
                <SelectSeasonRow
                  key={item.seasonNumber}
                  seasonNumber={item.seasonNumber}
                  onSeasonSelect={onSeasonSelect}
                />
              );
            })
          }
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SelectSeasonModalContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSeasonSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectSeasonModalContent;
