import style from './AddButton.module.css'

const AddButton = ({onClick, children}) => {
  return (
    <button className={`${style.btn} ${style.addAddressBtn}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default AddButton