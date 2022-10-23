import React, { useState } from "react";
import style from "common/components/ReadMore/style.module.css"
function ReadMore(props) {
  const content = props.content;
  const maxCharacter = props.maxCharacter;
  const [isShort, setIsShort] = useState(true);
  const res = content.slice(0, maxCharacter);
  const handleChangeLength = () => {
    setIsShort(!isShort);
  };
  return (
    <p>
      {isShort ? res + "..." : content}
      <br/>
      <span className={style.readmore} onClick={handleChangeLength}>
        {isShort ? "Readmore" : "Readless"}
      </span>
    </p>
  );
}

export default ReadMore;
