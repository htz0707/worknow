import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import '../assets/styles/TimeSlotView.scss';
import { createTimeSlot } from '../helpers/helpers';
import cx from 'classnames';

export default function TimeSlotView(props) {
  const { openTime, closeTime, startTime, endTime, handleChangeTimeSlot } =
    props;
  // const timeslot = [
  //   {
  //     date: '2022-09-08',
  //     time: '09:00',
  //     available: true,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '09:30',
  //     available: true,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '10:00',
  //     available: true,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '10:30',
  //     available: true,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '11:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '11:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '12:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '12:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '13:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '13:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '14:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '14:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '15:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '15:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '16:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '16:30',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '17:00',
  //     available: false,
  //   },
  //   {
  //     date: '2022-09-08',
  //     time: '17:30',
  //     available: false,
  //   },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '18:00',
  //   //   available: true,
  //   // },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '18:30',
  //   //   available: true,
  //   // },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '19:00',
  //   //   available: true,
  //   // },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '19:30',
  //   //   available: true,
  //   // },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '20:00',
  //   //   available: true,
  //   // },
  //   // {
  //   //   date: '2022-09-08',
  //   //   time: '20:30',
  //   //   available: true,
  //   // },
  // ];
  const [timeSlot, setTimeSlot] = useState([]);
  const [timeSlotDisplay, setTimeSlotDisplay] = useState([]);
  const handleCreateTimeSlot = () => {
    let time_slot = createTimeSlot(openTime, closeTime);
    let arr = [];
    let arr1 = [];
    time_slot?.forEach((item, index) => {
      arr.push({
        id: index + 1,
        time: item,
        available: true,
      });
      arr1.push({
        id: index + 1,
        time: item,
        available: true,
      });
    });
    setTimeSlot(arr);
    arr1.pop();
    setTimeSlotDisplay(arr1);
  };
  useEffect(() => {
    handleCreateTimeSlot();
  }, [openTime, closeTime]);
  const handleClick = async (index) => {
    // if (startTime.id && endTime.id) {
    //   handleChangeTimeSlot({
    //     startTime: item,
    //     endTime: {},
    //   });
    //   return;
    // }
    // if (startTime.id) {
    //   if (item.id > startTime.id) {
    //     handleChangeTimeSlot({ endTime: item });
    //   } else {
    //     handleChangeTimeSlot({ startTime: item });
    //   }
    //   return;
    // }
    // handleChangeTimeSlot({ startTime: item });
    if (endTime.id) {
      if (timeSlot[index].id >= endTime.id) {
        handleChangeTimeSlot({ endTime: timeSlot[index + 1] });
      } else {
        handleChangeTimeSlot({
          startTime: timeSlot[index],
          endTime: timeSlot[index + 1],
        });
      }
      return;
    }
    handleChangeTimeSlot({
      startTime: timeSlot[index],
      endTime: timeSlot[index + 1],
    });
  };
  const [hoverSlot, setHoverSlot] = useState(null);
  return (
    <div className='timeslot-view'>
      {timeSlotDisplay.map((item, index) => {
        if (index % 2 == 0) {
          return (
            <div
              className={cx('slot', {
                over: !item.available,
                selected:
                  (startTime.id <= item.id && item.id < endTime.id) ||
                  item.id === startTime.id,
                hover: startTime.id <= item.id && item.id <= hoverSlot,
              })}
              onClick={() => handleClick(index)}
              onMouseOver={() => setHoverSlot(item.id)}
              onMouseOut={() => setHoverSlot(null)}
            >
              <span>{item.time?.split(':')?.[0]}</span>
            </div>
          );
        } else {
          return (
            <div
              className={cx('slot', {
                over: !item.available,
                selected:
                  (startTime.id <= item.id && item.id < endTime.id) ||
                  item.id === startTime.id,
                hover: startTime.id <= item.id && item.id <= hoverSlot,
              })}
              onClick={() => handleClick(index)}
              onMouseOver={() => setHoverSlot(item.id)}
              onMouseOut={() => setHoverSlot(null)}
            ></div>
          );
        }
      })}
    </div>
  );
}
