import PropTypes from 'prop-types';
import React, { Component } from 'react';
import titleCase from 'Utilities/String/titleCase';
import FieldSet from 'Components/FieldSet';
import InlineMarkdown from 'Components/Markdown/InlineMarkdown';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import StartTime from './StartTime';
import styles from './About.css';
import translate from 'Utilities/String/translate';

class About extends Component {

  //
  // Render

  render() {
    const {
      version,
      packageVersion,
      packageAuthor,
      isMonoRuntime,
      runtimeVersion,
      appData,
      startupPath,
      mode,
      startTime,
      timeFormat,
      longDateFormat
    } = this.props;

    return (
      <FieldSet legend={translate('about')}>
        <DescriptionList className={styles.descriptionList}>
          <DescriptionListItem
            title={translate('version')}
            data={version}
          />

          {
            packageVersion &&
              <DescriptionListItem
                title={translate('packageVersion')}
                data={(packageAuthor ? <span> {packageVersion} {' by '} <InlineMarkdown data={packageAuthor} /> </span> : packageVersion)}
              />
          }

          {
            isMonoRuntime ?
              <DescriptionListItem
                title={translate('monoVersion')}
                data={runtimeVersion}
              /> :
              <DescriptionListItem
                title={translate('dotNetVersion')}
                data={runtimeVersion}
              />
          }

          <DescriptionListItem
            title={translate('appDataDirectory')}
            data={appData}
          />

          <DescriptionListItem
            title={translate('startupDirectory')}
            data={startupPath}
          />

          <DescriptionListItem
            title={translate('mode')}
            data={titleCase(mode)}
          />

          <DescriptionListItem
            title={translate('uptime')}
            data={
              <StartTime
                startTime={startTime}
                timeFormat={timeFormat}
                longDateFormat={longDateFormat}
              />
            }
          />
        </DescriptionList>
      </FieldSet>
    );
  }

}

About.propTypes = {
  version: PropTypes.string.isRequired,
  packageVersion: PropTypes.string,
  packageAuthor: PropTypes.string,
  isMonoRuntime: PropTypes.bool.isRequired,
  runtimeVersion: PropTypes.string.isRequired,
  appData: PropTypes.string.isRequired,
  startupPath: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired
};

export default About;
