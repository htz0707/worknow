import React from 'react';
import { Modal } from 'react-bootstrap';
import '../assets/styles/OrderExpireModal.scss';
import { ReactComponent as ClockWarning } from '../assets/icons/clockWarning.svg';
import { useNavigate } from 'react-router-dom';
export default function OrderExpireModal(props) {
  const { show, order_code } = props;
  const navigate = useNavigate();
  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='order-expire-modal'
    >
      <Modal.Body className='order-expire-modal_body'>
        <div className='icon-container'>
          <ClockWarning />
        </div>
        <div className='title'>Đơn hàng của bạn đã hết hạn!</div>
        <div className='description'>
          Đơn hàng <span>#{order_code}</span> của bạn đã quá hạn thanh toán.
          <br /> Vui lòng đặt lại!
        </div>
        <button className='btn-home' onClick={() => navigate('/locations')}>
          Về Trang Chủ
        </button>
      </Modal.Body>
    </Modal>
  );
}
