import React from 'react';
import '../assets/styles/BusinessRegisterFinalStep.scss';
import { useState } from 'react';
import { BsEye, BsEyeSlash, BsCheck } from 'react-icons/bs';

export default function BusinessRegisterFinalStep() {
  const [step, setStep] = useState(1);
  const handleClick = () => {
    if (step === 1) setStep(2);
  }
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className='layout'>
      <div className='row'>
        <div className='col-6 image-office'></div>
        <div className='col-6 sign-up-card'>
          <h2 className='fw-bold'>XIN CHÀO ANH NGUYEN</h2>
          <p className='text-1'>Tuyệt vời! Cuối cùng, hãy tạo mật khẩu để bảo mật Tài khoản của bạn .</p>
          {
            step === 1 &&
            <>
              <h5>Đầu tiên, vui lòng cho chúng tôi biết thêm về Doanh nghiệp của bạn.</h5>
              <form className='mt-3'>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Tên Doanh Nghiệp</label>
                  <input type='text' className='form-control' placeholder='Nhập vào tên của bạn' />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Mã Số Thuế</label>
                  <input type='text' className='form-control' placeholder='Nhập vào tên của bạn' />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Số Lượng Nhân Viên</label>
                  <input type='text' className='form-control' placeholder='Nhập vào tên của bạn' />
                </div>
                <button type="submit" onClick={handleClick} className="btn w-100 rounded-pill">Tiếp Theo</button>
              </form>
            </>
          }
          {
            step === 2 &&
            <>
              <form className='mt-3'>
                <label className='form-label fw-bold'>Mật Khẩu</label>
                <div className="password-field mb-4">
                  <input
                    type={!passwordShown ? "password" : "text"}
                    className="form-control"
                    placeholder="Mật Khẩu"
                  />
                  {
                    !passwordShown ?
                      <BsEye
                        className='eye-icon'
                        onClick={togglePassword}
                      /> :
                      <BsEyeSlash
                        className='eye-icon'
                        onClick={togglePassword}
                      />
                  }
                </div>
                
                <label className='form-label fw-bold'>Xác Nhận Mật Khẩu</label>
                <div className="password-field mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật Khẩu"
                  />
                  <BsCheck className='eye-icon' color='green' size={22} />
                </div>
                <button type="submit" className="btn w-100 rounded-pill">Hoàn Thành</button>
              </form>
            </>
          }
        </div>
      </div>
    </div>
  );
}
