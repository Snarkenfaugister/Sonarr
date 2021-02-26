import React from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import ScheduledTasksConnector from './Scheduled/ScheduledTasksConnector';
import QueuedTasksConnector from './Queued/QueuedTasksConnector';
import translate from 'Utilities/String/translate';

function Tasks() {
  return (
    <PageContent title={translate('tasks')}>
      <PageContentBody>
        <ScheduledTasksConnector />
        <QueuedTasksConnector />
      </PageContentBody>
    </PageContent>
  );
}

export default Tasks;
