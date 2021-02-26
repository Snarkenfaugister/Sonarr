import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import FieldSet from 'Components/FieldSet';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItemTitle from 'Components/DescriptionList/DescriptionListItemTitle';
import DescriptionListItemDescription from 'Components/DescriptionList/DescriptionListItemDescription';
import translate from 'Utilities/String/translate';

class MoreInfo extends Component {

  //
  // Render

  render() {
    return (
      <FieldSet legend={translate('moreInfo')}>
        <DescriptionList>
          <DescriptionListItemTitle>{translate('homePage')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://sonarr.tv/">sonarr.tv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('wiki')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://wiki.servarr.com/Sonarr">wiki.servarr.com/Sonarr</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('forums')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://forums.sonarr.tv/">forums.sonarr.tv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('twitter')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://sonarr.tv/">@sonarrtv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('discord')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://discord.gg/M6BvZn5">discord.gg/M6BvZn5</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('irc')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="irc://irc.freenode.net/#sonarr">#sonarr on Freenode</Link>
          </DescriptionListItemDescription>
          <DescriptionListItemDescription>
            <Link to="http://webchat.freenode.net/?channels=#sonarr">Freenode webchat</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('donations')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://sonarr.tv/donate">sonarr.tv/donate</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('source')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://github.com/Sonarr/Sonarr/">github.com/Sonarr/Sonarr</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>{translate('featureRequests')}</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://forums.sonarr.tv/">forums.sonarr.tv</Link>
          </DescriptionListItemDescription>
          <DescriptionListItemDescription>
            <Link to="https://github.com/Sonarr/Sonarr/issues">github.com/Sonarr/Sonarr/issues</Link>
          </DescriptionListItemDescription>

        </DescriptionList>
      </FieldSet>
    );
  }
}

MoreInfo.propTypes = {

};

export default MoreInfo;
