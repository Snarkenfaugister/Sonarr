import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import IconButton from 'Components/Link/IconButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import Popover from 'Components/Tooltip/Popover';
import EpisodeLanguage from 'Episode/EpisodeLanguage';
import EpisodeQuality from 'Episode/EpisodeQuality';
import HistoryDetailsConnector from 'Activity/History/Details/HistoryDetailsConnector';
import HistoryEventTypeCell from 'Activity/History/HistoryEventTypeCell';
import styles from './EpisodeHistoryRow.css';
import translate from 'Utilities/String/translate';

function getTitle(eventType) {
  switch (eventType) {
    case 'grabbed': return translate('grabbed');
    case 'seriesFolderImported': return translate('seriesFolderImported');
    case 'downloadFolderImported': return translate('downloadFolderImported');
    case 'downloadFailed': return translate('downloadFailed');
    case 'episodeFileDeleted': return translate('episodeFileDeleted');
    case 'episodeFileRenamed': return translate('episodeFileRenamed');
    default: return translate('unknown');
  }
}

class EpisodeHistoryRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isMarkAsFailedModalOpen: false
    };
  }

  //
  // Listeners

  onMarkAsFailedPress = () => {
    this.setState({ isMarkAsFailedModalOpen: true });
  }

  onConfirmMarkAsFailed = () => {
    this.props.onMarkAsFailedPress(this.props.id);
    this.setState({ isMarkAsFailedModalOpen: false });
  }

  onMarkAsFailedModalClose = () => {
    this.setState({ isMarkAsFailedModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      eventType,
      sourceTitle,
      language,
      languageCutoffNotMet,
      quality,
      qualityCutoffNotMet,
      date,
      data
    } = this.props;

    const {
      isMarkAsFailedModalOpen
    } = this.state;

    return (
      <TableRow>
        <HistoryEventTypeCell
          eventType={eventType}
          data={data}
        />

        <TableRowCell>
          {sourceTitle}
        </TableRowCell>

        <TableRowCell>
          <EpisodeLanguage
            language={language}
            isCutoffNotMet={languageCutoffNotMet}
          />
        </TableRowCell>

        <TableRowCell>
          <EpisodeQuality
            quality={quality}
            isCutoffNotMet={qualityCutoffNotMet}
          />
        </TableRowCell>

        <RelativeDateCellConnector
          date={date}
        />

        <TableRowCell className={styles.details}>
          <Popover
            anchor={
              <Icon
                name={icons.INFO}
              />
            }
            title={getTitle(eventType)}
            body={
              <HistoryDetailsConnector
                eventType={eventType}
                sourceTitle={sourceTitle}
                data={data}
              />
            }
            position={tooltipPositions.LEFT}
          />
        </TableRowCell>

        <TableRowCell className={styles.actions}>
          {
            eventType === 'grabbed' &&
              <IconButton
                title={translate('markAsFailed')}
                name={icons.REMOVE}
                onPress={this.onMarkAsFailedPress}
              />
          }
        </TableRowCell>

        <ConfirmModal
          isOpen={isMarkAsFailedModalOpen}
          kind={kinds.DANGER}
          title={translate('markAsFailed')}
          message={translate('markAsFailedMessageText', [sourceTitle])}
          confirmLabel={translate('markAsFailed')}
          onConfirm={this.onConfirmMarkAsFailed}
          onCancel={this.onMarkAsFailedModalClose}
        />
      </TableRow>
    );
  }
}

EpisodeHistoryRow.propTypes = {
  id: PropTypes.number.isRequired,
  eventType: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
  languageCutoffNotMet: PropTypes.bool.isRequired,
  quality: PropTypes.object.isRequired,
  qualityCutoffNotMet: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired
};

export default EpisodeHistoryRow;
