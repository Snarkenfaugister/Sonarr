import PropTypes from 'prop-types';
import React from 'react';
import FieldSet from 'Components/FieldSet';
import PageSectionContent from 'Components/Page/PageSectionContent';
import TagConnector from './TagConnector';
import styles from './Tags.css';
import translate from 'Utilities/String/translate';

function Tags(props) {
  const {
    items,
    ...otherProps
  } = props;

  if (!items.length) {
    return (
      <div>{translate('noTagsHaveBeenAddedYet')}</div>
    );
  }

  return (
    <FieldSet
      legend={translate('tags')}
    >
      <PageSectionContent
        errorMessage={translate('unableToLoadTags')}
        {...otherProps}
      >
        <div className={styles.tags}>
          {
            items.map((item) => {
              return (
                <TagConnector
                  key={item.id}
                  {...item}
                />
              );
            })
          }
        </div>
      </PageSectionContent>
    </FieldSet>
  );
}

Tags.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Tags;
