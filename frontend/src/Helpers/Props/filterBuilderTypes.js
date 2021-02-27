import translate from 'Utilities/String/translate';
import * as filterTypes from './filterTypes';

export const ARRAY = 'array';
export const DATE = 'date';
export const EXACT = 'exact';
export const NUMBER = 'number';
export const STRING = 'string';

export const all = [
  ARRAY,
  DATE,
  EXACT,
  NUMBER,
  STRING
];

export const possibleFilterTypes = {
  [ARRAY]: [
    { key: filterTypes.CONTAINS, value: translate('filterContains') },
    { key: filterTypes.NOT_CONTAINS, value: translate('filterDoesNotContain') }
  ],

  [DATE]: [
    { key: filterTypes.LESS_THAN, value: translate('filterIsBefore') },
    { key: filterTypes.GREATER_THAN, value: translate('filterIsAfter') },
    { key: filterTypes.IN_LAST, value: translate('filterInTheLast') },
    { key: filterTypes.NOT_IN_LAST, value: translate('filterNotInTheLast') },
    { key: filterTypes.IN_NEXT, value: translate('filterInTheNext') },
    { key: filterTypes.NOT_IN_NEXT, value: translate('filterNotInTheNext') }
  ],

  [EXACT]: [
    { key: filterTypes.EQUAL, value: translate('filterIs') },
    { key: filterTypes.NOT_EQUAL, value: translate('filterIsNot') }
  ],

  [NUMBER]: [
    { key: filterTypes.EQUAL, value: translate('filterEqual') },
    { key: filterTypes.GREATER_THAN, value: translate('filterGreaterThan') },
    { key: filterTypes.GREATER_THAN_OR_EQUAL, value: translate('filterGreaterThanOrEqual') },
    { key: filterTypes.LESS_THAN, value: translate('filterLessThan') },
    { key: filterTypes.LESS_THAN_OR_EQUAL, value: translate('filterLessThanOrEqual') },
    { key: filterTypes.NOT_EQUAL, value: translate('filterNotEqual') }
  ],

  [STRING]: [
    { key: filterTypes.CONTAINS, value: translate('filterContains') },
    { key: filterTypes.NOT_CONTAINS, value: translate('filterDoesNotContain') },
    { key: filterTypes.EQUAL, value: translate('filterEqual') },
    { key: filterTypes.NOT_EQUAL, value: translate('filterNotEqual') }
  ]
};
