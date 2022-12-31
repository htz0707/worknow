import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import TimeSlotView from './TimeSlotView';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
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

export default function ConfirmBookingModal(props) {
  registerLocale('vi', vi);
  const { t } = useTranslation();
  const {
    show,
    handleClose,
    locationId,
    selectedWorkingSpace,
    openTime,
    closeTime,
  } = props;
  let navigate = useNavigate();
  const [typeOfBooking, setTypeBooking] = useState('');
  useEffect(() => {
    if (selectedWorkingSpace) {
      setTypeBooking(returnTypeOfBooking(selectedWorkingSpace.type));
    }
  }, [selectedWorkingSpace]);
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
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
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
        let start_date_join_time =
          moment(bookingInfoTypeDay.startDate).format('YYYY-MM-DD') +
          'T' +
          openTime;
        let start_date_utc = moment
          .utc(new Date(start_date_join_time).toUTCString())
          .format();
        let end_date_join_time;
        if (bookingInfoTypeDay.endDate) {
          end_date_join_time =
            moment(bookingInfoTypeDay.endDate).format('YYYY-MM-DD') +
            'T' +
            closeTime;
        } else {
          end_date_join_time =
            moment(bookingInfoTypeDay.startDate).format('YYYY-MM-DD') +
            'T' +
            closeTime;
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
  return (
    <Modal
      show={show}
      onHide={handleClose}
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
                    date={bookingInfoTypeHour.date}
                    openTime={openTime}
                    closeTime={closeTime}
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
                      date={bookingInfoTypeHour.date}
                      openTime={openTime}
                      closeTime={closeTime}
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
              onClick={handleClose}
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
