import React from 'react';
import Link from 'Components/Link/Link';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from './SettingsToolbarConnector';
import styles from './Settings.css';
import translate from 'Utilities/String/translate';

function Settings() {
  return (
    <PageContent title={translate('settings')}>
      <SettingsToolbarConnector
        hasPendingChanges={false}
      />

      <PageContentBody>
        <Link
          className={styles.link}
          to="/settings/mediamanagement"
        >
          {translate('mediaManagement')}
        </Link>

        <div className={styles.summary}>
          {translate('mediaManagementSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/profiles"
        >
          {translate('profiles')}
        </Link>

        <div className={styles.summary}>
          {translate('profilesSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/quality"
        >
          {translate('quality')}
        </Link>

        <div className={styles.summary}>
          {translate('qualitySettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/indexers"
        >
          {translate('indexers')}
        </Link>

        <div className={styles.summary}>
          {translate('indexersSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/downloadclients"
        >
          {translate('downloadClients')}
        </Link>

        <div className={styles.summary}>
          {translate('downloadClientsSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/importlists"
        >
          {translate('importLists')}
        </Link>

        <div className={styles.summary}>
          {translate('importListsSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/connect"
        >
          {translate('connect')}
        </Link>

        <div className={styles.summary}>
          {translate('connectSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/metadata"
        >
          {translate('metadata')}
        </Link>

        <div className={styles.summary}>
          {translate('metadataSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/tags"
        >
          {translate('tags')}
        </Link>

        <div className={styles.summary}>
          {translate('tagsSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/general"
        >
          {translate('general')}
        </Link>

        <div className={styles.summary}>
          {translate('generalSettingsSummary')}
        </div>

        <Link
          className={styles.link}
          to="/settings/ui"
        >
          {translate('ui')}
        </Link>

        <div className={styles.summary}>
          {translate('uiSettingsSummary')}
        </div>
      </PageContentBody>
    </PageContent>
  );
}

Settings.propTypes = {
};

export default Settings;
