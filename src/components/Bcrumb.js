/**
 * Breadcrumbs for the page*/

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { useEffect } from 'react';
import { ReactComponent as BackIcon } from '../assets/icons/backArrow.svg';
import '../assets/styles/Bcrumb.scss';
export default function Bcrumb(props) {
  let navigate = useNavigate();
  const { data } = props;
  return data && data.length ? (
    <nav className='bcrumb'>
      <BackIcon className='icon' onClick={() => navigate(-1)} />
      <ol className='breadcrumb'>
        {data.map((item, i) => {
          return (
            <li
              key={i}
              className={cx('breadcrumb-item', { active: item.active })}
            >
              {item.path ? (
                <NavLink to={item.path}>{item.label}</NavLink>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  ) : null;
}
