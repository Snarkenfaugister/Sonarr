import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'Components/Link/Button';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import SeasonNumber from 'Season/SeasonNumber';
import SeriesHistoryRowConnector from './SeriesHistoryRowConnector';
import translate from 'Utilities/String/translate';
const columns = [
  {
    name: 'eventType',
    isVisible: true
  },
  {
    name: 'episode',
    label: translate('episode'),
    isVisible: true
  },
  {
    name: 'sourceTitle',
    label: translate('sourceTitle'),
    isVisible: true
  },
  {
    name: 'language',
    label: translate('language'),
    isVisible: true
  },
  {
    name: 'quality',
    label: translate('quality'),
    isVisible: true
  },
  {
    name: 'date',
    label: translate('date'),
    isVisible: true
  },
  {
    name: 'details',
    label: translate('details'),
    isVisible: true
  },
  {
    name: 'actions',
    label: translate('actions'),
    isVisible: true
  }
];

class SeriesHistoryModalContent extends Component {

  //
  // Render

  render() {
    const {
      seasonNumber,
      isFetching,
      isPopulated,
      error,
      items,
      onMarkAsFailedPress,
      onModalClose
    } = this.props;

    const fullSeries = seasonNumber == null;
    const hasItems = !!items.length;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('history')} {seasonNumber != null && <SeasonNumber seasonNumber={seasonNumber} />}
        </ModalHeader>

        <ModalBody>
          {
            isFetching &&
              <LoadingIndicator />
          }

          {
            !isFetching && !!error &&
              <div>{translate('unableToLoadHistory')}</div>
          }

          {
            isPopulated && !hasItems && !error &&
              <div>{translate('noHistory')}</div>
          }

          {
            isPopulated && hasItems && !error &&
              <Table columns={columns}>
                <TableBody>
                  {
                    items.map((item) => {
                      return (
                        <SeriesHistoryRowConnector
                          key={item.id}
                          fullSeries={fullSeries}
                          {...item}
                          onMarkAsFailedPress={onMarkAsFailedPress}
                        />
                      );
                    })
                  }
                </TableBody>
              </Table>
          }
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SeriesHistoryModalContent.propTypes = {
  seasonNumber: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SeriesHistoryModalContent;
