import React from 'react';
import UserLayout from '../layouts/UserLayout';
import '../assets/styles/OrderHistory.scss';
import { ReactComponent as Calendar } from '../assets/icons/calendar_2.svg';
import { ReactComponent as Clock } from '../assets/icons/clock_2.svg';
import { Form, Button, Input, Select, Tabs } from 'antd';
import Room from '../assets/images/room.png';

export default function OrderHistory() {
  return (
    <UserLayout currentTab='history'>
      <div className='order-history p-4'>
        <h4 className='fw-bold'>GIAO DỊCH CỦA TÔI</h4>
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              label: `Sắp Diễn Ra`,
              key: '1',
              children: (
                <>
                  <div className='mb-2 text-gray-2'>Gần nhất</div>
                  <div className='history-card mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <div className='mt-2 text-gray-2'>Bạn có 3 đơn đã đặt</div>
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ),
            },
            {
              label: `Hàng Chờ Xác Thực`,
              key: '2',
              children: (
                <>
                  <div className='mt-2 text-gray-2'>
                    Bạn có 3 đơn trong hàng chờ xác thực
                  </div>
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                      <div className='text-orange'>Chờ xác thực từ admin</div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                      <div className='text-orange'>Chờ xác thực từ admin</div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                      <div className='text-orange'>Chờ xác thực từ admin</div>
                    </div>
                  </div>
                  <hr />
                </>
              ),
            },
            {
              label: `Đã Hoàn Tất`,
              key: '3',
              children: (
                <>
                  <div className='mt-2 text-gray-2'>
                    Bạn có 3 đơn đã hoàn tất
                  </div>
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ),
            },
            {
              label: `Đã Hủy`,
              key: '4',
              children: (
                <>
                  <div className='mt-2 text-gray-2'>Bạn có 3 đơn đã hủy</div>
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                      <div className='text-red'>Thanh toán thất bại</div>
                    </div>
                  </div>
                  <hr />
                  <div className='mx-1 row'>
                    <div className='col-auto py-2 pe-0'>
                      <img className='card-image' src={Room} alt='room' />
                    </div>
                    <div className='col py-2'>
                      <div className='text-header mb-2'>
                        <span className='text-blue'>#123456</span> - CIRCO ĐÔNG
                        DU
                      </div>
                      <div className='text-name mb-2'>Bàn Làm Việc Cá Nhân</div>
                      <div className='text-gray mb-1'>
                        <Calendar height={20} className='mb-1' /> 15/01/2022
                      </div>
                      <div className='text-gray'>
                        <Clock height={20} className='mb-1' /> 10:00 - 15:00
                      </div>
                      <div className='text-red'>Chỗ đặt bị hủy</div>
                    </div>
                  </div>
                  <hr />
                </>
              ),
            },
          ]}
        />
      </div>
    </UserLayout>
  );
}
