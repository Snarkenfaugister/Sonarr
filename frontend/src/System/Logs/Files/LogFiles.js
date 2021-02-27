import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Link from 'Components/Link/Link';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Table from 'Components/Table/Table';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import TableBody from 'Components/Table/TableBody';
import LogsNavMenu from '../LogsNavMenu';
import LogFilesTableRow from './LogFilesTableRow';
import translate from 'Utilities/String/translate';

const columns = [
  {
    name: 'filename',
    label: translate('filename'),
    isVisible: true
  },
  {
    name: 'lastWriteTime',
    label: translate('lastWriteTime'),
    isVisible: true
  },
  {
    name: 'download',
    isVisible: true
  }
];

class LogFiles extends Component {

  //
  // Render

  render() {
    const {
      isFetching,
      items,
      deleteFilesExecuting,
      currentLogView,
      location,
      onRefreshPress,
      onDeleteFilesPress,
      ...otherProps
    } = this.props;

    return (
      <PageContent title={translate('logFiles')}>
        <PageToolbar>
          <PageToolbarSection>
            <LogsNavMenu current={translate(currentLogView)} />

            <PageToolbarSeparator />

            <PageToolbarButton
              label={translate('refresh')}
              iconName={icons.REFRESH}
              spinningName={icons.REFRESH}
              isSpinning={isFetching}
              onPress={onRefreshPress}
            />

            <PageToolbarButton
              label={translate('clear')}
              iconName={icons.CLEAR}
              isSpinning={deleteFilesExecuting}
              onPress={onDeleteFilesPress}
            />
          </PageToolbarSection>
        </PageToolbar>
        <PageContentBody>
          <Alert>
            <div>
              {translate('logFilesLocationInterp', [location])}
            </div>

            {
              currentLogView === 'logFiles' &&
                <div>
                  {translate('theLogLevelDefaultText')} <Link to="/settings/general">{translate('generalSettings')}</Link>
                </div>
            }
          </Alert>

          {
            isFetching &&
              <LoadingIndicator />
          }

          {
            !isFetching && !!items.length &&
              <div>
                <Table
                  columns={columns}
                  {...otherProps}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <LogFilesTableRow
                            key={item.id}
                            {...item}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </div>
          }

          {
            !isFetching && !items.length &&
              <div>{translate('noLogFiles')}</div>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

LogFiles.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  deleteFilesExecuting: PropTypes.bool.isRequired,
  currentLogView: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onDeleteFilesPress: PropTypes.func.isRequired
};

export default LogFiles;
