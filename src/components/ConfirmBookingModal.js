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
} from '../helpers/helpers';
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

  const [bookingInfoTypeDay, setBookingInfoTypeDay] = useState({
    startDate: null,
    endDate: null,
    totalDay: null,
    price: null,
    date_range: null,
  });
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
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
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
  const handleCaculate = () => {
    if (typeOfBooking === 'day') {
      if (bookingInfoTypeDay.startDate) {
        if (bookingInfoTypeDay.endDate) {
          let start_date_format = moment(bookingInfoTypeDay.startDate).format(
            'MM/DD/YYYY'
          );
          let end_date_format = moment(bookingInfoTypeDay.endDate).format(
            'MM/DD/YYYY'
          );
          let total_day =
            moment(end_date_format).diff(moment(start_date_format), 'days') + 1;

          let price = total_day * selectedWorkingSpace.priceByDay;
          let date_range;
          let start_date_format1 = moment(bookingInfoTypeDay.startDate).format(
            'DD/MM/YYYY'
          );
          let end_date_format1 = moment(bookingInfoTypeDay.endDate).format(
            'DD/MM/YYYY'
          );
          if (start_date_format1 === end_date_format1) {
            date_range = start_date_format1;
          } else {
            date_range = start_date_format1 + ' - ' + end_date_format1;
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
            date_range: moment(bookingInfoTypeDay.startDate).format(
              'DD/MM/YYYY'
            ),
          });
        }
      }
    }
  };
  useEffect(() => {
    handleCaculate();
  }, [bookingInfoTypeDay.startDate, bookingInfoTypeDay.endDate, typeOfBooking]);
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
  const handleCaculateHour = () => {
    if (typeOfBooking === 'hour') {
      if (
        bookingInfoTypeHour.startTime.time &&
        bookingInfoTypeHour.endTime.time
      ) {
        let time_range =
          bookingInfoTypeHour.startTime.time +
          ' - ' +
          bookingInfoTypeHour.endTime.time;
        let totalminutes =
          (bookingInfoTypeHour.endTime.id - bookingInfoTypeHour.startTime.id) *
          30;
        let price =
          (bookingInfoTypeHour.endTime.id - bookingInfoTypeHour.startTime.id) *
          0.5 *
          selectedWorkingSpace.priceByHour;
        setBookingInfoTypeHour({
          ...bookingInfoTypeHour,
          time_range: time_range,
          totalTime: toHoursAndMinutes(totalminutes),
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
    handleCaculateHour();
  }, [
    bookingInfoTypeHour.startTime,
    bookingInfoTypeHour.endTime,
    typeOfBooking,
  ]);
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  //
  const handleSubmit = () => {
    if (typeOfBooking === 'day') {
      if (bookingInfoTypeDay.startDate) {
        let day = moment(bookingInfoTypeDay.startDate).day();
        let working_hour = worksHour.find((item) => item.day === day);
        let start_date_join_time =
          moment(bookingInfoTypeDay.startDate).format('YYYY-MM-DD') +
          'T' +
          working_hour?.openHour;
        let start_date_utc = moment
          .utc(new Date(start_date_join_time).toUTCString())
          .format();
        let end_date_join_time;
        if (bookingInfoTypeDay.endDate) {
          let day = moment(bookingInfoTypeDay.endDate).day();
          let working_hour = worksHour.find((item) => item.day === day);
          end_date_join_time =
            moment(bookingInfoTypeDay.endDate).format('YYYY-MM-DD') +
            'T' +
            working_hour?.closeHour;
        } else {
          let day = moment(bookingInfoTypeDay.startDate).day();
          let working_hour = worksHour.find((item) => item.day === day);
          end_date_join_time =
            moment(bookingInfoTypeDay.startDate).format('YYYY-MM-DD') +
            'T' +
            working_hour?.closeHour;
        }
        let end_date_utc = moment
          .utc(new Date(end_date_join_time).toUTCString())
          .format();
        let data = {
          type: 'day',
          date_range: bookingInfoTypeDay.date_range,
          totalDay: bookingInfoTypeDay.totalDay,
          price: bookingInfoTypeDay.price,
          start_date_utc: start_date_utc,
          end_date_utc: end_date_utc,
        };
        navigate(`/create-booking/${locationId}/${selectedWorkingSpace.id}`, {
          state: {
            orderInfo: data,
          },
        });
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
        navigate(`/create-booking/${locationId}/${selectedWorkingSpace.id}`, {
          state: {
            orderInfo: data,
          },
        });
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
      let arr = data.map((item) => new Date(item.time));
      setExcludeDate(arr);
    }
  };
  useEffect(() => {
    if (selectedWorkingSpace.id) {
      if (typeOfBooking === 'day') {
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
      <Modal.Body className='modal-body px-0 py-4'>
        {typeOfBooking === 'day' && (
          <>
            <div className='mb-3'>
              <div className='d-flex justify-content-center'>
                <DatePicker
                  onChange={handleDateRangeChange}
                  startDate={bookingInfoTypeDay.startDate}
                  endDate={bookingInfoTypeDay.endDate}
                  selectsRange
                  inline
                  locale={'vi'}
                  minDate={moment().add(1, 'd').toDate()}
                  excludeDates={excludeDates}
                  filterDate={isOpenDay}
                />
              </div>
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
                  {t('time')}: {bookingInfoTypeDay.date_range}
                </label>
              </div>
              {error && <div className='text-danger'>{error}</div>}
            </div>
            <hr className='mx-4' />
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('total_time')}:</div>
              <div className='text-end'>
                {bookingInfoTypeDay.totalDay && (
                  <>
                    {bookingInfoTypeDay.totalDay} {t('day')}
                  </>
                )}
              </div>
            </div>
            <div className='d-flex justify-content-between px-4'>
              <div className='text-gray'>{t('price')}:</div>
              <div className='text-red'>
                <h4>{formatCurrency(bookingInfoTypeDay.price)}</h4>
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
