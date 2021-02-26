import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import LanguageProfileItemDragSource from './LanguageProfileItemDragSource';
import LanguageProfileItemDragPreview from './LanguageProfileItemDragPreview';
import styles from './LanguageProfileItems.css';
import translate from 'Utilities/String/translate';

class LanguageProfileItems extends Component {

  //
  // Render

  render() {
    const {
      dragIndex,
      dropIndex,
      languageProfileItems,
      errors,
      warnings,
      ...otherProps
    } = this.props;

    const isDragging = dropIndex !== null;
    const isDraggingUp = isDragging && dropIndex > dragIndex;
    const isDraggingDown = isDragging && dropIndex < dragIndex;

    return (
      <FormGroup>
        <FormLabel>{translate('languages')}</FormLabel>
        <div>
          <FormInputHelpText
            text={translate('languagesHelpText')}
          />

          {
            errors.map((error, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={error.message}
                  isError={true}
                  isCheckInput={false}
                />
              );
            })
          }

          {
            warnings.map((warning, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={warning.message}
                  isWarning={true}
                  isCheckInput={false}
                />
              );
            })
          }

          <div className={styles.languages}>
            {
              languageProfileItems.map(({ allowed, language }, index) => {
                return (
                  <LanguageProfileItemDragSource
                    key={language.id}
                    languageId={language.id}
                    name={language.name}
                    allowed={allowed}
                    sortIndex={index}
                    isDragging={isDragging}
                    isDraggingUp={isDraggingUp}
                    isDraggingDown={isDraggingDown}
                    {...otherProps}
                  />
                );
              }).reverse()
            }

            <LanguageProfileItemDragPreview />
          </div>
        </div>
      </FormGroup>
    );
  }
}

LanguageProfileItems.propTypes = {
  dragIndex: PropTypes.number,
  dropIndex: PropTypes.number,
  languageProfileItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  warnings: PropTypes.arrayOf(PropTypes.object)
};

LanguageProfileItems.defaultProps = {
  errors: [],
  warnings: []
};

export default LanguageProfileItems;
