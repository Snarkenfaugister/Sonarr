import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FormInputButton from 'Components/Form/FormInputButton';
import FieldSet from 'Components/FieldSet';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import NamingModal from './NamingModal';
import styles from './Naming.css';
import translate from 'Utilities/String/translate';

class Naming extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNamingModalOpen: false,
      namingModalOptions: null
    };
  }

  //
  // Listeners

  onStandardNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'standardEpisodeFormat',
        season: true,
        episode: true,
        additional: true
      }
    });
  }

  onDailyNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'dailyEpisodeFormat',
        season: true,
        episode: true,
        daily: true,
        additional: true
      }
    });
  }

  onAnimeNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'animeEpisodeFormat',
        season: true,
        episode: true,
        anime: true,
        additional: true
      }
    });
  }

  onSeriesFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'seriesFolderFormat'
      }
    });
  }

  onSeasonFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'seasonFolderFormat',
        season: true
      }
    });
  }

  onSpecialsFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'specialsFolderFormat',
        season: true
      }
    });
  }

  onNamingModalClose = () => {
    this.setState({ isNamingModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      isFetching,
      error,
      settings,
      hasSettings,
      examples,
      examplesPopulated,
      onInputChange
    } = this.props;

    const {
      isNamingModalOpen,
      namingModalOptions
    } = this.state;

    const renameEpisodes = hasSettings && settings.renameEpisodes.value;

    const multiEpisodeStyleOptions = [
      { key: 0, value: translate('styleOptionsExtend'), hint: 'S01E01-02-03' },
      { key: 1, value: translate('styleOptionsDuplicate'), hint: 'S01E01.S01E02' },
      { key: 2, value: translate('styleOptionsRepeat'), hint: 'S01E01E02E03' },
      { key: 3, value: translate('styleOptionsScene'), hint: 'S01E01-E02-E03' },
      { key: 4, value: translate('styleOptionsRange'), hint: 'S01E01-03' },
      { key: 5, value: translate('styleOptionsPrefixedRange'), hint: 'S01E01-E03' }
    ];

    const standardEpisodeFormatHelpTexts = [];
    const standardEpisodeFormatErrors = [];
    const dailyEpisodeFormatHelpTexts = [];
    const dailyEpisodeFormatErrors = [];
    const animeEpisodeFormatHelpTexts = [];
    const animeEpisodeFormatErrors = [];
    const seriesFolderFormatHelpTexts = [];
    const seriesFolderFormatErrors = [];
    const seasonFolderFormatHelpTexts = [];
    const seasonFolderFormatErrors = [];
    const specialsFolderFormatHelpTexts = [];
    const specialsFolderFormatErrors = [];

    if (examplesPopulated) {
      if (examples.singleEpisodeExample) {
        standardEpisodeFormatHelpTexts.push(translate('singleEpisodeFormatInterp', [examples.singleEpisodeExample]));
      } else {
        standardEpisodeFormatErrors.push({ message: translate('singleEpisodeFormatInterp', [translate('invalidFormat')]) });
      }

      if (examples.multiEpisodeExample) {
        standardEpisodeFormatHelpTexts.push(translate('multiEpisodeFormatInterp', [examples.multiEpisodeExample]));
      } else {
        standardEpisodeFormatErrors.push({ message: translate('multiEpisodeFormatInterp', [translate('invalidFormat')]) });
      }

      if (examples.dailyEpisodeExample) {
        dailyEpisodeFormatHelpTexts.push(translate('singleEpisodeFormatInterp', [examples.dailyEpisodeExample]));
      } else {
        dailyEpisodeFormatErrors.push({ message: translate('invalidFormat') });
      }

      if (examples.animeEpisodeExample) {
        animeEpisodeFormatHelpTexts.push(`Single Episode: ${examples.animeEpisodeExample}`);
      } else {
        animeEpisodeFormatErrors.push({ message: translate('singleEpisodeFormatInterp', [translate('invalidFormat')]) });
      }

      if (examples.animeMultiEpisodeExample) {
        animeEpisodeFormatHelpTexts.push(translate('multiEpisodeFormatInterp', [examples.animeMultiEpisodeExample]));
      } else {
        animeEpisodeFormatErrors.push({ message: translate('multiEpisodeFormatInterp', [translate('invalidFormat')]) });
      }

      if (examples.seriesFolderExample) {
        seriesFolderFormatHelpTexts.push(translate('singleEpisodeFormatInterp', [examples.seriesFolderExample]));
      } else {
        seriesFolderFormatErrors.push({ message: translate('invalidFormat') });
      }

      if (examples.seasonFolderExample) {
        seasonFolderFormatHelpTexts.push(translate('exampleFormatInterp', [examples.seasonFolderExample]));
      } else {
        seasonFolderFormatErrors.push({ message: translate('invalidFormat') });
      }

      if (examples.specialsFolderExample) {
        specialsFolderFormatHelpTexts.push(translate('exampleFormatInterp', [examples.specialsFolderExample]));
      } else {
        specialsFolderFormatErrors.push({ message: translate('invalidFormat') });
      }
    }

    return (
      <FieldSet legend={translate('episodeNaming')}>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && error &&
            <div>{translate('unableToLoadNamingSettings')}</div>
        }

        {
          hasSettings && !isFetching && !error &&
            <Form>
              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>{translate('renameEpisodes')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="renameEpisodes"
                  helpText={translate('renameEpisodesHelpText')}
                  onChange={onInputChange}
                  {...settings.renameEpisodes}
                />
              </FormGroup>

              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>{translate('replaceIllegalCharacters')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="replaceIllegalCharacters"
                  helpText={translate('replaceIllegalCharactersHelpText')}
                  onChange={onInputChange}
                  {...settings.replaceIllegalCharacters}
                />
              </FormGroup>

              {
                renameEpisodes &&
                  <div>
                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>{translate('standardEpisodeFormat')}</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="standardEpisodeFormat"
                        buttons={<FormInputButton onPress={this.onStandardNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.standardEpisodeFormat}
                        helpTexts={standardEpisodeFormatHelpTexts}
                        errors={[...standardEpisodeFormatErrors, ...settings.standardEpisodeFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>{translate('dailyEpisodeFormat')}</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="dailyEpisodeFormat"
                        buttons={<FormInputButton onPress={this.onDailyNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.dailyEpisodeFormat}
                        helpTexts={dailyEpisodeFormatHelpTexts}
                        errors={[...dailyEpisodeFormatErrors, ...settings.dailyEpisodeFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>{translate('animeEpisodeFormat')}</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="animeEpisodeFormat"
                        buttons={<FormInputButton onPress={this.onAnimeNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.animeEpisodeFormat}
                        helpTexts={animeEpisodeFormatHelpTexts}
                        errors={[...animeEpisodeFormatErrors, ...settings.animeEpisodeFormat.errors]}
                      />
                    </FormGroup>
                  </div>
              }

              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>{translate('seriesFolderFormat')}</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="seriesFolderFormat"
                  buttons={<FormInputButton onPress={this.onSeriesFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.seriesFolderFormat}
                  helpTexts={[translate('seriesFolderFormatHelpText'), ...seriesFolderFormatHelpTexts]}
                  errors={[...seriesFolderFormatErrors, ...settings.seriesFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('seasonFolderFormat')}</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="seasonFolderFormat"
                  buttons={<FormInputButton onPress={this.onSeasonFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.seasonFolderFormat}
                  helpTexts={seasonFolderFormatHelpTexts}
                  errors={[...seasonFolderFormatErrors, ...settings.seasonFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>{translate('specialsFolderFormat')}</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="specialsFolderFormat"
                  buttons={<FormInputButton onPress={this.onSpecialsFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.specialsFolderFormat}
                  helpTexts={specialsFolderFormatHelpTexts}
                  errors={[...specialsFolderFormatErrors, ...settings.specialsFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{translate('multiEpisodeStyle')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="multiEpisodeStyle"
                  values={multiEpisodeStyleOptions}
                  onChange={onInputChange}
                  {...settings.multiEpisodeStyle}
                />
              </FormGroup>

              {
                namingModalOptions &&
                  <NamingModal
                    isOpen={isNamingModalOpen}
                    advancedSettings={advancedSettings}
                    {...namingModalOptions}
                    value={settings[namingModalOptions.name].value}
                    onInputChange={onInputChange}
                    onModalClose={this.onNamingModalClose}
                  />
              }
            </Form>
        }
      </FieldSet>
    );
  }

}

Naming.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  examples: PropTypes.object.isRequired,
  examplesPopulated: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Naming;
