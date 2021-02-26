import PropTypes from 'prop-types';
import React from 'react';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import ScheduledTaskRowConnector from './ScheduledTaskRowConnector';
import translate from 'Utilities/String/translate';

const columns = [
  {
    name: 'name',
    label: translate('name'),
    isVisible: true
  },
  {
    name: 'interval',
    label: translate('interval'),
    isVisible: true
  },
  {
    name: 'lastExecution',
    label: translate('lastExecution'),
    isVisible: true
  },
  {
    name: 'nextExecution',
    label: translate('nextExecution'),
    isVisible: true
  },
  {
    name: 'actions',
    isVisible: true
  }
];

function ScheduledTasks(props) {
  const {
    isFetching,
    isPopulated,
    items
  } = props;

  return (
    <FieldSet legend={translate('scheduled')}>
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
                  <ScheduledTaskRowConnector
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

ScheduledTasks.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default ScheduledTasks;
