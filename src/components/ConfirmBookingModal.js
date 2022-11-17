import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from "react-datepicker";
import TimeSlotView from './TimeSlotView';
import 'react-datepicker/dist/react-datepicker.css';

export default function ConfirmBookingModal(props) {
  const { show, handleClose, handleConfirm } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
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
      <Modal.Body className='modal-body px-4 py-4'>
        <div className='mb-3'>
          <div className='d-flex justify-content-center'>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale ='vi'
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label text-gray'>Chọn giờ</label>
          <div>
            <TimeSlotView />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='col-md-3 px-1'>
          <button
            type='button'
            className='form-control btn-outline-dark'
            onClick={handleClose}
          >
            Hủy
          </button>
        </div>
        <div className='col-md-3 px-1'>
          <button
            type='button'
            className='form-control btn-primary'
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
