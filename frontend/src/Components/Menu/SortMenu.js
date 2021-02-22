import PropTypes from 'prop-types';
import React from 'react';
import { icons } from 'Helpers/Props';
import Menu from 'Components/Menu/Menu';
import ToolbarMenuButton from 'Components/Menu/ToolbarMenuButton';
import translate from 'Utilities/String/translate';

function SortMenu(props) {
  const {
    className,
    children,
    isDisabled,
    ...otherProps
  } = props;

  return (
    <Menu
      className={className}
      {...otherProps}
    >
      <ToolbarMenuButton
        iconName={icons.SORT}
        text={translate('sort')}
        isDisabled={isDisabled}
      />
      {children}
    </Menu>
  );
}

SortMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

SortMenu.defaultProps = {
  isDisabled: false
};

export default SortMenu;
