import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';

export default function Leftbar(props) {
  const { collapseSidebar, collapsed } = useProSidebar();
  const path = useLocation();
  const navData = [
    {
      id: 1,
      title: 'Quản Lý Booking',
      path: '/admin/orders'
    },
    {
      id: 2,
      title: 'Quản Lý Space Provider',
      path: '/admin/space/companies'
    }
  ];
  return (
    <Sidebar width='270px'>
      <Menu>
        <div className='d-flex justify-content-center align-items-center py-4 px-3'>
          <img
            className='w-50'
            src={Logo}
            alt='logo'
            onClick={() => collapseSidebar()}
          />
        </div>
        {navData.map((item, index) =>
          <MenuItem
            key={index}
            active={path?.pathname === item.path}
            component={<Link to={item.path} />}
          >
            {item.title}
          </MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
}
