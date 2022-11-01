import React, { useState } from 'react';
import '../assets/styles/SignUp.scss';
import Logo from '../assets/images/logo_2.png';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='sign-in'>
      <div className='row'>
        <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
          <img src={Logo} width={200} />
        </div>
        <div className='col-lg-7 d-flex justify-content-center align-items-center'>
          <div className='sign-in-form rounded px-3 py-4'>
            <h3 className='d-flex justify-content-center fw-bold'>ĐĂNG KÝ</h3>
            <p className='d-flex justify-content-center'>Trở thành thành viên của WorkNow!</p>
            <form autoComplete=''>
              <input
                type="text"
                className="form-control single-line-input mb-4"
                placeholder="Tên"
              />
              <input
                type="email"
                className="form-control single-line-input mb-4"
                aria-describedby="emailHelp"
                placeholder="Tài khoản"
              />
              <input
                type="tel"
                className="form-control single-line-input mb-4"
                placeholder="Số điện thoại"
              />
              <div class="password-field mb-4">
                <input
                  type={!passwordShown ? "password" : "text"}
                  className="form-control single-line-input"
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
              <button type="submit" className="btn w-100 rounded-pill">Đăng Nhập</button>
            </form>
            <div className='d-flex justify-content-center my-2'>
              <a href='/sign-in' className='link'>Tôi đã có tài khoản!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
