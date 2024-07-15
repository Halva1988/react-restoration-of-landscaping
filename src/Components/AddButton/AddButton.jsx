import PropTypes from 'prop-types';
import style from './AddButton.module.css'

const AddButton = ({onClick, children}) => {
  return (
    <button className={`${style.btn} ${style.addAddressBtn}`} onClick={onClick}>
      {children}
    </button>
  )
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default AddButton