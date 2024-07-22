
import { memo } from 'react';
import style from './AddButton.module.css';

export default memo(function AddButton({ onClick, children }) {
  
  return (
    <button className={`${style.btn}`} onClick={onClick}>
      {children}
    </button>
  )
})
