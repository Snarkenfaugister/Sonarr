import PropTypes from 'prop-types';
import React from 'react';
import { align } from 'Helpers/Props';
import ViewMenu from 'Components/Menu/ViewMenu';
import MenuContent from 'Components/Menu/MenuContent';
import ViewMenuItem from 'Components/Menu/ViewMenuItem';
import translate from 'Utilities/String/translate';

function SeriesIndexViewMenu(props) {
  const {
    view,
    isDisabled,
    onViewSelect
  } = props;

  return (
    <ViewMenu
      isDisabled={isDisabled}
      alignMenu={align.RIGHT}
    >
      <MenuContent>
        <ViewMenuItem
          name="table"
          selectedView={view}
          onPress={onViewSelect}
        >
          {translate('table')}
        </ViewMenuItem>

        <ViewMenuItem
          name="posters"
          selectedView={view}
          onPress={onViewSelect}
        >
          {translate('posters')}
        </ViewMenuItem>

        <ViewMenuItem
          name="overview"
          selectedView={view}
          onPress={onViewSelect}
        >
          {translate('overview')}
        </ViewMenuItem>
      </MenuContent>
    </ViewMenu>
  );
}

SeriesIndexViewMenu.propTypes = {
  view: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onViewSelect: PropTypes.func.isRequired
};

export default SeriesIndexViewMenu;
