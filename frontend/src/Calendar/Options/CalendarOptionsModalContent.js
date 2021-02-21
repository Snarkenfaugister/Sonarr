import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes } from 'Helpers/Props';
import FieldSet from 'Components/FieldSet';
import Button from 'Components/Link/Button';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import { firstDayOfWeekOptions, weekColumnOptions, timeFormatOptions } from 'Settings/UI/UISettings';
import translate from 'Utilities/String/translate';

class CalendarOptionsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    const {
      firstDayOfWeek,
      calendarWeekColumnHeader,
      timeFormat,
      enableColorImpairedMode
    } = props;

    this.state = {
      firstDayOfWeek,
      calendarWeekColumnHeader,
      timeFormat,
      enableColorImpairedMode
    };
  }

  componentDidUpdate(prevProps) {
    const {
      firstDayOfWeek,
      calendarWeekColumnHeader,
      timeFormat,
      enableColorImpairedMode
    } = this.props;

    if (
      prevProps.firstDayOfWeek !== firstDayOfWeek ||
      prevProps.calendarWeekColumnHeader !== calendarWeekColumnHeader ||
      prevProps.timeFormat !== timeFormat ||
      prevProps.enableColorImpairedMode !== enableColorImpairedMode
    ) {
      this.setState({
        firstDayOfWeek,
        calendarWeekColumnHeader,
        timeFormat,
        enableColorImpairedMode
      });
    }
  }

  //
  // Listeners

  onOptionInputChange = ({ name, value }) => {
    const {
      dispatchSetCalendarOption
    } = this.props;

    dispatchSetCalendarOption({ [name]: value });
  }

  onGlobalInputChange = ({ name, value }) => {
    const {
      dispatchSaveUISettings
    } = this.props;

    const setting = { [name]: value };

    this.setState(setting, () => {
      dispatchSaveUISettings(setting);
    });
  }

  onLinkFocus = (event) => {
    event.target.select();
  }

  //
  // Render

  render() {
    const {
      collapseMultipleEpisodes,
      showEpisodeInformation,
      showFinaleIcon,
      showSpecialIcon,
      showCutoffUnmetIcon,
      onModalClose
    } = this.props;

    const {
      firstDayOfWeek,
      calendarWeekColumnHeader,
      timeFormat,
      enableColorImpairedMode
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('calendarOptions')}
        </ModalHeader>

        <ModalBody>
          <FieldSet legend={translate('local')}>
            <Form>
              <FormGroup>
                <FormLabel>{translate('collapseMultipleEpisodes')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="collapseMultipleEpisodes"
                  value={collapseMultipleEpisodes}
                  helpText={translate('collapseMultipleEpisodesHelpText')}
                  onChange={this.onOptionInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('showEpisodeInformation')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="showEpisodeInformation"
                  value={showEpisodeInformation}
                  helpText={translate('showEpisodeInformationHelpText')}
                  onChange={this.onOptionInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('iconForFinales')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="showFinaleIcon"
                  value={showFinaleIcon}
                  helpText={translate('showForFinalesHelpText')}
                  onChange={this.onOptionInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('iconForSpecials')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="showSpecialIcon"
                  value={showSpecialIcon}
                  helpText={translate('showForSpecialsHelpText')}
                  onChange={this.onOptionInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('iconForCutoffUnmet')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="showCutoffUnmetIcon"
                  value={showCutoffUnmetIcon}
                  helpText={translate('showCutoffUnmetIconHelpText')}
                  onChange={this.onOptionInputChange}
                />
              </FormGroup>
            </Form>
          </FieldSet>

          <FieldSet legend={translate('global')}>
            <Form>
              <FormGroup>
                <FormLabel>{translate('settingsFirstDayOfWeek')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="firstDayOfWeek"
                  values={firstDayOfWeekOptions}
                  value={firstDayOfWeek}
                  onChange={this.onGlobalInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('settingsWeekColumnHeader')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="calendarWeekColumnHeader"
                  values={weekColumnOptions}
                  value={calendarWeekColumnHeader}
                  onChange={this.onGlobalInputChange}
                  helpText={translate('settingsWeekColumnHeaderHelpText')}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('settingsTimeFormat')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="timeFormat"
                  values={timeFormatOptions}
                  value={timeFormat}
                  onChange={this.onGlobalInputChange}
                />
              </FormGroup><FormGroup>
                <FormLabel>{translate('settingsEnableColorImpairedMode')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="enableColorImpairedMode"
                  value={enableColorImpairedMode}
                  helpText={translate('settingsEnableColorImpairedModeHelpText')}
                  onChange={this.onGlobalInputChange}
                />
              </FormGroup>

            </Form>
          </FieldSet>
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

CalendarOptionsModalContent.propTypes = {
  collapseMultipleEpisodes: PropTypes.bool.isRequired,
  showEpisodeInformation: PropTypes.bool.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  showSpecialIcon: PropTypes.bool.isRequired,
  showCutoffUnmetIcon: PropTypes.bool.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  calendarWeekColumnHeader: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  enableColorImpairedMode: PropTypes.bool.isRequired,
  dispatchSetCalendarOption: PropTypes.func.isRequired,
  dispatchSaveUISettings: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default CalendarOptionsModalContent;
