import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './DeleteSeriesModalContent.css';
import translate from 'Utilities/String/translate';

class DeleteSeriesModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteFiles: false,
      addImportListExclusion: false
    };
  }

  //
  // Listeners

  onDeleteFilesChange = ({ value }) => {
    this.setState({ deleteFiles: value });
  }

  onAddImportListExclusionChange = ({ value }) => {
    this.setState({ addImportListExclusion: value });
  }

  onDeleteSeriesConfirmed = () => {
    const {
      addImportListExclusion,
      deleteFiles
    } = this.state;

    this.setState({ deleteFiles: false, addImportListExclusion: false });
    this.props.onDeleteSelectedPress(deleteFiles, addImportListExclusion);
  }

  //
  // Render

  render() {
    const {
      series,
      onModalClose
    } = this.props;

    const {
      addImportListExclusion,
      deleteFiles
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('deleteSelectedSeries')}
        </ModalHeader>

        <ModalBody>
          <div>
            <FormGroup>
              <FormLabel>{translate('addListExclusion')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="addImportListExclusion"
                value={addImportListExclusion}
                helpText={translate('addImportExclusionHelpText')}
                onChange={this.onAddImportListExclusionChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate(series.length > 1 ? 'deleteSeriesFoldersLabel' : 'deleteSeriesFolderLabel')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="deleteFiles"
                value={deleteFiles}
                helpText={translate(series.length > 1 ? 'deleteSeriesFoldersHelpText' : 'deleteSeriesFolderHelpText')}
                kind={kinds.DANGER}
                onChange={this.onDeleteFilesChange}
              />
            </FormGroup>
          </div>

          <div className={styles.message}>
            {translate(deleteFiles ? 'areYouSureYouWantToDeleteSeriesInterp' : 'areYouSureYouWantToDeleteSeriesAndContentsInterp', [series.length])}
          </div>

          <ul>
            {
              series.map((s) => {
                return (
                  <li key={s.title}>
                    <span>{s.title}</span>

                    {
                      deleteFiles &&
                        <span className={styles.pathContainer}>
                          -
                          <span className={styles.path}>
                            {s.path}
                          </span>
                        </span>
                    }
                  </li>
                );
              })
            }
          </ul>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('cancel')}
          </Button>

          <Button
            kind={kinds.DANGER}
            onPress={this.onDeleteSeriesConfirmed}
          >
            {translate('delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

DeleteSeriesModalContent.propTypes = {
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteSelectedPress: PropTypes.func.isRequired
};

export default DeleteSeriesModalContent;
