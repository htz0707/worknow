import React from 'react';
import '../assets/styles/SpacePartner.scss';
import { useEffect } from 'react';
import { Tabs } from 'antd';
import SignUpForm from '../components/SignUpFormForSpacePartner';
import layout1 from '../assets/images/space_partner_1.png'
import room1 from '../assets/images/room_1.svg';
import room2 from '../assets/images/room_2.svg';
import room3 from '../assets/images/room_3.svg';
import room4 from '../assets/images/room_4.svg';
import room5 from '../assets/images/room_5.svg';
import solution from '../assets/images/solution.svg';
import money from '../assets/icons/money.svg';
import clock from '../assets/icons/clock.svg';
import chart from '../assets/icons/chart.svg';
import data1 from '../assets/images/data1.png';
import data2 from '../assets/images/data2.svg';
import data3 from '../assets/images/data3.svg';
import data4 from '../assets/images/data4.svg';

import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from 'react-icons/bs';

export default function SpacePartner() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/business`);
  };
  return (
    <div className='space-partner' >
      <div className='layout-1'>
        <div className='container-md'>
          <section>
            <div className='row'>
              <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
                <div>
                  <h2>
                    ĐĂNG KÝ ĐỐI TÁC VỚI WORKNOW ĐỂ TRỞ THÀNH MỘT PHẦN CỦA VĂN HÓA “LÀM VIỆC BẤT CỨ ĐÂU, BẤT CỨ KHI NÀO BẠN CẦN”
                  </h2>
                  <p className='description'>
                    Nắm bắt được xu hương làm việc tương lai, worknow là nền tảng tiên phong ở việt nam dành cho không gian làm 
                    việc theo yêu cầu. giúp bạn kết nối với những người có nhu cầu tìm kiếm không gian làm việc ở bất kỳ đâu, bất
                    kỳ lúc nào.
                  </p>
                  <button className='btn btn-warning fw-bold' onClick={handleClick}>
                    TRỞ THÀNH ĐỐI TÁC<BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                  </button>
                </div>
              </div>
              <div className='col-lg-7 right-layout-1'>
                <img src={layout1} className='w-100 right-picture-1' alt='image' />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='container-md mt-5'>
        <div className=''>
          <h2 className='text-center'>CÁC LOẠI HÌNH</h2>
          <p className='text-center'>Tìm kiếm nguồn nhu cầu không giới hạn, lấp đầy các không gian làm việc của bạn <br />
            và cung cấp dịch vụ ở bất cứ đâu.</p>
          <div className='image-card-group-1'>
            <div className='image-card'>
              <img src={room2} className='image-scale' />
              <h3>PHÒNG HỌP</h3>
              <p>Phòng họp từ 2 khách đến 15 khách.</p>
            </div>
            <div className='image-card'>
              <img src={room1} className='image-scale' />
              <h3>BOOTH CÁ NHÂN</h3>
              <p>Booth riêng 1 chỗ.</p>
            </div>
          </div>
          <div className='image-card-group-2'>
            <div className='image-card'>
              <img src={room3} className='image-scale' />
              <h3>BÀN LÀM VIỆC CÁ NHÂN</h3>
              <p>Môi trường làm việc chuyên nghiệp.</p>
            </div>
            <div className='image-card'>
              <img src={room4} className='image-scale' />
              <h3>PHÒNG SỰ KIỆN</h3>
              <p>Phòng hội thảo sức chứa lên đến 45 khách.</p>
            </div>
            <div className='image-card'>
              <img src={room5} className='image-scale' />
              <h3>PHÒNG LÀM VIỆC</h3>
              <p>Giải pháp văn phòng tối ưu cho doanh nghiệp.</p>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='fw-bold text-center'>GIẢI PHÁP TỐI ƯU NƠI LÀM VIỆC DÀNH MỌI DOANH NGHIỆP</h2>
          <p className='text-center'>Cung Cấp Đủ Chỗ Ngồi Với Lực Lượng Lao Động Doanh Nghiệp, Khách Đi Công Tác, Doanh Nhân Và Nhân Viên Di Động.</p>
          <img src={solution} className='w-100 my-3' />
        </div>
        <div className='align-center'>
          <h2 className='fw-bold text-center'>QUAN HỆ ĐỐI TÁC CHIẾN LƯỢC </h2>
          <div className='row solution-group'>
            <div className='col-lg-3 solution-card border rounded p-4'>
              <div className='mb-3 border rounded-circle relationship-icon'>
                <img src={money} className='image-icon' />
              </div>
              <h4>GIÁ CẢ</h4>
              <p className='text-solution'>Bạn kiểm soát việc định giá không gian của mình. WorkNow sẽ cung cấp cho bạn các đề xuất về cách tối ưu hóa doanh thu của bạn.</p>
            </div>
            <div className='col-lg-3 solution-card border rounded p-4'>
              <div className='mb-3 border rounded-circle relationship-icon'>
                <img src={clock} className='image-icon' />
              </div>
              <h4>THỜI GIAN MỞ CỬA</h4>
              <p className='text-solution'>Bạn kiểm soát giờ mở cửa, ngày nghỉ và thời gian đóng cửa tạm thời của không gian của mình.</p>
            </div>
            <div className='col-lg-3 solution-card border rounded p-4'>
              <div className='mb-3 border rounded-circle relationship-icon'>
                <img src={chart} className='image-icon' />
              </div>
              <h4>DỮ LIỆU</h4>
              <p className='text-solution'>Khả năng hiển thị dữ liệu theo thời gian thực. Truy cập thanh toán và tạo báo cáo qua Cổng đối tác WorkNow.</p>
            </div>
          </div>
        </div>
      </div >
      {/* <div className='data-layout'>
        <section className='section-about'>
          <div className='container-md'>
            <div className='row'>
              <div className='col-lg-5'>
                <div className='content'>
                  <h2>
                    BÁO CÁO DỮ LIỆU <br />
                    THEO THỜI GIAN THỰC
                  </h2>
                  <p className='description'>
                    Nhận thông tin chi tiết về đăng ký và thanh toán của từng đặt chỗ, quản lý doanh thu và xác định các báo cáo của riêng bạn về việc sử dụng, doanh thu, theo địa điểm, không gian làm việc, theo phạm thời gian.
                  </p>
                </div>
              </div>
              <div className='col-lg-7 right-picture-data'>
                <img src={data1} className='data-1' />
                <img src={data2} className='data-2' />
                <img src={data3} className='data-3' />
                <img src={data4} className='data-4' />
              </div>
            </div>
          </div>
        </section>
      </div> */}
      <div className='layout-1'>
        <div className='container-md'>
          <section>
            <div className='row'>
              <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
                <div>
                  <h2 className='fw-bold'>
                    BÁO CÁO DỮ LIỆU <br />
                    THEO THỜI GIAN THỰC
                  </h2>
                  <p className='description'>
                    Nhận thông tin chi tiết về đăng ký và thanh toán của từng đặt chỗ, quản lý doanh thu và xác định các báo cáo của riêng bạn về việc sử dụng, doanh thu, theo địa điểm, không gian làm việc, theo phạm thời gian.
                  </p>
                </div>
              </div>
              <div className='col-lg-7 right-picture-data'>
                <img src={data1} className='data-1' />
                <img src={data2} className='data-2' />
                <img src={data3} className='data-3' />
                <img src={data4} className='data-4' />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='sign-up-block'>
        <h2 className='fw-bold'>LIÊN HỆ VỚI WORKNOW</h2>
        <div className='sign-up-form'>
          <Tabs
            defaultActiveKey='1'
            className='sign-up-tabs'
            type='card'
            items={[
              {
                label: 'Trở thành Đối tác với chúng tôi',
                key: '1',
                children: <SignUpForm free={true} />,
              },
            ]}
          />
        </div>
      </div>
    </div >
  );
}
