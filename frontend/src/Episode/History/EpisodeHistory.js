import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import EpisodeHistoryRow from './EpisodeHistoryRow';
import translate from 'Utilities/String/translate';

const columns = [
  {
    name: 'eventType',
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

class EpisodeHistory extends Component {

  //
  // Render

  render() {
    const {
      isFetching,
      isPopulated,
      error,
      items,
      onMarkAsFailedPress
    } = this.props;

    const hasItems = !!items.length;

    if (isFetching) {
      return (
        <LoadingIndicator />
      );
    }

    if (!isFetching && !!error) {
      return (
        <div>{translate('unableToLoadEpisodeHistory')}</div>
      );
    }

    if (isPopulated && !hasItems && !error) {
      return (
        <div>{translate('noEpisodeHistory')}</div>
      );
    }

    if (isPopulated && hasItems && !error) {
      return (
        <Table
          columns={columns}
        >
          <TableBody>
            {
              items.map((item) => {
                return (
                  <EpisodeHistoryRow
                    key={item.id}
                    {...item}
                    onMarkAsFailedPress={onMarkAsFailedPress}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      );
    }

    return null;
  }
}

EpisodeHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired
};

EpisodeHistory.defaultProps = {
  selectedTab: 'details'
};

export default EpisodeHistory;
