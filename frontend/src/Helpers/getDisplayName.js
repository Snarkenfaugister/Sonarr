import translate from 'Utilities/String/translate';

export default function getDisplayName(Component) {
  return Component.displayName || Component.name || translate('component');
}
