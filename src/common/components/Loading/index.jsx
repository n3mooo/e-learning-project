import React from 'react'
import style from "common/components/Loading/style.module.css"
import loading from "assets/image/loading.gif"
function Loading() {
  return (
    <div className={style.loading}>
        <img src={loading}/>
    </div>
  )
}

export default Loading