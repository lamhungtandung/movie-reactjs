import PropTypes from 'prop-types';

const formatDate = (dateIn) => { 
  if (!dateIn) {
    return { dayToday: "loading...", dateShort: "loading...", dateFull: "loading...", dDMmYy: "loading..." }
  }
  if (dateIn?.indexOf("/") !== -1) { 
    const arr = dateIn?.split('/')
    dateIn = `${arr[2]}-${arr[1]}-${arr[0]}`
  }
  const dateObj = new Date(dateIn);
  const dayNumber = dateObj.getDay();
  const dateNowFormat = new Date().toString().slice(0, 10);
  const dateObjFormat = dateObj.toString().slice(0, 10);

  let dayToday = '';
  if (dayNumber === 0) {
    dayToday = "Chủ nhật";
  }
  if (dayNumber === 1) {
    dayToday = "Thứ hai";
  }
  if (dayNumber === 2) {
    dayToday = "Thứ ba";
  }
  if (dayNumber === 3) {
    dayToday = "Thứ tư";
  }
  if (dayNumber === 4) {
    dayToday = "Thứ năm";
  }
  if (dayNumber === 5) {
    dayToday = "Thứ sáu";
  }
  if (dayNumber === 6) {
    dayToday = "Thứ bảy";
  }
  if (dateNowFormat === dateObjFormat) {
    dayToday = "Hôm nay";
  }
//setup date
  const date = `0${dateObj.getDate()}`.slice(-2);

  const month = `0${dateObj.getMonth() + 1}`.slice(-2);

  const year = dateObj.getFullYear();

  const dateFull = dayToday + ', ' + date + ' tháng ' + month + ', ' + year;

  const getTime = dateObj.getTime()

  return { dayToday, dateShort: dateIn, dateFull, YyMmDd: `${year}.${month}.${date}`, getTime };
};

export default formatDate
formatDate.propTypes = {
  ISODate: PropTypes.string.isRequired,
};