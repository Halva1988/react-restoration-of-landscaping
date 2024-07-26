import style from "./ButtonChangeDetailed.module.css";
import { memo } from "react";


export default memo(function ButtonChangeDetailed({ onClick }) {
  return (
    <button className={style.btn} onClick={onClick}>Изменить объем работ</button>
  )
})
