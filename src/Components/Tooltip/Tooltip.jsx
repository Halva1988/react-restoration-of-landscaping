import style from './Tooltip.module.css';

export default function Tooltip({text}) {
  return (
    <div className={style.tooltip}>{text}</div>
  )
}
