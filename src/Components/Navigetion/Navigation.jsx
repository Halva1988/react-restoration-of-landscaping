import AddButton from "../AddButton/AddButton";
import style from "./Navigation.module.css";
import newStyle from "../AddButton/AddButton.module.css";
import { Link } from "react-router-dom";


const Navigation = () => {
	return (
		<div className={style.navigation}>

      <Link to="/" ><AddButton className={newStyle.btn__Nav}>Добавить адрес</AddButton></Link>
      <Link to="/" ><AddButton className={newStyle.btn__Nav}>Адреса в работе</AddButton></Link>
      <Link to="/about" ><AddButton className={newStyle.btn__Nav}>Все адреса</AddButton></Link>

		</div>
	);
};

export default Navigation;
