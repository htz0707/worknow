import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import '../assets/styles/TimeSlotView.scss';
import { compareTime, createTimeSlot } from '../helpers/helpers';
import cx from 'classnames';
import moment from 'moment';

export default function TimeSlotView(props) {
  const {
    openTime,
    closeTime,
    startTime,
    endTime,
    handleChangeTimeSlot,
    date,
    dataTimeslot,
  } = props;
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
    // let time_slot = createTimeSlot(openTime, closeTime);
    // let arr = [];
    // let arr1 = [];
    // let currentDate = moment();
    // time_slot?.forEach((item, index) => {
    //   let selectDate = moment(date).format('YYYY-MM-DD') + 'T' + item;
    //   let selectDateFormat = moment(selectDate);
    //   arr.push({
    //     id: index + 1,
    //     time: item,
    //     available: compareTime(selectDateFormat, currentDate),
    //   });
    //   arr1.push({
    //     id: index + 1,
    //     time: item,
    //     available: compareTime(selectDateFormat, currentDate),
    //   });
    // });
    let arr = [];
    let arr1 = [];
    if (dataTimeslot?.length) {
      dataTimeslot?.forEach((item, index) => {
        if (item.over === true || item.available === false) {
          arr.push({
            id: index + 1,
            time: item.time,
            available: false,
          });
          arr1.push({
            id: index + 1,
            time: item.time,
            available: false,
          });
        } else {
          arr.push({
            id: index + 1,
            time: item.time,
            available: true,
          });
          arr1.push({
            id: index + 1,
            time: item.time,
            available: true,
          });
        }
      });
      let add_slot = {
        id: arr[arr.length - 1].id + 1,
        time: moment(closeTime, 'HH:mm').format('HH:mm'),
        available: true,
      };
      arr.push(add_slot);
      setTimeSlot(arr);
      // arr1.pop();
      setTimeSlotDisplay(arr1);
    }
  };
  useEffect(() => {
    handleCreateTimeSlot();
  }, [dataTimeslot]);
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
        for (let i = startTime.id; i <= timeSlot[index].id; i++) {
          if (timeSlot[i - 1].available === false) {
            handleChangeTimeSlot({
              startTime: timeSlot[index],
              endTime: timeSlot[index + 1],
            });
            return;
          }
        }
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
      {timeSlotDisplay?.map((item, index) => {
        if (index % 2 == 0) {
          return (
            <div
              key={index}
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
              key={index}
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
