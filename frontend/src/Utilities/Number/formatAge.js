import translate from 'Utilities/String/translate';

function formatAge(age, ageHours, ageMinutes) {
  age = Math.round(age);
  ageHours = parseFloat(ageHours);
  ageMinutes = ageMinutes && parseFloat(ageMinutes);

  if (age < 2 && ageHours) {
    if (ageHours < 2 && !!ageMinutes) {
      return `${ageMinutes.toFixed(0)} ${ageHours === 1 ? translate('minute') : translate('minutes')}`;
    }

    return `${ageHours.toFixed(1)} ${ageHours === 1 ? translate('hour') : translate('hours')}`;
  }

  return `${age} ${age === 1 ? translate('day') : translate('days')}`;
}

export default formatAge;
