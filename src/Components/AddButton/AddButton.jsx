import style from './AddButton.module.css';

const AddButton = ({onClick, children, className}) => {
  return (
    <button className={`${style.btn} ${className ? `${className}` : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default AddButton