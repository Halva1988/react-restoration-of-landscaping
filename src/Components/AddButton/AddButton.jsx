
import style from './AddButton.module.css';

export default function AddButton ({ onClick, children }) {
  console.log("render button");
  return (
    <button className={`${style.btn}`} onClick={onClick}>
      {children}
    </button>
  )
}
