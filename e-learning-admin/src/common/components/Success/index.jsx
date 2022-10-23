import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import style from "common/components/Success/style.module.css";

function Success(props) {
  const message = props.message;
  const link = props.link;
  const history = useHistory();
  const notChangePage = props.notChangePage;
  const [isChange, setIsChange] = useState(true);
  const handleChangePage = () => {
    if(notChangePage) {
      setIsChange(false)
    } else {
      history.push(link)
    }
  };
  return (
    <div className={isChange ? `${style.popup_success}` : `${style.popup_success} ${style.disable}`} >
    <div className={style.content}>
      <div className={style.header}>
        <AiOutlineCheckCircle />
      </div>
      <div className={style.main}>
        <h2>{message}</h2>
      </div>
      <div className={style.footer}>
        <button onClick={handleChangePage}>OK</button>
      </div>
    </div>
  </div>
  );
}

export default Success;
