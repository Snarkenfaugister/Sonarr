import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import formatTime from 'Utilities/Date/formatTime';
import padNumber from 'Utilities/Number/padNumber';
import { icons, kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Link from 'Components/Link/Link';
import getStatusStyle from 'Calendar/getStatusStyle';
import CalendarEventConnector from 'Calendar/Events/CalendarEventConnector';
import styles from './CalendarEventGroup.css';
import translate from 'Utilities/String/translate';

function getEventsInfo(events) {
  let files = 0;
  let queued = 0;
  let monitored = 0;
  let absoluteEpisodeNumbers = 0;

  events.forEach((event) => {
    if (event.episodeFileId) {
      files++;
    }

    if (event.queued) {
      queued++;
    }

    if (event.monitored) {
      monitored++;
    }

    if (event.absoluteEpisodeNumber) {
      absoluteEpisodeNumbers++;
    }
  });

  return {
    allDownloaded: files === events.length,
    anyQueued: queued > 0,
    anyMonitored: monitored > 0,
    allAbsoluteEpisodeNumbers: absoluteEpisodeNumbers === events.length
  };
}

class CalendarEventGroup extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isExpanded: false
    };
  }

  //
  // Listeners

  onExpandPress = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  //
  // Render

  render() {
    const {
      series,
      events,
      isDownloading,
      showEpisodeInformation,
      showFinaleIcon,
      timeFormat,
      colorImpairedMode,
      onEventModalOpenToggle
    } = this.props;

    const { isExpanded } = this.state;
    const {
      allDownloaded,
      anyQueued,
      anyMonitored,
      allAbsoluteEpisodeNumbers
    } = getEventsInfo(events);
    const anyDownloading = isDownloading || anyQueued;
    const firstEpisode = events[0];
    const lastEpisode = events[events.length -1];
    const airDateUtc = firstEpisode.airDateUtc;
    const startTime = moment(airDateUtc);
    const endTime = moment(lastEpisode.airDateUtc).add(series.runtime, 'minutes');
    const seasonNumber = firstEpisode.seasonNumber;
    const statusStyle = getStatusStyle(allDownloaded, anyDownloading, startTime, endTime, anyMonitored);
    const isMissingAbsoluteNumber = series.seriesType === 'anime' && seasonNumber > 0 && !allAbsoluteEpisodeNumbers;

    if (isExpanded) {
      return (
        <div>
          {
            events.map((event) => {
              if (event.isGroup) {
                return null;
              }

              return (
                <CalendarEventConnector
                  key={event.id}
                  episodeId={event.id}
                  {...event}
                  onEventModalOpenToggle={onEventModalOpenToggle}
                />
              );
            })
          }

          <Link
            className={styles.collapseContainer}
            component="div"
            onPress={this.onExpandPress}
          >
            <Icon
              name={icons.COLLAPSE}
            />
          </Link>
        </div>
      );
    }

    return (
      <div
        className={classNames(
          styles.eventGroup,
          styles[statusStyle],
          colorImpairedMode && 'colorImpaired'
        )}
      >
        <div className={styles.info}>
          <div className={styles.seriesTitle}>
            {series.title}
          </div>

          {
            isMissingAbsoluteNumber &&
              <Icon
                className={styles.statusIcon}
                name={icons.WARNING}
                title={translate('episodeNoAbsoluteOrder')}
              />
          }

          {
            anyDownloading &&
              <Icon
                className={styles.statusIcon}
                name={icons.DOWNLOADING}
                title={translate('anEpisodeIsDownloading')}
              />
          }

          {
            firstEpisode.episodeNumber === 1 && seasonNumber > 0 &&
              <Icon
                className={styles.statusIcon}
                name={icons.INFO}
                kind={kinds.INFO}
                title={seasonNumber === 1 ? translate('seriesPremiere') : translate('seasonPremiere')}
              />
          }

          {
            showFinaleIcon &&
            lastEpisode.episodeNumber !== 1 &&
            seasonNumber > 0 &&
            lastEpisode.episodeNumber === series.seasons.find((season) => season.seasonNumber === seasonNumber).statistics.totalEpisodeCount &&
              <Icon
                className={styles.statusIcon}
                name={icons.INFO}
                kind={kinds.WARNING}
                title={series.status === 'ended' ? translate('seriesFinale') : translate('seasonFinale')}
              />
          }
        </div>

        <div className={styles.airingInfo}>
          <div className={styles.airTime}>
            {formatTime(airDateUtc, timeFormat)} - {formatTime(endTime.toISOString(), timeFormat, { includeMinuteZero: true })}
          </div>

          {
            showEpisodeInformation ?
              <div className={styles.episodeInfo}>
                {seasonNumber}x{padNumber(firstEpisode.episodeNumber, 2)}-{padNumber(lastEpisode.episodeNumber, 2)}

                {
                  series.seriesType === 'anime' &&
                  firstEpisode.absoluteEpisodeNumber &&
                  lastEpisode.absoluteEpisodeNumber &&
                    <span className={styles.absoluteEpisodeNumber}>
                      ({firstEpisode.absoluteEpisodeNumber}-{lastEpisode.absoluteEpisodeNumber})
                    </span>
                }
              </div> :
              <Link
                className={styles.expandContainerInline}
                component="div"
                onPress={this.onExpandPress}
              >
                <Icon
                  name={icons.EXPAND}
                />
              </Link>
          }
        </div>

        {
          showEpisodeInformation &&
            <Link
              className={styles.expandContainer}
              component="div"
              onPress={this.onExpandPress}
            >
              <Icon
                name={icons.EXPAND}
              />
            </Link>
        }
      </div>
    );
  }
}

CalendarEventGroup.propTypes = {
  series: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDownloading: PropTypes.bool.isRequired,
  showEpisodeInformation: PropTypes.bool.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired,
  onEventModalOpenToggle: PropTypes.func.isRequired
};

export default CalendarEventGroup;
