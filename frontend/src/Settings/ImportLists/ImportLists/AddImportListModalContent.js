import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Button from 'Components/Link/Button';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import AddImportListItem from './AddImportListItem';
import styles from './AddImportListModalContent.css';
import titleCase from 'Utilities/String/titleCase';
import translate from 'Utilities/String/translate';

class AddImportListModalContent extends Component {

  //
  // Render

  render() {
    const {
      isSchemaFetching,
      isSchemaPopulated,
      schemaError,
      listGroups,
      onImportListSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('addList')}
        </ModalHeader>

        <ModalBody>
          {
            isSchemaFetching ?
              <LoadingIndicator /> :
              null
          }

          {
            !isSchemaFetching && !!schemaError ?
              <div>{translate('unableToAddANewListPleaseTryAgain')}</div> :
              null
          }

          {
            isSchemaPopulated && !schemaError ?
              <div>

                <Alert kind={kinds.INFO}>
                  <div>{translate('sonarrSupportsMultipleLists')}</div>
                  <div>{translate('forMoreInformationOnTheIndividualListsClinkOnTheInfoButtons')}</div>
                </Alert>
                {
                  Object.keys(listGroups).map((key) => {
                    return (
                      <FieldSet legend={translate('listInterp', [titleCase(key)])} key={key}>
                        <div className={styles.lists}>
                          {
                            listGroups[key].map((list) => {
                              return (
                                <AddImportListItem
                                  key={list.implementation}
                                  implementation={list.implementation}
                                  {...list}
                                  onImportListSelect={onImportListSelect}
                                />
                              );
                            })
                          }
                        </div>
                      </FieldSet>
                    );
                  })
                }
              </div> :
              null
          }
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

AddImportListModalContent.propTypes = {
  isSchemaFetching: PropTypes.bool.isRequired,
  isSchemaPopulated: PropTypes.bool.isRequired,
  schemaError: PropTypes.object,
  listGroups: PropTypes.object.isRequired,
  onImportListSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AddImportListModalContent;
