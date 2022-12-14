import React, { useState } from 'react';
import '../assets/styles/SignUp.scss';
import Logo from '../assets/images/logo_2.png';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/sign-in');
  }

  const handleLogIn = () => {
    navigate('/')
  }

  return (
    <div className='sign-up-page'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img src={Logo} width={200} onClick={handleLogIn} />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='sign-up-form rounded px-3 py-4'>
              <h3 className='d-flex justify-content-center fw-bold'>ĐĂNG KÝ</h3>
              <p className='d-flex justify-content-center'>Trở thành thành viên của WorkNow!</p>
              <form autoComplete=''>
                <input
                  type="text"
                  className="form-control single-line-input mb-4"
                  placeholder="Tên"
                  required
                />
                <input
                  type="email"
                  className="form-control single-line-input mb-4"
                  aria-describedby="emailHelp"
                  placeholder="Tài khoản"
                  required
                />
                <input
                  type="tel"
                  className="form-control single-line-input mb-4"
                  placeholder="Số điện thoại"
                  required
                />
                <div className="password-field mb-4">
                  <input
                    type={!passwordShown ? "password" : "text"}
                    className="form-control single-line-input"
                    placeholder="Mật Khẩu"
                    required
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
                <p className='link' onClick={handleSignIn}>Tôi đã có tài khoản!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
