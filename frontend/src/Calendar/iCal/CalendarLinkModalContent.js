import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, inputTypes, kinds, sizes } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Button from 'Components/Link/Button';
import ClipboardButton from 'Components/Link/ClipboardButton';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormInputButton from 'Components/Form/FormInputButton';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import translate from 'Utilities/String/translate';

function getUrls(state) {
  const {
    unmonitored,
    premieresOnly,
    asAllDay,
    tags
  } = state;

  let icalUrl = `${window.location.host}${window.Sonarr.urlBase}/feed/calendar/Sonarr.ics?`;

  if (unmonitored) {
    icalUrl += 'unmonitored=true&';
  }

  if (premieresOnly) {
    icalUrl += 'premieresOnly=true&';
  }

  if (asAllDay) {
    icalUrl += 'asAllDay=true&';
  }

  if (tags.length) {
    icalUrl += `tags=${tags.toString()}&`;
  }

  icalUrl += `apikey=${window.Sonarr.apiKey}`;

  const iCalHttpUrl = `${window.location.protocol}//${icalUrl}`;
  const iCalWebCalUrl = `webcal://${icalUrl}`;

  return {
    iCalHttpUrl,
    iCalWebCalUrl
  };
}

class CalendarLinkModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    const defaultState = {
      unmonitored: false,
      premieresOnly: false,
      asAllDay: false,
      tags: []
    };

    const urls = getUrls(defaultState);

    this.state = {
      ...defaultState,
      ...urls
    };
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    const state = {
      ...this.state,
      [name]: value
    };

    const urls = getUrls(state);

    this.setState({
      [name]: value,
      ...urls
    });
  }

  onLinkFocus = (event) => {
    event.target.select();
  }

  //
  // Render

  render() {
    const {
      onModalClose
    } = this.props;

    const {
      unmonitored,
      premieresOnly,
      asAllDay,
      tags,
      iCalHttpUrl,
      iCalWebCalUrl
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('sonarrCalendarFeed')}
        </ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>{translate('includeUnmonitored')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="unmonitored"
                value={unmonitored}
                helpText={translate('unmonitoredHelpText')}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('seasonPremieresOnly')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="premieresOnly"
                value={premieresOnly}
                helpText={translate('premieresOnlyHelpText')}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showAsAllDayEvents')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="asAllDay"
                value={asAllDay}
                helpText={translate('asAllDayHelpText')}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('tags')}</FormLabel>

              <FormInputGroup
                type={inputTypes.TAG}
                name="tags"
                value={tags}
                helpText={translate('tagsOnlyHelpText')}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup
              size={sizes.LARGE}
            >
              <FormLabel>{translate('iCalFeed')}</FormLabel>

              <FormInputGroup
                type={inputTypes.TEXT}
                name="iCalHttpUrl"
                value={iCalHttpUrl}
                readOnly={true}
                helpText={translate('iCalHttpUrlHelpText')}
                buttons={[
                  <ClipboardButton
                    key="copy"
                    value={iCalHttpUrl}
                    kind={kinds.DEFAULT}
                  />,

                  <FormInputButton
                    key="webcal"
                    kind={kinds.DEFAULT}
                    to={iCalWebCalUrl}
                    target="_blank"
                    noRouter={true}
                  >
                    <Icon name={icons.CALENDAR_O} />
                  </FormInputButton>
                ]}
                onChange={this.onInputChange}
                onFocus={this.onLinkFocus}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

CalendarLinkModalContent.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default CalendarLinkModalContent;
