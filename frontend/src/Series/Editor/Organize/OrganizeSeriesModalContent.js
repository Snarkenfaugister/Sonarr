import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './OrganizeSeriesModalContent.css';
import translate from 'Utilities/String/translate';

function OrganizeSeriesModalContent(props) {
  const {
    seriesTitles,
    onModalClose,
    onOrganizeSeriesPress
  } = props;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {translate('organizeSelectedSeries')}
      </ModalHeader>

      <ModalBody>
        <Alert>
          {translate('previewRenameHelpText')}
          <Icon
            className={styles.renameIcon}
            name={icons.ORGANIZE}
          />
        </Alert>

        <div className={styles.message}>
          {translate('organizeConfirm', [seriesTitles.length])}
        </div>

        <ul>
          {
            seriesTitles.map((title) => {
              return (
                <li key={title}>
                  {title}
                </li>
              );
            })
          }
        </ul>
      </ModalBody>

      <ModalFooter>
        <Button onPress={onModalClose}>
          {translate('cancel')}
        </Button>

        <Button
          kind={kinds.DANGER}
          onPress={onOrganizeSeriesPress}
        >
          {translate('organize')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

OrganizeSeriesModalContent.propTypes = {
  seriesTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onOrganizeSeriesPress: PropTypes.func.isRequired
};

export default OrganizeSeriesModalContent;
