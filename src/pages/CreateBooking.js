import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import { Avatar } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const { Step } = Steps;

export default function CreateBooking() {
  const [currentStep, setCurrentStep] = useState(0);
  const customerInfo = {
    full_name: '',
    email: '',
    phone: '',
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    phone: Yup.string().required('This field is required!'),
  });
  const handleSubmit = (formValue) => {
    const { full_name, email, phone } = formValue;
    console.log(full_name);
  };
  return (
    <div className='create-booking'>
      <div className='header'>
        <div className='container-md'>
          <div>WorkNow</div>
          <div className='booking-step'>
            <Steps current={currentStep} labelPlacement='vertical'>
              <Step title='Thông tin đặt chỗ' />
              <Step title='Thanh toán' />
              <Step title='Xác nhận đặt chỗ' />
            </Steps>
          </div>
          <Button
            variant='primary'
            className='text-white fw-bold rounded-pill px-5'
          >
            Đăng nhập
          </Button>
        </div>
      </div>
      <div className='body container-md'>
        <div className='row'>
          <div className='col-lg-7 info-customer'>
            <div className='box-1'>
              <Avatar size={50} icon={<AiOutlineUser />} className='me-2' />
              <div>
                <div>
                  Bạn là nhân viên của Doanh nghiệp đối tác với WorkNow?{' '}
                </div>
                <div>
                  <a href='#'>Đăng nhập</a> để thanh toán bằng tài khoản Doanh
                  nghiệp.
                </div>
                <div>
                  Hoặc <a href='#'>Đăng ký</a> để tận hưởng những ưu đãi thành
                  viên.
                </div>
              </div>
            </div>
            <div className='box-2'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  name='flexRadioDefault'
                  type='radio'
                  id='bank'
                />
                <label className='form-check-label' for='bank'>
                  Tài khoản ngân hàng
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  name='flexRadioDefault'
                  type='radio'
                  id='momo'
                />
                <label class='form-check-label' for='momo'>
                  Momo
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  name='flexRadioDefault'
                  type='radio'
                  id='vnpay'
                />
                <label class='form-check-label' for='vnpay'>
                  VNPAY
                </label>
              </div>
            </div>
            <div className='box-3'>
              <div className='header'>Thông tin của bạn</div>
              <Formik
                initialValues={customerInfo}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className='form-group mb-2'>
                    <label htmlFor='full_name'>Họ và tên</label>
                    <Field
                      name='full_name'
                      type='text'
                      className='form-control'
                    />
                    <ErrorMessage
                      name='full_name'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label htmlFor='email'>Email</label>
                    <Field name='email' type='email' className='form-control' />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label htmlFor='phone'>Phone</label>
                    <Field name='phone' type='phone' className='form-control' />
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <div className='form-group d-flex justify-content-end'>
                    <button type='submit' className='btn btn-primary ms-auto'>
                      Xác nhận
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className='col-lg-5 info-workspace'></div>
        </div>
      </div>
    </div>
  );
}
