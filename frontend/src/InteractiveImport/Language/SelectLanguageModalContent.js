import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import translate from 'Utilities/String/translate';

function SelectLanguageModalContent(props) {
  const {
    languageId,
    isFetching,
    isPopulated,
    error,
    items,
    onModalClose,
    onLanguageSelect
  } = props;

  const languageOptions = items.map(({ language }) => {
    return {
      key: language.id,
      value: language.name
    };
  });

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {translate('manualImport')} - {translate('selectLanguage')}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>{translate('unableToLoadLanguages')}</div>
        }

        {
          isPopulated && !error &&
            <Form>
              <FormGroup>
                <FormLabel>{translate('language')}</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="language"
                  value={languageId}
                  values={languageOptions}
                  onChange={onLanguageSelect}
                />
              </FormGroup>
            </Form>
        }
      </ModalBody>

      <ModalFooter>
        <Button onPress={onModalClose}>
          {translate('cancel')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

SelectLanguageModalContent.propTypes = {
  languageId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLanguageSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectLanguageModalContent;
