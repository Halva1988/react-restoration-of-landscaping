import style from "./ButtonChangeDetailed.module.css";
import { memo } from "react";


export default memo(function ButtonChangeDetailed({ onClick }) {
  console.log('click');
  return (
    <button className={style.btn} onClick={onClick}>Изменить объем работ</button>
  )
})
