import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import formatBytes from 'Utilities/Number/formatBytes';
import { ColorImpairedConsumer } from 'App/ColorImpairedContext';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import styles from './SeriesIndexFooter.css';
import translate from 'Utilities/String/translate';

class SeriesIndexFooter extends PureComponent {

  //
  // Render

  render() {
    const { series } = this.props;
    const count = series.length;
    let episodes = 0;
    let episodeFiles = 0;
    let ended = 0;
    let continuing = 0;
    let monitored = 0;
    let totalFileSize = 0;

    series.forEach((s) => {
      const { statistics = {} } = s;

      const {
        episodeCount = 0,
        episodeFileCount = 0,
        sizeOnDisk = 0
      } = statistics;

      episodes += episodeCount;
      episodeFiles += episodeFileCount;

      if (s.status === 'ended') {
        ended++;
      } else {
        continuing++;
      }

      if (s.monitored) {
        monitored++;
      }

      totalFileSize += sizeOnDisk;
    });

    return (
      <ColorImpairedConsumer>
        {(enableColorImpairedMode) => {
          return (
            <div className={styles.footer}>
              <div>
                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.continuing,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>{translate('continuingAllEpisodesDownloaded')}</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.ended,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>{translate('endedAllEpisodesDownloaded')}</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.missingMonitored,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>{translate('missingEpisodesSeriesMonitored')}</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.missingUnmonitored,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>{translate('missingEpisodesSeriesNotMonitored')}</div>
                </div>
              </div>

              <div className={styles.statistics}>
                <DescriptionList>
                  <DescriptionListItem
                    title={translate('series')}
                    data={count}
                  />

                  <DescriptionListItem
                    title={translate('ended')}
                    data={ended}
                  />

                  <DescriptionListItem
                    title={translate('continuing')}
                    data={continuing}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title={translate('monitored')}
                    data={monitored}
                  />

                  <DescriptionListItem
                    title={translate('unmonitored')}
                    data={count - monitored}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title={translate('episodes')}
                    data={episodes}
                  />

                  <DescriptionListItem
                    title={translate('files')}
                    data={episodeFiles}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title={translate('totalFileSize')}
                    data={formatBytes(totalFileSize)}
                  />
                </DescriptionList>
              </div>
            </div>
          );
        }}
      </ColorImpairedConsumer>
    );
  }
}

SeriesIndexFooter.propTypes = {
  series: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SeriesIndexFooter;
