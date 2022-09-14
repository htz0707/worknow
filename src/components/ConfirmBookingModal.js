import React from 'react';
import { Modal } from 'react-bootstrap';
import { DatePicker } from 'antd';
import TimeSlotView from './TimeSlotView';

export default function ConfirmBookingModal(props) {
  const { show, handleClose, handleConfirm } = props;
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
        <h3 className='modal-title fw-bold'>Xác nhận Thời gian Đặt chỗ</h3>
      </Modal.Header>
      <Modal.Body className='modal-body px-4 py-4'>
        <div className='mb-3'>
          <label className='form-label text-gray'>Chọn ngày</label>
          <div className='date-picker-custom'>
            <DatePicker />
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
