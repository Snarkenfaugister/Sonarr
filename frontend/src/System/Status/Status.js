import React, { Component } from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import HealthConnector from './Health/HealthConnector';
import DiskSpaceConnector from './DiskSpace/DiskSpaceConnector';
import AboutConnector from './About/AboutConnector';
import MoreInfo from './MoreInfo/MoreInfo';
import translate from 'Utilities/String/translate';

class Status extends Component {

  //
  // Render

  render() {
    return (
      <PageContent title={translate('status')}>
        <PageContentBody>
          <HealthConnector />
          <DiskSpaceConnector />
          <AboutConnector />
          <MoreInfo />
        </PageContentBody>
      </PageContent>
    );
  }

}

export default Status;
