import PropTypes from 'prop-types';
import React from 'react';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import CustomFilter from './CustomFilter';
import styles from './CustomFiltersModalContent.css';
import translate from 'Utilities/String/translate';

function CustomFiltersModalContent(props) {
  const {
    selectedFilterKey,
    customFilters,
    isDeleting,
    deleteError,
    dispatchDeleteCustomFilter,
    dispatchSetFilter,
    onAddCustomFilter,
    onEditCustomFilter,
    onModalClose
  } = props;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {translate('customFilters')}
      </ModalHeader>

      <ModalBody>
        {
          customFilters.map((customFilter) => {
            return (
              <CustomFilter
                key={customFilter.id}
                id={customFilter.id}
                label={customFilter.label}
                filters={customFilter.filters}
                selectedFilterKey={selectedFilterKey}
                isDeleting={isDeleting}
                deleteError={deleteError}
                dispatchSetFilter={dispatchSetFilter}
                dispatchDeleteCustomFilter={dispatchDeleteCustomFilter}
                onEditPress={onEditCustomFilter}
              />
            );
          })
        }

        <div className={styles.addButtonContainer}>
          <Button onPress={onAddCustomFilter}>
            {translate('addCustomFilter')}
          </Button>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          onPress={onModalClose}
        >
          {translate('close')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

CustomFiltersModalContent.propTypes = {
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deleteError: PropTypes.object,
  dispatchDeleteCustomFilter: PropTypes.func.isRequired,
  dispatchSetFilter: PropTypes.func.isRequired,
  onAddCustomFilter: PropTypes.func.isRequired,
  onEditCustomFilter: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default CustomFiltersModalContent;
