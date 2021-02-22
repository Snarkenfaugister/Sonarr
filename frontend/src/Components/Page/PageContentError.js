import React from 'react';
import ErrorBoundaryError from 'Components/Error/ErrorBoundaryError';
import PageContentBody from './PageContentBody';
import styles from './PageContentError.css';
import translate from 'Utilities/String/translate';

function PageContentError(props) {
  return (
    <div className={styles.content}>
      <PageContentBody>
        <ErrorBoundaryError
          {...props}
          message={translate('errorLoadingPage')}
        />
      </PageContentBody>
    </div>
  );
}

export default PageContentError;
