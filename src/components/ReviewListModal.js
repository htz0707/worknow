import React from 'react';
import { Modal } from 'react-bootstrap';
import '../assets/styles/ReviewListModal.scss';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as DeskIcon } from '../assets/icons/desk.svg';
import Avatar from '../assets/images/default_avatar.png';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ReviewListModal(props) {
  const { show, handleClose, locationId } = props;
  const GET_FEEDBACKS = gql`
    query GetFeedbacks($locationId: UUID!) {
      feedbacks(params: { locationId: $locationId }) {
        edges {
          amenitiesRate
          avgRate
          comment
          servicesRate
          user {
            fullname
            avatar
          }
          workingSpaces {
            locationName
            name
          }
        }
      }
    }
  `;
  const [getFeedbacks] = useLazyQuery(GET_FEEDBACKS, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [feedbackList, setFeedbackList] = useState([]);
  const handleGetFeedbacks = async () => {
    let res = await getFeedbacks({
      variables: {
        locationId: locationId,
      },
    });
    if (res.data) {
      setFeedbackList(res.data.feedbacks.edges);
    }
  };
  useEffect(() => {
    handleGetFeedbacks();
  }, []);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='reviewlist-modal'
    >
      <Modal.Header closeButton className='reviewlist-modal_header'>
        <div className='title'>Tất cả đánh giá</div>
      </Modal.Header>
      <Modal.Body className='reviewlist-modal_body'>
        <div className='title-section'>
          <div>Khách hàng</div>
          <div>Đánh giá</div>
        </div>
        <div className='feedback-container'>
          {feedbackList.map((item, index) => {
            return (
              <div className='feedback-item' key={index}>
                <div className='customer-info'>
                  <div className='avatar'>
                    <img
                      className='avatar-image'
                      src={item?.user?.avatar || Avatar}
                      alt='avatar'
                    />
                  </div>
                  <div className='info'>
                    <div className='customer-name'>{item?.user?.fullname}</div>
                    <div className='location-name'>
                      <DeskIcon className='icon' />{' '}
                      {item?.workingSpaces?.locationName}
                    </div>
                  </div>
                </div>
                <div className='review-info'>
                  <div className='star-rate'>
                    <StarIcon className='icon' />{' '}
                    <span className='value'>{item?.avgRate}</span>
                  </div>

                  <p className='note'>{item?.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
