import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import i18n from '../translation/i18n';
import '../assets/styles/ChangeLanguageEngine.scss';
import { ReactComponent as EnglishFlag } from '../assets/icons/english.svg';
import { ReactComponent as VietnamFlag } from '../assets/icons/vietnamese.svg';
import cx from 'classnames';

export default function ChangeLanguageEngine() {
  const [languageOptions, setLanguageOptions] = useState([
    {
      label: 'Vietnamese',
      short: 'VI',
      value: 'vi',
      icon: <VietnamFlag />,
    },
    {
      label: 'English',
      short: 'ENG',
      value: 'en',
      icon: <EnglishFlag />,
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState({
    label: 'Vietnamese',
    short: 'VI',
    value: 'vi',
    icon: <VietnamFlag />,
  });
  useEffect(() => {
    let init_lang = localStorage.getItem('language');
    if (init_lang === 'en') {
      setSelectedLanguage({
        label: 'English',
        short: 'ENG',
        value: 'en',
        icon: <EnglishFlag />,
      });
    }
    if (init_lang === 'vi') {
      setSelectedLanguage({
        label: 'Vietnamese',
        short: 'VI',
        value: 'vi',
        icon: <VietnamFlag />,
      });
    }
  }, []);
  const handleChangeLanguage = (item) => {
    window.location.reload();
    setSelectedLanguage(item);
    i18n.changeLanguage(item.value);
    localStorage.setItem('language', item.value);
  };
  return (
    <div className='change-language-engine'>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle id='dropdown-basic'>
          {selectedLanguage.icon}
          <span className='ms-2'>{selectedLanguage.short}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          {languageOptions.map((item, index) => {
            return (
              <Dropdown.Item
                key={index}
                onClick={() => handleChangeLanguage(item)}
                className={cx('dropdown-item', {
                  active: selectedLanguage.value === item.value,
                })}
              >
                {item.icon} {item.label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
