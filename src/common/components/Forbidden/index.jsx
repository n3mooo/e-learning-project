import React from "react";
import style from "common/components/Forbidden/style.module.css";
import { AiOutlineWarning } from "react-icons/ai";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
function Forbidden() {
    const history = useHistory()
    const goToLogin = () => {
        history.push("/admin/login")
    }
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.icon}>
            <AiOutlineWarning />
            <h1>403</h1>
          </div>
          <h2>Forbidden Page</h2>
          <p>You don't have permission to access this page!</p>
          <Button onClick={goToLogin}>Go back!</Button>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;
