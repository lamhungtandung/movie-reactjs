import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// const chuyển từ true sang false và ngược lại trong time => component 
// if const chuyển từ true > false thì cách lần chuyển trước time => cho phép chuyển
export default function UseHandleVibrateLazy() {
  const { timeLayout } = useSelector((state) => state.lazyReducer);
  const clear = useRef(null);
  const [timeOut, setTimeOut] = useState(false);
  useEffect(() => {
    if (timeLayout) {
      setTimeOut(true);
      clearTimeout(clear.current);
    } else {
      clear.current = setTimeout(() => {
        setTimeOut(false);
      }, 100);
    }
  }, [timeLayout]);
  return timeOut;
}
