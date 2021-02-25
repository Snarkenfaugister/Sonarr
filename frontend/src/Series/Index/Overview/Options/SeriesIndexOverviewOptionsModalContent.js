import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import translate from 'Utilities/String/translate';

const posterSizeOptions = [
  { key: 'small', value: translate('small') },
  { key: 'medium', value: translate('medium') },
  { key: 'large', value: translate('large') }
];

class SeriesIndexOverviewOptionsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      detailedProgressBar: props.detailedProgressBar,
      size: props.size,
      showMonitored: props.showMonitored,
      showNetwork: props.showNetwork,
      showQualityProfile: props.showQualityProfile,
      showPreviousAiring: props.showPreviousAiring,
      showAdded: props.showAdded,
      showSeasonCount: props.showSeasonCount,
      showPath: props.showPath,
      showSizeOnDisk: props.showSizeOnDisk,
      showSearchAction: props.showSearchAction
    };
  }

  componentDidUpdate(prevProps) {
    const {
      detailedProgressBar,
      size,
      showMonitored,
      showNetwork,
      showQualityProfile,
      showPreviousAiring,
      showAdded,
      showSeasonCount,
      showPath,
      showSizeOnDisk,
      showSearchAction
    } = this.props;

    const state = {};

    if (detailedProgressBar !== prevProps.detailedProgressBar) {
      state.detailedProgressBar = detailedProgressBar;
    }

    if (size !== prevProps.size) {
      state.size = size;
    }

    if (showMonitored !== prevProps.showMonitored) {
      state.showMonitored = showMonitored;
    }

    if (showNetwork !== prevProps.showNetwork) {
      state.showNetwork = showNetwork;
    }

    if (showQualityProfile !== prevProps.showQualityProfile) {
      state.showQualityProfile = showQualityProfile;
    }

    if (showPreviousAiring !== prevProps.showPreviousAiring) {
      state.showPreviousAiring = showPreviousAiring;
    }

    if (showAdded !== prevProps.showAdded) {
      state.showAdded = showAdded;
    }

    if (showSeasonCount !== prevProps.showSeasonCount) {
      state.showSeasonCount = showSeasonCount;
    }

    if (showPath !== prevProps.showPath) {
      state.showPath = showPath;
    }

    if (showSizeOnDisk !== prevProps.showSizeOnDisk) {
      state.showSizeOnDisk = showSizeOnDisk;
    }

    if (showSearchAction !== prevProps.showSearchAction) {
      state.showSearchAction = showSearchAction;
    }

    if (!_.isEmpty(state)) {
      this.setState(state);
    }
  }

  //
  // Listeners

  onChangeOverviewOption = ({ name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.onChangeOverviewOption({ [name]: value });
    });
  }

  //
  // Render

  render() {
    const {
      onModalClose
    } = this.props;

    const {
      detailedProgressBar,
      size,
      showMonitored,
      showNetwork,
      showQualityProfile,
      showPreviousAiring,
      showAdded,
      showSeasonCount,
      showPath,
      showSizeOnDisk,
      showSearchAction
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('overviewOptions')}
        </ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>{translate('posterSize')}</FormLabel>

              <FormInputGroup
                type={inputTypes.SELECT}
                name="size"
                value={size}
                values={posterSizeOptions}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('detailedProgressBar')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="detailedProgressBar"
                value={detailedProgressBar}
                helpText={translate('detailedProgressBarHelpText')}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showMonitored')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showMonitored"
                value={showMonitored}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showNetwork')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showNetwork"
                value={showNetwork}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showQualityProfile')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showQualityProfile"
                value={showQualityProfile}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showPreviousAiring')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showPreviousAiring"
                value={showPreviousAiring}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showDateAdded')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showAdded"
                value={showAdded}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showSeasonCount')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showSeasonCount"
                value={showSeasonCount}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showPath')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showPath"
                value={showPath}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showSizeOnDisk')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showSizeOnDisk"
                value={showSizeOnDisk}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('showSearch')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showSearchAction"
                value={showSearchAction}
                helpText={translate('showSearchHelpText')}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={onModalClose}
          >
            {translate('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SeriesIndexOverviewOptionsModalContent.propTypes = {
  size: PropTypes.string.isRequired,
  detailedProgressBar: PropTypes.bool.isRequired,
  showMonitored: PropTypes.bool.isRequired,
  showNetwork: PropTypes.bool.isRequired,
  showQualityProfile: PropTypes.bool.isRequired,
  showPreviousAiring: PropTypes.bool.isRequired,
  showAdded: PropTypes.bool.isRequired,
  showSeasonCount: PropTypes.bool.isRequired,
  showPath: PropTypes.bool.isRequired,
  showSizeOnDisk: PropTypes.bool.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  onChangeOverviewOption: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SeriesIndexOverviewOptionsModalContent;
