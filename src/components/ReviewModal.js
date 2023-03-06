import React from 'react';
import { Modal } from 'react-bootstrap';
import '../assets/styles/ReviewModal.scss';
import { ReactComponent as ReviewIcon } from '../assets/icons/review.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import cx from 'classnames';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';

export default function ReviewModal(props) {
  const { show, data, handleClose, handleConfirm } = props;
  const [starServiceIndex, setStarServiceIndex] = useState(0);
  const [starAmenityIndex, setStarAmenityIndex] = useState(0);
  const handleCancel = () => {
    setStarServiceIndex(0);
    setStarAmenityIndex(0);
    setErrorAmenity('');
    setErrorService('');
    setNote('');
    handleClose();
  };
  const [note, setNote] = useState('');
  const [errorService, setErrorService] = useState('');
  const [errorAmenity, setErrorAmenity] = useState('');
  //
  const CREATE_FEEDBACK = gql`
    mutation CreateFeedback(
      $locationId: UUID!
      $orderId: UUID!
      $servicesRate: Float!
      $amenitiesRate: Float!
      $comment: String!
    ) {
      createFeedback(
        data: {
          locationId: $locationId
          orderId: $orderId
          servicesRate: $servicesRate
          amenitiesRate: $amenitiesRate
          comment: $comment
        }
      ) {
        orderId
      }
    }
  `;
  const [createFeedback] = useMutation(CREATE_FEEDBACK, {
    update() {
      handleMessage('success', 'Cảm ơn bạn đã đánh giá.');
      handleCancel();
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(
          err.graphQLErrors[0]?.message,
          'Tạo đánh giá không thành công. Vui lòng thử lại'
        )
      );
      handleCancel();
    },
  });
  const handleSubmit = async () => {
    if (starServiceIndex > 0 && starAmenityIndex > 0) {
      createFeedback({
        variables: {
          locationId: data?.orderDetails[0]?.workingSpaces?.locationId,
          orderId: data?.id,
          servicesRate: starServiceIndex,
          amenitiesRate: starAmenityIndex,
          comment: note,
        },
      });
    } else {
      if (starServiceIndex === 0) {
        setErrorService('Vui lòng đánh giá');
      }
      if (starAmenityIndex === 0) {
        setErrorAmenity('Vui lòng đánh giá');
      }
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleCancel}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='review-modal'
    >
      <Modal.Header closeButton className='review-modal_header'></Modal.Header>
      <Modal.Body className='review-modal_body'>
        <ReviewIcon className='icon' />
        <div className='title'>Đánh giá</div>
        {data?.orderDetails && (
          <div className='location-name'>
            {data?.orderDetails[0]?.workingSpaces?.locationName}
          </div>
        )}
        {data?.orderDetails && (
          <div className='workingspace-name'>
            {data?.orderDetails[0]?.workingSpaces?.name}
          </div>
        )}
        <hr />
        <div className='review-section'>
          <label className='label'>Đánh giá dịch vụ</label>
          <div className='star-group'>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div key={index}>
                  <StarIcon
                    className={cx('star-item', {
                      active: index < starServiceIndex,
                    })}
                    onClick={() => {
                      setStarServiceIndex(item);
                      setErrorService('');
                    }}
                  />
                </div>
              );
            })}
          </div>
          {errorService && <div className='error'>{errorService}</div>}
        </div>
        <div className='review-section'>
          <label className='label'>Tiện nghi</label>
          <div className='star-group'>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div key={index}>
                  <StarIcon
                    className={cx('star-item', {
                      active: index < starAmenityIndex,
                    })}
                    onClick={() => {
                      setStarAmenityIndex(item);
                      setErrorAmenity('');
                    }}
                  />
                </div>
              );
            })}
          </div>
          {errorAmenity && <div className='error'>{errorAmenity}</div>}
        </div>
        <div className='review-section mb-0'>
          <label className='label'>Cảm nhận</label>
          <textarea
            className='form-control'
            style={{ resize: 'none' }}
            rows='3'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <hr />
        <div className='btn-group'>
          <button className='btn-cancel' onClick={handleCancel}>
            Hủy
          </button>
          <button className='btn-confirm' onClick={handleSubmit}>
            Gửi
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
