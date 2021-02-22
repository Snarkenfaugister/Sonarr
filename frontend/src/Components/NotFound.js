import PropTypes from 'prop-types';
import React from 'react';
import PageContent from 'Components/Page/PageContent';
import styles from './NotFound.css';
import translate from 'Utilities/String/translate';

function NotFound({ message }) {
  return (
    <PageContent title={translate('mia')}>
      <div className={styles.container}>
        <div className={styles.message}>
          {message}
        </div>

        <img
          className={styles.image}
          src={`${window.Sonarr.urlBase}/Content/Images/404.png`}
        />
      </div>
    </PageContent>
  );
}

NotFound.propTypes = {
  message: PropTypes.string.isRequired
};

NotFound.defaultProps = {
  message: translate('youMustBeLost')
};

export default NotFound;
