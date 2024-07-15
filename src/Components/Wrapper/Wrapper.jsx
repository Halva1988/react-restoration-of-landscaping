import PropTypes from 'prop-types';
import style from './Wrapper.module.css';

const Wrapper = ({children}) => {
   return (
    <div className={style.wrapper}>{children}</div>
   )
 }

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

 export default Wrapper;