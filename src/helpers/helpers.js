import moment from 'moment';
import { message } from 'antd';
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
      return 'Đã tạo đơn';
    case 'confirming':
      return 'Chờ xác nhận thanh toán';
    case 'confirmed':
      return 'Đã xác nhận thanh toán';
    case 'booking_successful':
      return 'Đặt chỗ thành công';
    case 'payment_fail':
      return 'Xác nhận thanh toán thất bại';
    case 'canceled':
      return 'Đã hủy đơn';
    case 'booking_expired':
      return 'Đơn hết hiệu lực';
    case 'extended':
      return 'Đơn được gia hạn';
    default:
      return null;
  }
};
export function compareTime(time1, time2) {
  if (new Date('1/1/1999 ' + time1) >= new Date('1/1/1999 ' + time2)) {
    return true;
  } else {
    return false;
  }
}
export const handleError = (value, defaultMessage) => {
  switch (value) {
    case 'USER_IS_EXIST':
      return `Tài khoản email này đã tồn tại. Vui lòng kiểm tra lại`;
      break;
    case 'PASSWORD_INVALID':
      return `Mật khẩu của bạn không chính xác, vui lòng kiểm tra lại.`;
      break;
    case 'USER_NOT_FOUND':
      return `Chưa có tài khoản email này, vui lòng tạo tài khoản.`;
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
