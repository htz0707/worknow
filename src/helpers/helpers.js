import moment from 'moment';
import { message } from 'antd';
import i18n from '../translation/i18n';
export const spliceSplit = (str, index, count, add) => {
  var ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
};
export function formatCurrency(value, currency = 'VND') {
  if (!isNaN(parseFloat(value))) {
    return value.toLocaleString('it-IT', {
      style: 'currency',
      currency: currency,
    });
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
    return 'H';
  } else {
    return 'H';
  }
};
export const returnTypeOfBooking = (value) => {
  if (
    value === 'flexible_desk' ||
    value === 'fixed_desk' ||
    value === 'private_room'
  ) {
    return 'day';
  }
  if (
    value === 'meeting_room' ||
    value === 'event' ||
    value === 'convience_room' ||
    value === 'booth'
  ) {
    return 'hour';
  }
  if (value === 'raw_space') return 'square';
  if (value === 'month') return 'month';
};
export const createTimeSlot = (start, end) => {
  var startTime = moment(start, 'HH:mm');
  var endTime = moment(end, 'HH:mm');

  if (endTime.isBefore(startTime)) {
    endTime.add(1, 'day');
  }

  var timeStops = [];

  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(30, 'minutes');
  }
  return timeStops;
};
export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours) {
    if (minutes) {
      return hours + ' giờ ' + minutes + ' phút';
    } else {
      return hours + ' giờ';
    }
  } else {
    return minutes + ' phút';
  }
};
export function handleMessage(kind, content) {
  if (kind === 'success') {
    message.success({
      content: content,
      className: 'success-mess',
    });
  } else {
    message.error({
      content: content,
      className: 'error-mess',
    });
  }
}
export const returnStatusBooking = (status) => {
  switch (status) {
    case 'booking':
      return i18n.t('created_booking');
    case 'confirming':
      return i18n.t('wait_for_confirm_payment');
    case 'confirmed':
      return i18n.t('confirmed_payment');
    case 'booking_successfull':
      return i18n.t('booking_successfull');
    case 'payment_fail':
      return i18n.t('payment_failed');
    case 'canceled':
      return i18n.t('booking_canceled');
    case 'booking_expired':
      return i18n.t('booking_expired');
    case 'extended':
      return i18n.t('booking_extended');
    case 'completed':
      return i18n.t('booking_completed');
    default:
      return null;
  }
};
export const returnDescriptionStatusBooking = (status) => {
  switch (status) {
    case 'confirming':
      return i18n.t('description_status_booking_confirming');
    case 'confirmed':
      return i18n.t('description_status_booking_confirmed');
    case 'booking_successfull':
      return i18n.t('description_status_booking_booking_successfull');
    case 'payment_fail':
      return i18n.t('description_status_booking_payment_fail');
    case 'canceled':
      return i18n.t('description_status_booking_canceled');
    default:
      return null;
  }
};
export function compareTime(time1, time2) {
  if (time1 > time2) {
    return true;
  } else {
    return false;
  }
}
export const handleError = (value, defaultMessage) => {
  switch (value) {
    case 'USER_IS_EXIST':
      return i18n.t('user_is_exist');
      break;
    case 'PASSWORD_INVALID':
      return i18n.t('password_invalid');
      break;
    case 'USER_NOT_FOUND':
      return i18n.t('user_not_found');
      break;
    case 'USERS_DUPLICATE':
      return i18n.t('users_duplicate_error');
      break;
    default:
      return defaultMessage;
      break;
  }
};
export const redirectAfterLogin = (navigate, defaultUrl) => {
  let preUrl = JSON.parse(localStorage.getItem('preUrl'));
  if (preUrl) {
    navigate(preUrl.pathname, {
      state: preUrl.state,
    });
  } else {
    navigate(defaultUrl);
  }
};
export const returnUrlParams = (urlParams) => {
  let arr = [];
  for (const entry of urlParams) {
    arr.push(entry);
  }
  const entries = new Map(arr);
  const obj = Object.fromEntries(entries);
  return obj;
};
export const returnLowestPrice = (priceByHour, priceByDay) => {
  if (priceByHour && priceByDay) {
    if (priceByHour <= priceByDay) {
      let price = formatCurrency(priceByHour);
      return price + '/H';
    } else {
      let price = formatCurrency(priceByDay);
      return price + '/Ngày';
    }
  } else {
    if (priceByHour) {
      let price = formatCurrency(priceByHour);
      return price + '/H';
    }
    if (priceByDay) {
      let price = formatCurrency(priceByDay);
      return price + '/Ngày';
    }
  }
};
