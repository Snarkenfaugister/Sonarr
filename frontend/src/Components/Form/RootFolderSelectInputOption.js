import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import formatBytes from 'Utilities/Number/formatBytes';
import EnhancedSelectInputOption from './EnhancedSelectInputOption';
import styles from './RootFolderSelectInputOption.css';
import translate from 'Utilities/String/translate';

function RootFolderSelectInputOption(props) {
  const {
    id,
    value,
    freeSpace,
    isMissing,
    seriesFolder,
    isMobile,
    isWindows,
    ...otherProps
  } = props;

  const slashCharacter = isWindows ? '\\' : '/';

  return (
    <EnhancedSelectInputOption
      id={id}
      isMobile={isMobile}
      {...otherProps}
    >
      <div className={classNames(
        styles.optionText,
        isMobile && styles.isMobile
      )}
      >
        <div className={styles.value}>
          {value}

          {
            seriesFolder && id !== 'addNew' ?
              <div className={styles.seriesFolder}>
                {slashCharacter}
                {seriesFolder}
              </div> :
              null
          }
        </div>

        {
          freeSpace == null ?
            null :
            <div className={styles.freeSpace}>
              {translate('bytesFreeInterp', [formatBytes(freeSpace)])}
            </div>
        }

        {
          isMissing ?
            <div className={styles.isMissing}>
              {translate('missing')}
            </div> :
            null
        }
      </div>
    </EnhancedSelectInputOption>
  );
}

RootFolderSelectInputOption.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  freeSpace: PropTypes.number,
  isMissing: PropTypes.boolean,
  seriesFolder: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  isWindows: PropTypes.bool
};

export default RootFolderSelectInputOption;
