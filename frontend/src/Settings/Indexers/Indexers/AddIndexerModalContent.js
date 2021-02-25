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
import AddIndexerItem from './AddIndexerItem';
import styles from './AddIndexerModalContent.css';
import translate from 'Utilities/String/translate';

class AddIndexerModalContent extends Component {

  //
  // Render

  render() {
    const {
      isSchemaFetching,
      isSchemaPopulated,
      schemaError,
      usenetIndexers,
      torrentIndexers,
      onIndexerSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('addIndexer')}
        </ModalHeader>

        <ModalBody>
          {
            isSchemaFetching &&
              <LoadingIndicator />
          }

          {
            !isSchemaFetching && !!schemaError &&
              <div>{translate('unableToAddANewIndexerPleaseTryAgain')}</div>
          }

          {
            isSchemaPopulated && !schemaError &&
              <div>

                <Alert kind={kinds.INFO}>
                  <div>{translate('sonarrSupportsAnyIndexer')}</div>
                  <div>{translate('forMoreInformationOnTheIndividualIndexers')}</div>
                </Alert>

                <FieldSet legend={translate('usenet')}>
                  <div className={styles.indexers}>
                    {
                      usenetIndexers.map((indexer) => {
                        return (
                          <AddIndexerItem
                            key={indexer.implementation}
                            implementation={indexer.implementation}
                            {...indexer}
                            onIndexerSelect={onIndexerSelect}
                          />
                        );
                      })
                    }
                  </div>
                </FieldSet>

                <FieldSet legend={translate('torrents')}>
                  <div className={styles.indexers}>
                    {
                      torrentIndexers.map((indexer) => {
                        return (
                          <AddIndexerItem
                            key={indexer.implementation}
                            implementation={indexer.implementation}
                            {...indexer}
                            onIndexerSelect={onIndexerSelect}
                          />
                        );
                      })
                    }
                  </div>
                </FieldSet>
              </div>
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

AddIndexerModalContent.propTypes = {
  isSchemaFetching: PropTypes.bool.isRequired,
  isSchemaPopulated: PropTypes.bool.isRequired,
  schemaError: PropTypes.object,
  usenetIndexers: PropTypes.arrayOf(PropTypes.object).isRequired,
  torrentIndexers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIndexerSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AddIndexerModalContent;
