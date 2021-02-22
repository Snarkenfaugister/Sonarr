import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import ErrorBoundary from 'Components/Error/ErrorBoundary';
import PageContentError from './PageContentError';
import styles from './PageContent.css';
import translate from 'Utilities/String/translate';

function PageContent(props) {
  const {
    className,
    title,
    children
  } = props;

  return (
    <ErrorBoundary errorComponent={PageContentError}>
      <DocumentTitle title={title ? `${title} - ${translate('sonarr')}` : translate('sonarr')}>
        <div className={className}>
          {children}
        </div>
      </DocumentTitle>
    </ErrorBoundary>
  );
}

PageContent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageContent.defaultProps = {
  className: styles.content
};

export default PageContent;
