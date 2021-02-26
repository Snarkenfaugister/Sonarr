import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FieldSet from 'Components/FieldSet';
import PageSectionContent from 'Components/Page/PageSectionContent';
import QualityDefinitionConnector from './QualityDefinitionConnector';
import styles from './QualityDefinitions.css';
import translate from 'Utilities/String/translate';

class QualityDefinitions extends Component {

  //
  // Render

  render() {
    const {
      items,
      advancedSettings,
      ...otherProps
    } = this.props;

    return (
      <FieldSet legend={translate('qualityDefinitions')}>
        <PageSectionContent
          errorMessage={translate('unableToLoadQualityDefinitions')}
          {...otherProps}
        >
          <div className={styles.header}>
            <div className={styles.quality}>{translate('quality')}</div>
            <div className={styles.title}>{translate('title')}</div>
            <div className={styles.sizeLimit}>{translate('sizeLimit')}</div>

            {
              advancedSettings ?
                <div className={styles.megabytesPerMinute}>
                  {translate('megabytesPerMinute')}
                </div> :
                null
            }
          </div>

          <div className={styles.definitions}>
            {
              items.map((item) => {
                return (
                  <QualityDefinitionConnector
                    key={item.id}
                    {...item}
                    advancedSettings={advancedSettings}
                  />
                );
              })
            }
          </div>

          <div className={styles.sizeLimitHelpTextContainer}>
            <div className={styles.sizeLimitHelpText}>
              {translate('qualityLimitsHelpText')}
            </div>
          </div>
        </PageSectionContent>
      </FieldSet>
    );
  }
}

QualityDefinitions.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  defaultProfile: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  advancedSettings: PropTypes.bool.isRequired
};

export default QualityDefinitions;
