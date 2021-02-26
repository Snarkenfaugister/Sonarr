import PropTypes from 'prop-types';
import React from 'react';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import QueuedTaskRowConnector from './QueuedTaskRowConnector';
import translate from 'Utilities/String/translate';

const columns = [
  {
    name: 'trigger',
    label: '',
    isVisible: true
  },
  {
    name: 'commandName',
    label: translate('name'),
    isVisible: true
  },
  {
    name: 'queued',
    label: translate('queued'),
    isVisible: true
  },
  {
    name: 'started',
    label: translate('started'),
    isVisible: true
  },
  {
    name: 'ended',
    label: translate('ended'),
    isVisible: true
  },
  {
    name: 'duration',
    label: translate('duration'),
    isVisible: true
  },
  {
    name: 'actions',
    isVisible: true
  }
];

function QueuedTasks(props) {
  const {
    isFetching,
    isPopulated,
    items
  } = props;

  return (
    <FieldSet legend={translate('queue')}>
      {
        isFetching && !isPopulated &&
        <LoadingIndicator />
      }

      {
        isPopulated &&
        <Table
          columns={columns}
        >
          <TableBody>
            {
              items.map((item) => {
                return (
                  <QueuedTaskRowConnector
                    key={item.id}
                    {...item}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      }
    </FieldSet>
  );
}

QueuedTasks.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default QueuedTasks;
