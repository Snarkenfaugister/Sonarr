import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FileBrowserModal from 'Components/FileBrowser/FileBrowserModal';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import RootFolders from 'RootFolder/RootFolders';
import styles from './ImportSeriesSelectFolder.css';
import translate from 'Utilities/String/translate';

class ImportSeriesSelectFolder extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddNewRootFolderModalOpen: false
    };
  }

  //
  // Lifecycle

  onAddNewRootFolderPress = () => {
    this.setState({ isAddNewRootFolderModalOpen: true });
  }

  onNewRootFolderSelect = ({ value }) => {
    this.props.onNewRootFolderSelect(value);
  }

  onAddRootFolderModalClose = () => {
    this.setState({ isAddNewRootFolderModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      isWindows,
      isFetching,
      isPopulated,
      error,
      items
    } = this.props;

    return (
      <PageContent title={translate('importSeries')}>
        <PageContentBody>
          {
            isFetching && !isPopulated &&
              <LoadingIndicator />
          }

          {
            !isFetching && !!error &&
              <div>{translate('unableToLoadRootFolders')}</div>
          }

          {
            !error && isPopulated &&
              <div>
                <div className={styles.header}>
                  {translate('importSeriesAlreadyHave')}
                </div>

                <div className={styles.tips}>
                  {translate('importTipsMessage')}
                  <ul>
                    <li className={styles.tip} dangerouslySetInnerHTML={{ __html: translate('importIncludeQuality', ['<code>episode.s02e15.bluray.mkv</code>']) }} />
                    <li className={styles.tip} dangerouslySetInnerHTML={{ __html: translate('importRootPath', [`<code>${isWindows ? 'C:\\tv shows' : '/tv shows'}</code>`, `<code>${isWindows ? 'C:\\tv shows\\the simpsons' : '/tv shows/the simpsons'}</code>`]) }} />
                    <li className={styles.tip}>{translate('importNotForDownloads')}</li>
                  </ul>
                </div>

                {
                  items.length > 0 ?
                    <div className={styles.recentFolders}>
                      <FieldSet legend={translate('rootFolders')}>
                        <RootFolders
                          isFetching={isFetching}
                          isPopulated={isPopulated}
                          error={error}
                          items={items}
                        />
                      </FieldSet>

                      <Button
                        kind={kinds.PRIMARY}
                        size={sizes.LARGE}
                        onPress={this.onAddNewRootFolderPress}
                      >
                        <Icon
                          className={styles.importButtonIcon}
                          name={icons.DRIVE}
                        />
                        {translate('chooseAnotherFolder')}
                      </Button>
                    </div> :

                    <div className={styles.startImport}>
                      <Button
                        kind={kinds.PRIMARY}
                        size={sizes.LARGE}
                        onPress={this.onAddNewRootFolderPress}
                      >
                        <Icon
                          className={styles.importButtonIcon}
                          name={icons.DRIVE}
                        />
                        {translate('startImport')}
                      </Button>
                    </div>
                }

                <FileBrowserModal
                  isOpen={this.state.isAddNewRootFolderModalOpen}
                  name="rootFolderPath"
                  value=""
                  onChange={this.onNewRootFolderSelect}
                  onModalClose={this.onAddRootFolderModalClose}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

ImportSeriesSelectFolder.propTypes = {
  isWindows: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNewRootFolderSelect: PropTypes.func.isRequired
};

export default ImportSeriesSelectFolder;
