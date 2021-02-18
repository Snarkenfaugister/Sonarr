import PropTypes from 'prop-types';
import React from 'react';
import formatAge from 'Utilities/Number/formatAge';
import formatDateTime from 'Utilities/Date/formatDateTime';
import formatPreferredWordScore from 'Utilities/Number/formatPreferredWordScore';
import Link from 'Components/Link/Link';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import DescriptionListItemTitle from 'Components/DescriptionList/DescriptionListItemTitle';
import DescriptionListItemDescription from 'Components/DescriptionList/DescriptionListItemDescription';
import styles from './HistoryDetails.css';
import translate from 'Utilities/String/translate';

function HistoryDetails(props) {
  const {
    eventType,
    sourceTitle,
    data,
    shortDateFormat,
    timeFormat
  } = props;

  if (eventType === 'grabbed') {
    const {
      indexer,
      releaseGroup,
      preferredWordScore,
      nzbInfoUrl,
      downloadClient,
      downloadId,
      age,
      ageHours,
      ageMinutes,
      publishedDate
    } = data;

    return (
      <DescriptionList>
        <DescriptionListItem
          descriptionClassName={styles.description}
          title={translate('name')}
          data={sourceTitle}
        />

        {
          !!indexer &&
            <DescriptionListItem
              title={translate('indexer')}
              data={indexer}
            />
        }

        {
          !!releaseGroup &&
            <DescriptionListItem
              descriptionClassName={styles.description}
              title={translate('releaseGroup')}
              data={releaseGroup}
            />
        }

        {
          !!preferredWordScore &&
            <DescriptionListItem
              title={translate('preferredWordScore')}
              data={formatPreferredWordScore(preferredWordScore)}
            />
        }

        {
          !!nzbInfoUrl &&
            <span>
              <DescriptionListItemTitle>
                Info URL
              </DescriptionListItemTitle>

              <DescriptionListItemDescription>
                <Link to={nzbInfoUrl}>{nzbInfoUrl}</Link>
              </DescriptionListItemDescription>
            </span>
        }

        {
          !!downloadClient &&
            <DescriptionListItem
              title={translate('downloadClient')}
              data={downloadClient}
            />
        }

        {
          !!downloadId &&
            <DescriptionListItem
              title={translate('grabID')}
              data={downloadId}
            />
        }

        {
          !!(age || ageHours || ageMinutes) &&
            <DescriptionListItem
              title={translate('ageWhenGrabbed')}
              data={formatAge(age, ageHours, ageMinutes)}
            />
        }

        {
          !!publishedDate &&
            <DescriptionListItem
              title={translate('publishedDate')}
              data={formatDateTime(publishedDate, shortDateFormat, timeFormat, { includeSeconds: true })}
            />
        }
      </DescriptionList>
    );
  }

  if (eventType === 'downloadFailed') {
    const {
      message
    } = data;

    return (
      <DescriptionList>
        <DescriptionListItem
          descriptionClassName={styles.description}
          title={translate('name')}
          data={sourceTitle}
        />

        {
          !!message &&
            <DescriptionListItem
              title={translate('message')}
              data={message}
            />
        }
      </DescriptionList>
    );
  }

  if (eventType === 'downloadFolderImported') {
    const {
      preferredWordScore,
      droppedPath,
      importedPath
    } = data;

    return (
      <DescriptionList>
        <DescriptionListItem
          descriptionClassName={styles.description}
          title={translate('name')}
          data={sourceTitle}
        />

        {
          !!droppedPath &&
            <DescriptionListItem
              descriptionClassName={styles.description}
              title={translate('source')}
              data={droppedPath}
            />
        }

        {
          !!importedPath &&
            <DescriptionListItem
              descriptionClassName={styles.description}
              title={translate('importedTo')}
              data={importedPath}
            />
        }

        {
          !!preferredWordScore &&
            <DescriptionListItem
              title={translate('preferredWordScore')}
              data={formatPreferredWordScore(preferredWordScore)}
            />
        }
      </DescriptionList>
    );
  }

  if (eventType === 'episodeFileDeleted') {
    const {
      reason,
      preferredWordScore
    } = data;

    let reasonMessage = '';

    switch (reason) {
      case 'Manual':
        reasonMessage = translate('fileWasDeletedByViaUI');
        break;
      case 'MissingFromDisk':
        reasonMessage = translate('missingFromDisk');
        break;
      case 'Upgrade':
        reasonMessage = translate('fileWasDeletedByUpgrade');
        break;
      default:
        reasonMessage = '';
    }

    return (
      <DescriptionList>
        <DescriptionListItem
          title={translate('name')}
          data={sourceTitle}
        />

        <DescriptionListItem
          title={translate('reason')}
          data={reasonMessage}
        />

        {
          !!preferredWordScore &&
            <DescriptionListItem
              title={translate('preferredWordScore')}
              data={formatPreferredWordScore(preferredWordScore)}
            />
        }
      </DescriptionList>
    );
  }

  if (eventType === 'episodeFileRenamed') {
    const {
      sourcePath,
      sourceRelativePath,
      path,
      relativePath
    } = data;

    return (
      <DescriptionList>
        <DescriptionListItem
          title={translate('sourcePath')}
          data={sourcePath}
        />

        <DescriptionListItem
          title={translate('sourceRelativePath')}
          data={sourceRelativePath}
        />

        <DescriptionListItem
          title={translate('destinationPath')}
          data={path}
        />

        <DescriptionListItem
          title={translate('destinationRelativePath')}
          data={relativePath}
        />
      </DescriptionList>
    );
  }

  if (eventType === 'downloadIgnored') {
    const {
      message
    } = data;

    return (
      <DescriptionList>
        <DescriptionListItem
          descriptionClassName={styles.description}
          title={translate('name')}
          data={sourceTitle}
        />

        {
          !!message &&
            <DescriptionListItem
              title={translate('message')}
              data={message}
            />
        }
      </DescriptionList>
    );
  }

  return (
    <DescriptionList>
      <DescriptionListItem
        descriptionClassName={styles.description}
        title={translate('name')}
        data={sourceTitle}
      />
    </DescriptionList>
  );
}

HistoryDetails.propTypes = {
  eventType: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default HistoryDetails;
