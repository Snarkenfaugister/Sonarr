import React from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import NotificationsConnector from './Notifications/NotificationsConnector';
import translate from 'Utilities/String/translate';

function NotificationSettings() {
  return (
    <PageContent title={translate('connectSettings')}>
      <SettingsToolbarConnector
        showSave={false}
      />

      <PageContentBody>
        <NotificationsConnector />
      </PageContentBody>
    </PageContent>
  );
}

export default NotificationSettings;
