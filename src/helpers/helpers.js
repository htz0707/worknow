export const spliceSplit = (str, index, count, add) => {
  var ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
};
export function formatCurrency(value, currency = 'VND') {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  });
  if (!isNaN(parseFloat(value))) {
    return formatter.format(value);
  }
  return value;
}
export const renderAddress = (data) => {
  let address_str =
    data.address +
    ', ' +
    data.ward?.name +
    ', ' +
    data.district?.name +
    ', ' +
    data.city?.name +
    ', ' +
    data.country?.name;
  return address_str;
};
export const renderWorkingHour = (open_time, close_time) => {
  return open_time?.slice(0, 5) + ' - ' + close_time?.slice(0, 5);
};
export const renderHourOrDay = (value) => {
  if (
    value === 'flexible_desk' ||
    value === 'fixed_desk' ||
    value === 'private_room'
  ) {
    return 'Ngày';
  } else if (
    value === 'meeting_room' ||
    value === 'event' ||
    value === 'convience_room' ||
    value === 'booth'
  ) {
    return 'h';
  } else {
    return 'h';
  }
};
