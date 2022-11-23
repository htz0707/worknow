import React from 'react';
import '../assets/styles/TimeSlotView.scss';

export default function TimeSlotView(props) {
  const timeslot = [
    {
      date: '2022-09-08',
      time: '09:00',
      available: true,
    },
    {
      date: '2022-09-08',
      time: '09:30',
      available: true,
    },
    {
      date: '2022-09-08',
      time: '10:00',
      available: true,
    },
    {
      date: '2022-09-08',
      time: '10:30',
      available: true,
    },
    {
      date: '2022-09-08',
      time: '11:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '11:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '12:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '12:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '13:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '13:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '14:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '14:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '15:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '15:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '16:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '16:30',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '17:00',
      available: false,
    },
    {
      date: '2022-09-08',
      time: '17:30',
      available: false,
    },
    // {
    //   date: '2022-09-08',
    //   time: '18:00',
    //   available: true,
    // },
    // {
    //   date: '2022-09-08',
    //   time: '18:30',
    //   available: true,
    // },
    // {
    //   date: '2022-09-08',
    //   time: '19:00',
    //   available: true,
    // },
    // {
    //   date: '2022-09-08',
    //   time: '19:30',
    //   available: true,
    // },
    // {
    //   date: '2022-09-08',
    //   time: '20:00',
    //   available: true,
    // },
    // {
    //   date: '2022-09-08',
    //   time: '20:30',
    //   available: true,
    // },
  ];

  return (
    <div className='timeslot-view'>
      {timeslot.map((item, index) => {
        if (index % 2 == 0) {
          return (
            <div className={item.available ? 'slot' : 'slot over'}>
              <span>{item.time?.split(':')?.[0]}</span>
            </div>
          );
        } else {
          return <div className={item.available ? 'slot' : 'slot over'}></div>;
        }
      })}
    </div>
  );
}
