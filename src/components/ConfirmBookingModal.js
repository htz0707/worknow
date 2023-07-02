import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import TimeSlotView from './TimeSlotView';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import en from 'date-fns/locale/en-US';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/DatePicker.scss';
import {
  createTimeSlot,
  formatCurrency,
  returnTypeOfBooking,
  toHoursAndMinutes,
  getLastDayOfMonth,
  monthsBetweenDates,
} from '../helpers/helpers';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ConfirmBookingModal.scss';
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrowdownfill.svg';
import { useTranslation } from 'react-i18next';
import { gql, useLazyQuery } from '@apollo/client';
import { getDay } from 'date-fns';

export default function ConfirmBookingModal(props) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language === 'en') {
      registerLocale('en', en);
    }
    if (i18n.language === 'vi') {
      registerLocale('vi', vi);
    }
  }, [i18n.language]);
  const {
    show,
    handleClose,
    locationId,
    selectedWorkingSpace,
    openTime,
    closeTime,
    worksHour,
  } = props;
  let navigate = useNavigate();
  const [typeOfBooking, setTypeBooking] = useState('');
  useEffect(() => {
    if (selectedWorkingSpace) {
      setTypeBooking(returnTypeOfBooking(selectedWorkingSpace?.type));
    }
  }, [selectedWorkingSpace, show]);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  //   console.log(dates);
  // };

  const { TabPane } = Tabs;
  const [dayTab, setDayTab] = useState(true);
  const [bookingInfoTypeDay, setBookingInfoTypeDay] = useState({
    startDate: null,
    endDate: null,
    totalDay: null,
    price: null,
    date_range: null,
  });
  const [bookingInfoTypeMonth, setBookingInfoTypeMonth] = useState({
    start: null,
    end: null,
    startDate: null,
    endDate: null,
    totalDay: null,
    price: null,
    date_range: null,
  });
  const startDateOfMonth = (startDate) => {
    return moment().toDate().getMonth() === startDate.getMonth() &&
      moment().toDate().getFullYear() === startDate.getFullYear()
      ? moment().add(1, 'd').toDate()
      : startDate;
  }; 
  const handleMonthRangeChange = ([start, end]) => {
    if (end) {
      for (let i = 0; i < excludeMonths.length; i++) {
        if (
          excludeMonths[i].getMonth() > start.getMonth() &&
          excludeMonths[i].getMonth() < end.getMonth()
        ) {
          setBookingInfoTypeMonth({
            ...bookingInfoTypeMonth,
            start: end,
            end: null,
            startDate: startDateOfMonth(end),
            endDate: getLastDayOfMonth(end),
          });
          return;
        }
      }
    }
    setBookingInfoTypeMonth({
      ...bookingInfoTypeMonth,
      start: start,
      end: end,
      startDate: startDateOfMonth(start),
      endDate: end ? getLastDayOfMonth(end) : getLastDayOfMonth(start),
    });
  };
  function checkForBlockedDates(start, end, dates) {
    let closeDay = [];
    worksHour?.forEach((item) => {
      if (!item.openHour) {
        closeDay.push(item.day);
      }
    });
    const dateFormat = 'YYYY-MM-DD';
    const diff = moment(end).diff(start, 'days') + 1;

    for (let i = 0; i < diff; i++) {
      const checkDate = moment(start).add(i, 'd').format(dateFormat);
      const day = getDay(new Date(moment(start).add(i, 'd')));
      if (
        dates.find((item) => moment(item).format(dateFormat) === checkDate) ||
        closeDay.includes(day)
      ) {
        return true;
      }
    }

    return false;
  }
  const handleDayRangeChange = ([start, end]) => {
    if (end) {
      if (checkForBlockedDates(start, end, excludeDates)) {
        setBookingInfoTypeDay({
          ...bookingInfoTypeDay,
          startDate: end,
          endDate: null,
        });
        return;
      }
    }
    setBookingInfoTypeDay({
      ...bookingInfoTypeDay,
      startDate: start,
      endDate: end,
    });
    setError('');
  };
  const handleCalculateDay = () => {
    if (typeOfBooking === 'day-month' && selectedWorkingSpace?.priceByDay !== 0) {
      const startTemp = bookingInfoTypeDay.startDate;
      const endTemp = bookingInfoTypeDay.endDate;
      if (startTemp) {
        if (endTemp) {
          let start_format = moment(startTemp).format('MM/DD/YYYY');
          let end_format = moment(endTemp).format('MM/DD/YYYY');
          let total_day = moment(end_format).diff(moment(start_format), 'days') + 1;
          let price = total_day * selectedWorkingSpace.priceByDay;
          let date_range;
          let start_format1 = moment(startTemp).format('DD/MM/YYYY');
          let end_format1 = moment(endTemp).format('DD/MM/YYYY');
          if (start_format1 === end_format1) {
            date_range = start_format1;
          } else {
            date_range = start_format1 + ' - ' + end_format1;
          }
          setBookingInfoTypeDay({
            ...bookingInfoTypeDay,
            totalDay: total_day,
            price: price,
            date_range: date_range,
          });
        } else {
          setBookingInfoTypeDay({
            ...bookingInfoTypeDay,
            totalDay: 1,
            price: selectedWorkingSpace.priceByDay,
            date_range: moment(startTemp).format('DD/MM/YYYY'),
          });
        }
      }
    }
    if (typeOfBooking === 'day-month' && selectedWorkingSpace?.priceByMonth !== 0) {
      const startTemp = bookingInfoTypeMonth.startDate;
      const endTemp = bookingInfoTypeMonth.endDate;
      if (startTemp) {
        if (endTemp) {
          let start_format = moment(startTemp).format('MM/DD/YYYY');
          let end_format = moment(endTemp).format('MM/DD/YYYY');
          let total_day = moment(end_format).diff(moment(start_format), 'days') + 1;
          let price =  monthsBetweenDates(startTemp, endTemp) * selectedWorkingSpace.priceByMonth;
          let date_range;
          let start_format1 = moment(startTemp).format('DD/MM/YYYY');
          let end_format1 = moment(endTemp).format('DD/MM/YYYY');
          if (start_format1 === end_format1) {
            date_range = start_format1;
          } else {
            date_range = start_format1 + ' - ' + end_format1;
          }
          setBookingInfoTypeMonth({
            ...bookingInfoTypeMonth,
            totalDay: total_day,
            price: price,
            date_range: date_range,
          });
        }
      }
    }
  };
  useEffect(() => {
    handleCalculateDay();
  }, [
    bookingInfoTypeDay.startDate,
    bookingInfoTypeDay.endDate,
    bookingInfoTypeMonth.startDate,
    bookingInfoTypeMonth.endDate,
    typeOfBooking,
  ]);
  //
  const [bookingInfoTypeHour, setBookingInfoTypeHour] = useState({
    date: new Date(),
    startTime: {},
    endTime: {},
    totalTime: null,
    price: null,
    time_range: null,
  });
  const handleChangeBookingInfoTypeHour = (data) => {
    setBookingInfoTypeHour({ ...bookingInfoTypeHour, ...data });
    setError('');
  };
  const handleDateChange = (value) => {
    setBookingInfoTypeHour({
      ...bookingInfoTypeHour,
      date: value,
      startTime: {},
      endTime: {},
      totalTime: null,
      price: null,
      time_range: null,
    });
    setShowCalendar(false);
  };
  const handleCalculateHour = () => {
    if (typeOfBooking === 'hour') {
      if (
        bookingInfoTypeHour.startTime.time &&
        bookingInfoTypeHour.endTime.time
      ) {
        let time_range =
          bookingInfoTypeHour.startTime.time +
          ' - ' +
          bookingInfoTypeHour.endTime.time;
        let totalMinutes =
          (bookingInfoTypeHour.endTime.id - bookingInfoTypeHour.startTime.id) *
          30;
        let price =
          (bookingInfoTypeHour.endTime.id - bookingInfoTypeHour.startTime.id) *
          0.5 *
          selectedWorkingSpace.priceByHour;
        setBookingInfoTypeHour({
          ...bookingInfoTypeHour,
          time_range: time_range,
          totalTime: toHoursAndMinutes(totalMinutes),
          price: price,
        });
      } else {
        setBookingInfoTypeHour({
          ...bookingInfoTypeHour,
          time_range: null,
          totalTime: null,
          price: null,
        });
      }
    }
  };
  useEffect(() => {
    handleCalculateHour();
  }, [
    bookingInfoTypeHour.startTime,
    bookingInfoTypeHour.endTime,
    typeOfBooking,
  ]);
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  //
  const handleSubmit = () => {
    if (typeOfBooking === 'day-month') {
      const bookingInfo = dayTab ? {...bookingInfoTypeDay} : {...bookingInfoTypeMonth}
      if (bookingInfo.startDate) {
        let day = moment(bookingInfo.startDate).day();
        let working_hour = worksHour.find((item) => item.day === day);
        let start_date_join_time =
          moment(bookingInfo.startDate).format('YYYY-MM-DD') +
          'T' +
          working_hour?.openHour;
        let start_date_utc = moment
          .utc(new Date(start_date_join_time).toUTCString())
          .format();
        let end_date_join_time;
        if (bookingInfo.endDate) {
          let day = moment(bookingInfo.endDate).day();
          let working_hour = worksHour.find((item) => item.day === day);
          end_date_join_time =
            moment(bookingInfo.endDate).format('YYYY-MM-DD') +
            'T' +
            working_hour?.closeHour;
        } else {
          let day = moment(bookingInfo.startDate).day();
          let working_hour = worksHour.find((item) => item.day === day);
          end_date_join_time =
            moment(bookingInfo.startDate).format('YYYY-MM-DD') +
            'T' +
            working_hour?.closeHour;
        }
        let end_date_utc = moment
          .utc(new Date(end_date_join_time).toUTCString())
          .format();
        let data = {
          type: dayTab? 'day' : 'month',
          date_range: bookingInfo.date_range,
          totalDay: bookingInfo.totalDay,
          price: bookingInfo.price,
          start_date_utc: start_date_utc,
          end_date_utc: end_date_utc,
        };
        navigate(
          `/create-booking?location_id=${locationId}&working_space_id=${selectedWorkingSpace.id}`,
          {
            state: {
              orderInfo: data,
            },
          }
        );
      } else {
        setError(t('please_select_booking_time'));
      }
    }
    if (typeOfBooking === 'hour') {
      if (
        bookingInfoTypeHour.startTime.time &&
        bookingInfoTypeHour.endTime.time
      ) {
        let start_date_join_time =
          moment(bookingInfoTypeHour.date).format('YYYY-MM-DD') +
          'T' +
          bookingInfoTypeHour.startTime.time;
        let end_date_join_time =
          moment(bookingInfoTypeHour.date).format('YYYY-MM-DD') +
          'T' +
          bookingInfoTypeHour.endTime.time;
        let start_date_utc = moment
          .utc(new Date(start_date_join_time).toUTCString())
          .format();
        let end_date_utc = moment
          .utc(new Date(end_date_join_time).toUTCString())
          .format();
        let data = {
          type: 'hour',
          date: moment(bookingInfoTypeHour.date).format('DD/MM/YYYY'),
          time_range: bookingInfoTypeHour.time_range,
          price: bookingInfoTypeHour.price,
          totalTime: bookingInfoTypeHour.totalTime,
          start_date_utc: start_date_utc,
          end_date_utc: end_date_utc,
        };
        navigate(
          `/create-booking?location_id=${locationId}&working_space_id=${selectedWorkingSpace.id}`,
          {
            state: {
              orderInfo: data,
            },
          }
        );
      } else {
        setError(t('please_select_booking_time'));
      }
    }
  };
  //
  useEffect(() => {
    setBookingInfoTypeDay({
      startDate: null,
      endDate: null,
      totalDay: null,
      price: null,
      date_range: null,
    });
    setBookingInfoTypeMonth({
      start: null,
      end: null,
      startDate: null,
      endDate: null,
      totalDay: null,
      price: null,
      date_range: null,
    });
    setBookingInfoTypeHour({
      date: new Date(),
      startTime: {},
      endTime: {},
      totalTime: null,
      price: null,
      date_range: moment(new Date()).format('DD/MM/YYYY'),
    });
    setError('');
    setShowCalendar(false);
    setDayTab(true);
  }, [show]);
  const GET_WORKINGSPACE_AVAILABLE = gql`
    query GetWorkingspaceAvailable(
      $bookingType: BookingType!
      $startDate: datetime!
      $endDate: datetime
      $workingSpaceId: UUID!
    ) {
      workingSpaceAvailable(
        params: {
          bookingType: $bookingType
          startDate: $startDate
          endDate: $endDate
          workingSpaceId: $workingSpaceId
        }
      ) {
        available
        over
        time
      }
    }
  `;
  const [getWorkingspaceAvailable] = useLazyQuery(GET_WORKINGSPACE_AVAILABLE, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [timeslot, setTimeSlot] = useState([]);
  const [selectedWorkingHour, setSelectedWorkingHour] = useState({});
  const handleGetTimeSlot = async () => {
    let day = moment(bookingInfoTypeHour.date).day();
    let working_hour = worksHour.find((item) => item.day === day);
    console.log(working_hour);
    if (working_hour.openHour && working_hour.closeHour) {
      setSelectedWorkingHour(working_hour);
      let start_date_join_time =
        moment(bookingInfoTypeHour.date).format('YYYY-MM-DD') +
        'T' +
        working_hour.openHour;
      let start_date_utc = moment
        .utc(new Date(start_date_join_time).toUTCString())
        .format();
      let end_date_join_time =
        moment(bookingInfoTypeHour.date).format('YYYY-MM-DD') +
        'T' +
        working_hour.closeHour;
      let end_date_utc = moment
        .utc(new Date(end_date_join_time).toUTCString())
        .format();
      let bodyData = {
        bookingType: 'hour',
        workingSpaceId: selectedWorkingSpace.id,
        startDate: start_date_utc,
        endDate: end_date_utc,
      };
      let res = await getWorkingspaceAvailable({
        variables: bodyData,
      });
      if (res.data) {
        setTimeSlot(res.data.workingSpaceAvailable);
      }
    } else {
      setSelectedWorkingHour({});
      setTimeSlot([]);
    }
  };
  useEffect(() => {
    if (selectedWorkingSpace.id) {
      if (typeOfBooking === 'hour') {
        handleGetTimeSlot();
      }
    }
  }, [bookingInfoTypeHour.date, typeOfBooking]);
  const [excludeMonths, setExcludeMonth] = useState([]);
  const [excludeDates, setExcludeDate] = useState([]);
  const handleGetExcludeDates = async () => {
    let day = moment().day();
    let working_hour = worksHour.find((item) => item.day === day);
    let start_date_join_time;
    if (working_hour.openHour) {
      start_date_join_time =
        moment().format('YYYY-MM-DD') + 'T' + working_hour.openHour;
    } else {
      start_date_join_time = moment().format('YYYY-MM-DD') + 'T' + '07:00:00';
    }
    let start_date_utc = moment
      .utc(new Date(start_date_join_time).toUTCString())
      .format();
    let bodyData = {
      bookingType: 'day',
      workingSpaceId: selectedWorkingSpace.id,
      startDate: start_date_utc,
    };
    let res = await getWorkingspaceAvailable({
      variables: bodyData,
    });
    if (res.data) {
      let data = res.data.workingSpaceAvailable;
      let notAvailableDate = data.filter(item => item.available === false).map(item => new Date(item.time));
      setExcludeDate(notAvailableDate);
    }
    let bodyData1 = {
      bookingType: 'month',
      workingSpaceId: selectedWorkingSpace.id,
      startDate: start_date_utc,
    }
    let res1 = await getWorkingspaceAvailable({
      variables: bodyData1,
    });
    if (res1.data) {
      let data = res1.data.workingSpaceAvailable;
      let arr = data.filter(item => item.available === false).map(item => new Date(item.time));
      setExcludeMonth(arr);
    }
  };
  useEffect(() => {
    if (selectedWorkingSpace.id) {
      if (typeOfBooking === 'day-month') {
        handleGetExcludeDates();
      }
    }
  }, [typeOfBooking, selectedWorkingSpace]);
  const isOpenDay = (date) => {
    let closeDay = [];
    worksHour?.forEach((item) => {
      if (!item.openHour) {
        closeDay.push(item.day);
      }
    });
    const day = getDay(date);
    return !closeDay?.includes(day);
  };
  //
  const handleCancel = () => {
    setTypeBooking('');
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleCancel}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='confirm-booking-modal'
    >
      <Modal.Header className='px-4 py-2 d-flex flex-column align-items-center justify-content-center'>
        <h3 className='modal-title fw-bold'>{t('select_time')}</h3>
      </Modal.Header>
      <Modal.Body className='modal-body px-0'>
        {typeOfBooking === 'day-month' && (
          <>
            <div className='mx-4'>
              <Tabs defaultActiveKey="1" className='mb-3' onChange={() => setDayTab(!dayTab)}
              >
                <TabPane tab={t('rent_by_day')} key='1' disabled={selectedWorkingSpace?.priceByDay === 0}>
                  <div className='d-flex justify-content-center'>
                    <DatePicker
                      onChange={handleDayRangeChange}
                      startDate={bookingInfoTypeDay.startDate}
                      endDate={bookingInfoTypeDay.endDate}
                      selectsRange
                      inline
                      locale='vi'
                      minDate={moment().add(1, 'd').toDate()}
                      excludeDates={excludeDates}
                      filterDate={isOpenDay}
                    />
                  </div>
                </TabPane>
                <TabPane tab={t('rent_by_month')} key='2' disabled={selectedWorkingSpace?.priceByMonth === 0}>
                  <div className='d-flex justify-content-center'>
                    <DatePicker
                      onChange={handleMonthRangeChange}
                      startDate={bookingInfoTypeMonth.start}
                      endDate={bookingInfoTypeMonth.end}
                      minDate={moment().toDate().setDate(0)}
                      excludeDates={excludeMonths}
                      locale='vi'
                      showMonthYearPicker
                      selectsRange
                      inline
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div className='mb-3 mx-4'>
              {/* <div className='fw-bold d-flex justify-content-center align-items-center'>
                Thời gian
              </div>
              <div>
                <TimeSlotView />
              </div> */}

              <div>
                <label className='mt-2 form-label text-gray'>
                  {t('time')}: {dayTab ? bookingInfoTypeDay.date_range : bookingInfoTypeMonth.date_range}
                </label>
              </div>
              {error && <div className='text-danger'>{error}</div>}
            </div>
            <hr className='mx-4' />
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('total_time')}:</div>
              <div className='text-end'>
                {dayTab ? (
                  bookingInfoTypeDay.totalDay && (
                    <>
                      {bookingInfoTypeDay.totalDay} {t('day')}
                    </>
                  )
                ) : (
                  bookingInfoTypeMonth.totalDay && (
                    <>
                      {bookingInfoTypeMonth.totalDay} {t('day')}
                    </>
                  )
                )}
              </div>
            </div>
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('price')}:</div>
              <div className='text-red'>
                <h4>{formatCurrency(dayTab ? bookingInfoTypeDay.price : bookingInfoTypeMonth.price)}</h4>
              </div>
            </div>
          </>
        )}
        {typeOfBooking === 'hour' && (
          <>
            <div className='hour-web'>
              <div className='mb-3'>
                <div className='d-flex justify-content-center'>
                  <DatePicker
                    selected={bookingInfoTypeHour.date}
                    onChange={handleDateChange}
                    inline
                    locale={'vi'}
                    minDate={moment().toDate()}
                  />
                </div>
              </div>
              <div className='mb-3 px-4'>
                <div className='fw-bold d-flex justify-content-center align-items-center'>
                  {t('time')}
                </div>
                <div>
                  <TimeSlotView
                    dataTimeslot={timeslot}
                    date={bookingInfoTypeHour.date}
                    openTime={selectedWorkingHour.openHour}
                    closeTime={selectedWorkingHour.closeHour}
                    startTime={bookingInfoTypeHour.startTime}
                    handleChangeTimeSlot={handleChangeBookingInfoTypeHour}
                    endTime={bookingInfoTypeHour.endTime}
                  />
                </div>

                <div>
                  <label className='mt-2 form-label text-gray'>
                    {t('time')}:{' '}
                    {moment(bookingInfoTypeHour.date).format('DD/MM/YYYY')}{' '}
                    {bookingInfoTypeHour.time_range}
                  </label>
                </div>
                {error && <div className='text-danger'>{error}</div>}
              </div>
            </div>
            <div className='hour-mobile'>
              {!showCalendar && (
                <div
                  className='date-dropdown px-4'
                  onClick={() => setShowCalendar(true)}
                >
                  <span>
                    {moment(bookingInfoTypeHour.date).format('DD/MM/YYYY')}
                  </span>
                  <ArrowDownIcon />
                </div>
              )}
              {showCalendar && (
                <div className='mb-3'>
                  <div className='d-flex justify-content-center'>
                    <DatePicker
                      selected={bookingInfoTypeHour.date}
                      onChange={handleDateChange}
                      inline
                      locale={'vi'}
                      minDate={moment().toDate()}
                    />
                  </div>
                </div>
              )}
              {!showCalendar && (
                <div className='mb-3 px-4'>
                  <div className='fw-bold d-flex justify-content-center align-items-center'>
                    {t('time')}
                  </div>
                  <div>
                    <TimeSlotView
                      dataTimeslot={timeslot}
                      date={bookingInfoTypeHour.date}
                      openTime={selectedWorkingHour.openHour}
                      closeTime={selectedWorkingHour.closeHour}
                      startTime={bookingInfoTypeHour.startTime}
                      handleChangeTimeSlot={handleChangeBookingInfoTypeHour}
                      endTime={bookingInfoTypeHour.endTime}
                    />
                  </div>
                </div>
              )}
              <div className='px-4'>
                <div>
                  <label className='mt-2 form-label text-gray'>
                    {t('time')}:{' '}
                    {moment(bookingInfoTypeHour.date).format('DD/MM/YYYY')}{' '}
                    {bookingInfoTypeHour.time_range}
                  </label>
                </div>
                {error && <div className='text-danger'>{error}</div>}
              </div>
            </div>
            <hr className='mx-4' />
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('total_time')}:</div>
              <div className='text-end'>{bookingInfoTypeHour.totalTime}</div>
            </div>
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('price')}:</div>
              <div className='text-red'>
                <h4>{formatCurrency(bookingInfoTypeHour.price)}</h4>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className='row w-100'>
          <div className='col-6 px-1'>
            <button
              type='button'
              className='w-100 btn btn-outline-dark rounded-pill'
              onClick={handleCancel}
            >
              {t('cancel')}
            </button>
          </div>
          <div className='col-6 px-1'>
            <button
              type='button'
              className='w-100 btn btn-orange rounded-pill'
              onClick={handleSubmit}
            >
              {t('book_now')}
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
