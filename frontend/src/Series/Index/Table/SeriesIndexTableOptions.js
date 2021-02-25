import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { inputTypes } from 'Helpers/Props';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import translate from 'Utilities/String/translate';

class SeriesIndexTableOptions extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      showBanners: props.showBanners,
      showSearchAction: props.showSearchAction
    };
  }

  componentDidUpdate(prevProps) {
    const {
      showBanners,
      showSearchAction
    } = this.props;

    if (
      showBanners !== prevProps.showBanners ||
      showSearchAction !== prevProps.showSearchAction
    ) {
      this.setState({
        showBanners,
        showSearchAction
      });
    }
  }

  //
  // Listeners

  onTableOptionChange = ({ name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.onTableOptionChange({
        tableOptions: {
          ...this.state,
          [name]: value
        }
      });
    });
  }

  //
  // Render

  render() {
    const {
      showBanners,
      showSearchAction
    } = this.state;

    return (
      <Fragment>
        <FormGroup>
          <FormLabel>{translate('showBanners')}</FormLabel>

          <FormInputGroup
            type={inputTypes.CHECK}
            name="showBanners"
            value={showBanners}
            helpText={translate('showBannersHelpText')}
            onChange={this.onTableOptionChange}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>{translate('showSearch')}</FormLabel>

          <FormInputGroup
            type={inputTypes.CHECK}
            name="showSearchAction"
            value={showSearchAction}
            helpText={translate('showSearchHelpText')}
            onChange={this.onTableOptionChange}
          />
        </FormGroup>
      </Fragment>
    );
  }
}

SeriesIndexTableOptions.propTypes = {
  showBanners: PropTypes.bool.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  onTableOptionChange: PropTypes.func.isRequired
};

export default SeriesIndexTableOptions;
