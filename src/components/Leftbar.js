import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  useProSidebar,
} from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Leftbar.scss';
import Logo from '../assets/icons/logo.svg';
import { ReactComponent as Booking } from '../assets/icons/booking.svg';
import { ReactComponent as Employee } from '../assets/icons/employee.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher_2.svg';

import { ReactComponent as LeftDoubleArrowIcon } from '../assets/icons/leftdoublearrow.svg';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

export default function Leftbar(props) {
  const { t } = useTranslation();
  const { collapseSidebar, collapsed } = useProSidebar();
  const path = useLocation();
  const navData = [
    {
      id: 1,
      title: t('booking_management'),
      icon: <Booking className='icon' />,
      path: '/admin/orders',
      subNav: [],
    },
    {
      id: 2,
      title: 'Quản Lý Space Provider',
      icon: <Employee className='icon' />,
      path: '/admin/companies',
      subNav: [],
    },
    {
      id: 3,
      title: 'Quản Lý Voucher',
      icon: <Voucher className='icon' />,
      path: '/admin/vouchers',
      subNav: [],
    },
    // {
    //   id: 5,
    //   title: t('activity_management'),
    //   icon: <Calendar className='icon' />,
    //   subNav: [
    //     {
    //       parent_id: 5,
    //       id: 1,
    //       title: t('seat_activity'),
    //       path: '/operation/seats',
    //     },
    //     {
    //       parent_id: 5,
    //       id: 2,
    //       title: t('checkin_checkout'),
    //       path: '/operation/tracking',
    //     },
    //   ],
    // },
    // {
    //   id: 6,
    //   title: 'Doanh Nghiệp',
    //   icon: <Business className='icon' />,
    //   path: '/business',
    //   subNav: [],
    // },
    // {
    //   id: 7,
    //   title: 'Lịch Sử Hoạt Động',
    //   icon: <Timer className='icon' />,
    //   path: '/history',
    //   subNav: [],
    // },
  ];
  return (
    <Sidebar className='left-bar position-relative' width='270px'>
      <div className='btn-toggle' onClick={() => collapseSidebar()}>
        <LeftDoubleArrowIcon
          className={cx('icon', {
            reverse: collapsed,
          })}
        />
      </div>
      <Menu>
        <div className='d-flex justify-content-center align-items-center py-4 px-3'>
          <img
            className='logo'
            src={Logo}
            alt='logo'
            onClick={() => collapseSidebar()}
          />
        </div>
        {navData.map((item, index) => {
          if (item.path) {
            return (
              <MenuItem
                key={index}
                icon={item.icon}
                active={path?.pathname === item.path}
                routerLink={<Link to={item.path} />}
              >
                {item.title}
              </MenuItem>
            );
          } else {
            return (
              <SubMenu label={item.title} key={index} icon={item.icon}>
                {item.subNav.map((subItem, subIndex) => {
                  return (
                    <MenuItem
                      key={subIndex}
                      routerLink={<Link to={subItem.path} />}
                      active={path?.pathname === subItem.path}
                    >
                      {subItem.title}
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          }
        })}
        {/* <div className='contact'>
          <p className='fw-bold'>Trở Thành Đối Tác</p>
          <div>
            <div className=''>Chính Sách</div>
            <div className=''>Về Chúng Tôi</div>
          </div>
        </div> */}
      </Menu>
    </Sidebar>
  );
}
