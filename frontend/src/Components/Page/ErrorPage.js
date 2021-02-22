import PropTypes from 'prop-types';
import React from 'react';
import getErrorMessage from 'Utilities/Object/getErrorMessage';
import translate from 'Utilities/String/translate';
import styles from './ErrorPage.css';

function ErrorPage(props) {
  const {
    version,
    isLocalStorageSupported,
    seriesError,
    customFiltersError,
    tagsError,
    qualityProfilesError,
    languageProfilesError,
    uiSettingsError,
    systemStatusError
  } = props;

  let errorMessage = translate('failedToLoadSonarr');

  if (!isLocalStorageSupported) {
    errorMessage = translate('localStorageNotSupportedOrDisabledError');
  } else if (seriesError) {
    errorMessage = getErrorMessage(seriesError, translate('failedToLoadSeriesFromAPI'));
  } else if (customFiltersError) {
    errorMessage = getErrorMessage(customFiltersError, translate('failedToLoadCustomFiltersFromAPI'));
  } else if (tagsError) {
    errorMessage = getErrorMessage(tagsError, translate('failedToLoadTagsFromAPI'));
  } else if (qualityProfilesError) {
    errorMessage = getErrorMessage(qualityProfilesError, translate('failedToLoadQualityProfilesFromAPI'));
  } else if (languageProfilesError) {
    errorMessage = getErrorMessage(languageProfilesError, translate('failedToLoadLanguageProfilesFromAPI'));
  } else if (uiSettingsError) {
    errorMessage = getErrorMessage(uiSettingsError, translate('failedToLoadUiSettingsFromAPI'));
  } else if (systemStatusError) {
    errorMessage = getErrorMessage(uiSettingsError, translate('failedToLoadSystemStatusFromAPI'));
  }

  return (
    <div className={styles.page}>
      <div className={styles.errorMessage}>
        {errorMessage}
      </div>

      <div className={styles.version}>
        {translate('versionInterp', [version])}
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  version: PropTypes.string.isRequired,
  isLocalStorageSupported: PropTypes.bool.isRequired,
  seriesError: PropTypes.object,
  customFiltersError: PropTypes.object,
  tagsError: PropTypes.object,
  qualityProfilesError: PropTypes.object,
  languageProfilesError: PropTypes.object,
  uiSettingsError: PropTypes.object,
  systemStatusError: PropTypes.object
};

export default ErrorPage;
