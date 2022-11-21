import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import TimeSlotView from './TimeSlotView';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/DatePicker.scss'

export default function ConfirmBookingModal(props) {
  const { show, handleClose, handleConfirm } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  registerLocale('vi', vi);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header className='px-4 py-2 d-flex flex-column align-items-center justify-content-center'>
        <h3 className='modal-title fw-bold'>Chọn Thời Gian</h3>
      </Modal.Header>
      <Modal.Body className='modal-body px-0 py-4'>
        <div className='mb-3'>
          <div className='d-flex justify-content-center'>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale={'vi'}
            />
          </div>
        </div>
        <div className='mb-3 mx-4'>
          <div className='fw-bold d-flex justify-content-center align-items-center'>Thời gian</div>
          <div>
            <TimeSlotView />
          </div>
          {
            endDate !== null &&
            <div>
              <label className='mt-2 form-label text-gray'>
                Thời gian: {moment(startDate).format('D/M - ')}{moment(endDate).format('D/M, ')}{moment(endDate).format('Y')}
              </label>
            </div>
          }
          {
            endDate === null &&
            <div>
              <label className='mt-2 form-label text-gray'>
                Thời gian: 09:00 - 10:30
              </label>
            </div>
          }
        </div>
        <hr className='mx-4' />
        <div className='row px-4'>
          <div className='col-8 text-gray'>Tổng thời gian:</div>
          <div className='col-4 text-end'>1 giờ 30 phút</div>
        </div>
        <div className='row px-4'>
          <div className='col-8 text-gray'>Giá:</div>
          <div className='text-red col-4 text-end'><h4>1,300,000Đ</h4></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='row w-100'>
          <div className='col-6 px-1'>
            <button
              type='button'
              className='w-100 btn btn-outline-dark rounded-pill'
              onClick={handleClose}
            >
              Hủy
            </button>
          </div>
          <div className='col-6 px-1'>
            <button
              type='button'
              className='w-100 btn btn-orange rounded-pill'
              onClick={handleConfirm}
            >
              Đặt Ngay
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
