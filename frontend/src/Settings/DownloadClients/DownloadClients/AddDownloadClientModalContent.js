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
import AddDownloadClientItem from './AddDownloadClientItem';
import styles from './AddDownloadClientModalContent.css';
import translate from 'Utilities/String/translate';

class AddDownloadClientModalContent extends Component {

  //
  // Render

  render() {
    const {
      isSchemaFetching,
      isSchemaPopulated,
      schemaError,
      usenetDownloadClients,
      torrentDownloadClients,
      onDownloadClientSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('addDownloadClient')}
        </ModalHeader>

        <ModalBody>
          {
            isSchemaFetching &&
              <LoadingIndicator />
          }

          {
            !isSchemaFetching && !!schemaError &&
              <div>{translate('unableToAddANewDownloadClientPleaseTryAgain')}</div>
          }

          {
            isSchemaPopulated && !schemaError &&
              <div>

                <Alert kind={kinds.INFO}>
                  <div>{translate('sonarrSupportsAnyDownloadClient')}</div>
                  <div>{translate('forMoreInformationOnTheIndividualDownloadClients')}</div>
                </Alert>

                <FieldSet legend={translate('usenet')}>
                  <div className={styles.downloadClients}>
                    {
                      usenetDownloadClients.map((downloadClient) => {
                        return (
                          <AddDownloadClientItem
                            key={downloadClient.implementation}
                            implementation={downloadClient.implementation}
                            {...downloadClient}
                            onDownloadClientSelect={onDownloadClientSelect}
                          />
                        );
                      })
                    }
                  </div>
                </FieldSet>

                <FieldSet legend={translate('torrents')}>
                  <div className={styles.downloadClients}>
                    {
                      torrentDownloadClients.map((downloadClient) => {
                        return (
                          <AddDownloadClientItem
                            key={downloadClient.implementation}
                            implementation={downloadClient.implementation}
                            {...downloadClient}
                            onDownloadClientSelect={onDownloadClientSelect}
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

AddDownloadClientModalContent.propTypes = {
  isSchemaFetching: PropTypes.bool.isRequired,
  isSchemaPopulated: PropTypes.bool.isRequired,
  schemaError: PropTypes.object,
  usenetDownloadClients: PropTypes.arrayOf(PropTypes.object).isRequired,
  torrentDownloadClients: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDownloadClientSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AddDownloadClientModalContent;
