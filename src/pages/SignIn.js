import React, { useState } from 'react';
import '../assets/styles/SignIn.scss';
import Logo from '../assets/images/logo_2.png';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function SignIn() {
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
            <h3 className='d-flex justify-content-center fw-bold'>ĐĂNG NHẬP</h3>
            <p className='d-flex justify-content-center'>Đăng nhập để nhận được nhiều ưu đãi hơn!</p>
            <form autoComplete='off'>
              <input
                type="email"
                className="form-control single-line-input mb-4"
                aria-describedby="emailHelp"
                placeholder="Tài khoản"
              />
              <div className="password-field mb-4">
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
            <div className='row mt-2'>
              <div className='col-lg-8'>
                Bạn chưa có tài khoản? <span><a href='/sign-up' className='link'>Đăng ký</a></span>
              </div>
              <div className='col-lg-4 text-end'><a href='#' className='link'>Quên mật khẩu?</a></div>
            </div>
            <div className='d-flex justify-content-center my-2 text-gray'>
              - Hoặc -
            </div>
            <button className="btn btn-white w-100 border rounded mb-2"><FacebookIcon className='icon me-3' /> Đăng nhập với Facebook</button>
            <button className="btn btn-white w-100 border rounded"><GoogleIcon className='icon me-3' /> Đăng nhập với Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
