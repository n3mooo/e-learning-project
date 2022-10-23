import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import style from "common/components/Error/style.module.css";
function Error(props) {
  const message = props.message;
  const [isDisplay, setIsDisplay] = useState(props.display);
  const handleDisplay = () => {
    setIsDisplay(!isDisplay);
  };
  return (
    <>
      {isDisplay && (
        <div className={style.popup_error}>
          <div className={style.content}>
            <div className={style.header}>
              <AiOutlineCloseCircle />
            </div>
            <div className={style.main}>
              <h2>{message}</h2>
            </div>
            <div className={style.footer}>
              <button onClick={handleDisplay}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Error;
